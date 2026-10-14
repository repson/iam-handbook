const themeButton = document.querySelector<HTMLButtonElement>('#theme-toggle');
function updateThemeLabel() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeButton?.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
}
updateThemeLabel();
themeButton?.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('iam-theme', theme); } catch {}
  updateThemeLabel();
});

const sidebar = document.querySelector<HTMLElement>('#sidebar')!;
const menu = document.querySelector<HTMLButtonElement>('#menu-toggle')!;
const backdrop = document.querySelector<HTMLButtonElement>('#nav-backdrop')!;
const mobile = matchMedia('(max-width: 760px)');
function closeMenu() {
  sidebar.classList.remove('is-open');
  document.body.classList.remove('nav-open');
  backdrop.hidden = true;
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open navigation');
  sidebar.inert = mobile.matches;
}
menu.addEventListener('click', () => {
  if (sidebar.classList.contains('is-open')) return closeMenu();
  sidebar.inert = false;
  sidebar.classList.add('is-open');
  document.body.classList.add('nav-open');
  backdrop.hidden = false;
  menu.setAttribute('aria-expanded', 'true');
  menu.setAttribute('aria-label', 'Close navigation');
  sidebar.querySelector<HTMLElement>('button, a')?.focus();
});
backdrop.addEventListener('click', () => { closeMenu(); menu.focus(); });
mobile.addEventListener('change', closeMenu);
closeMenu();
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && sidebar.classList.contains('is-open')) { closeMenu(); menu.focus(); }
  if (event.key === 'Tab' && sidebar.classList.contains('is-open') && !dialog.open) {
    const focusable = Array.from(sidebar.querySelectorAll<HTMLElement>('a, button, summary')).filter(el => el.getClientRects().length);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }
});

interface SearchEntry { title: string; description: string; category: string; tags: string[]; url: string; body: string; }
const dialog = document.querySelector<HTMLDialogElement>('#search-dialog')!;
const input = document.querySelector<HTMLInputElement>('#search-input')!;
const results = document.querySelector<HTMLElement>('#search-results')!;
const searchStatus = document.querySelector<HTMLElement>('#search-status')!;
let index: SearchEntry[] | undefined;
let pendingIndex: Promise<SearchEntry[]> | undefined;
let returnFocus: HTMLElement | null = null;
let failed = false;
const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
async function loadIndex() {
  if (index) return index;
  pendingIndex ??= fetch(dialog.dataset.index!).then(response => {
    if (!response.ok) throw new Error('Search index unavailable');
    return response.json() as Promise<SearchEntry[]>;
  });
  try { index = await pendingIndex; failed = false; return index; }
  catch { pendingIndex = undefined; failed = true; searchStatus.textContent = 'Search could not load. Close and reopen to retry, or browse the topics.'; return []; }
}
async function openSearch() {
  if (dialog.open) return;
  returnFocus = document.activeElement as HTMLElement;
  dialog.showModal();
  input.focus();
  searchStatus.textContent = 'Loading the handbook…';
  await loadIndex();
  runSearch();
}
function closeSearch() { dialog.close(); returnFocus?.focus(); }
document.querySelectorAll('[data-search-open]').forEach(button => button.addEventListener('click', openSearch));
document.querySelector('#search-close')?.addEventListener('click', closeSearch);
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeSearch(); } });
dialog.addEventListener('cancel', () => { returnFocus?.focus(); });
document.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); if (dialog.open) closeSearch(); else void openSearch(); }
});
function runSearch() {
  results.replaceChildren();
  if (failed) return;
  const query = normalize(input.value.trim());
  const terms = query.split(/\s+/).filter(Boolean);
  if (!terms.length) { searchStatus.textContent = 'Type to search the entire handbook.'; return; }
  const matches = (index || []).map(entry => {
    const title = normalize(entry.title);
    const summary = normalize(`${entry.description} ${entry.category} ${entry.tags.join(' ')}`);
    const body = normalize(entry.body);
    if (!terms.every(term => `${title} ${summary} ${body}`.includes(term))) return { entry, score: 0 };
    const score = terms.reduce((sum, term) => sum + (title.includes(term) ? 15 : 0) + (summary.includes(term) ? 5 : 0) + (body.includes(term) ? 1 : 0), title.includes(query) ? 30 : 1);
    return { entry, score };
  }).filter(match => match.score > 0).sort((a, b) => b.score - a.score);
  searchStatus.textContent = matches.length ? `${matches.length} ${matches.length === 1 ? 'article' : 'articles'} found${matches.length > 20 ? ' · showing the first 20' : ''}` : 'No articles found. Try a broader term, such as “access” or “identity”.';
  for (const { entry } of matches.slice(0, 20)) {
    const link = document.createElement('a');
    link.href = entry.url;
    link.className = 'search-result';
    const category = document.createElement('small');
    category.textContent = entry.category;
    const title = document.createElement('strong');
    title.textContent = entry.title;
    const description = document.createElement('p');
    description.textContent = entry.description;
    link.append(category, title, description);
    results.append(link);
  }
}
input.addEventListener('input', runSearch);
dialog.addEventListener('keydown', event => {
  const links = Array.from(results.querySelectorAll<HTMLAnchorElement>('a'));
  if (!links.length) return;
  const current = links.indexOf(document.activeElement as HTMLAnchorElement);
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    const next = event.key === 'ArrowDown' ? (current + 1) % links.length : (current <= 0 ? links.length - 1 : current - 1);
    links[next].focus();
  }
  if (event.key === 'Enter' && document.activeElement === input) { event.preventDefault(); links[0].click(); }
});

const tocLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.toc nav a'));
if ('IntersectionObserver' in window && tocLinks.length) {
  const visible = new Set<string>();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) { if (entry.isIntersecting) visible.add(entry.target.id); else visible.delete(entry.target.id); }
    const active = tocLinks.find(link => visible.has(decodeURIComponent(link.hash.slice(1))));
    if (active) tocLinks.forEach(link => { const selected = link === active; link.classList.toggle('active', selected); if (selected) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
  }, { rootMargin: '-100px 0px -55% 0px' });
  document.querySelectorAll('.prose h2, .prose h3').forEach(heading => observer.observe(heading));
}
