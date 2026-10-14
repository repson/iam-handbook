import path from 'node:path';

// Keep standard relative Markdown links useful both on GitHub and on the website.
export default function handbookLinks({ base }) {
  return (tree, file) => {
    function walk(node) {
      if ((node.type === 'link' || node.type === 'definition') && node.url && !/^(?:[a-z]+:|\/\/|#)/i.test(node.url)) {
        const [target, fragment] = node.url.split('#');
        if (target.endsWith('.md')) {
          const absolute = path.resolve(path.dirname(file.history[0]), target);
          const contentRoot = path.resolve('content');
          const guidesRoot = path.resolve('guides');
          if (absolute.startsWith(`${contentRoot}${path.sep}`)) {
            const id = path.relative(contentRoot, absolute).split(path.sep).join('/').replace(/\.md$/, '');
            node.url = `${base}/handbook/${id}/${fragment ? `#${fragment}` : ''}`;
          } else if (absolute.startsWith(`${guidesRoot}${path.sep}`)) {
            const id = path.relative(guidesRoot, absolute).split(path.sep).join('/').replace(/\.md$/, '');
            node.url = `${base}/${id}/${fragment ? `#${fragment}` : ''}`;
          }
        }
      }
      node.children?.forEach(walk);
    }
    walk(tree);
  };
}
