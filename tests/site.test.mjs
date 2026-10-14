import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';

const output = path.resolve('dist');
const base = `${(process.env.BASE_PATH || '/iam-handbook').replace(/\/$/, '')}/`;
async function filesAt(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? filesAt(path.join(directory, entry.name)) : [path.join(directory, entry.name)]))).flat();
}
const files = await filesAt(output);
const htmlFiles = files.filter(file => file.endsWith('.html'));
const pages = new Map(await Promise.all(htmlFiles.map(async file => [file, await fs.readFile(file, 'utf8')])));

test('all internal links, fragments, scripts, and styles resolve in the static export', async () => {
  const errors = [];
  for (const [file, html] of pages) {
    const pagePath = `${base}${path.relative(output, file).replace(/index\.html$/, '')}`;
    for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      const raw = match[1].replaceAll('&amp;', '&');
      if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(raw)) continue;
      const target = new URL(raw, `https://example.test${pagePath}`);
      if (!target.pathname.startsWith(base)) { errors.push(`${file}: outside base path: ${raw}`); continue; }
      let destination = path.join(output, decodeURIComponent(target.pathname.slice(base.length)));
      if (target.pathname.endsWith('/')) destination = path.join(destination, 'index.html');
      try { await fs.access(destination); } catch { errors.push(`${file}: missing target: ${raw}`); continue; }
      if (target.hash && destination.endsWith('.html')) {
        const fragment = decodeURIComponent(target.hash.slice(1));
        const targetHtml = pages.get(destination) || '';
        if (!targetHtml.includes(`id="${fragment}"`)) errors.push(`${file}: missing anchor: ${raw}`);
      }
    }
  }
  assert.deepEqual(errors, []);
});

test('published Markdown articles have generated pages and searchable content', async () => {
  const index = JSON.parse(await fs.readFile(path.join(output, 'search-index.json'), 'utf8'));
  const contentFiles = (await filesAt(path.resolve('content'))).filter(file => file.endsWith('.md'));
  const published = [];
  for (const file of contentFiles) {
    const source = await fs.readFile(file, 'utf8');
    const frontmatter = source.split('---')[1];
    const id = path.relative(path.resolve('content'), file).replace(/\.md$/, '').split(path.sep).join('/');
    const target = path.join(output, 'handbook', id, 'index.html');
    if (/^draft:\s*true\s*$/m.test(frontmatter)) {
      assert.equal(pages.has(target), false, `Draft was published: ${id}`);
      assert.equal(index.some(entry => entry.url === `${base}handbook/${id}/`), false);
    } else {
      published.push(id);
      assert.ok(pages.has(target), `Article has no page: ${id}`);
      const entry = index.find(entry => entry.url === `${base}handbook/${id}/`);
      assert.ok(entry, `Article missing from search: ${id}`);
      assert.ok(entry.body.length > 100, `Article body missing from search: ${id}`);
    }
  }
  assert.equal(index.length, published.length);
  assert.equal(new Set(index.map(entry => entry.url)).size, index.length);
  assert.ok(index.some(entry => /revocation/i.test(entry.body)), 'Full-text search should include article bodies');
});

test('every page has English language, a single h1, a description, and a canonical URL', () => {
  for (const [file, html] of pages) {
    assert.match(html, /<html\s+lang="en"/);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${file}: expected one h1`);
    assert.match(html, /<meta name="description" content="[^"]+"/);
    assert.match(html, /<link rel="canonical" href="https:\/\//);
    assert.match(html, /<main[^>]+id="main"/);
    assert.equal(html.includes('href="undefined"'), false);
  }
});

test('sitemap and robots include the configured project base path', async () => {
  const sitemap = await fs.readFile(path.join(output, 'sitemap-0.xml'), 'utf8');
  assert.ok(sitemap.includes(`${base}handbook/fundamentals/what-is-iam/`));
  const robots = await fs.readFile(path.join(output, 'robots.txt'), 'utf8');
  assert.ok(robots.includes(`${base}sitemap-index.xml`));
});
