function createElement(tag, attributes, ...children) {
  const el = document.createElement(tag);
  if (attributes && typeof attributes === 'object' && !(attributes instanceof Node)) {
    Object.entries(attributes).forEach(([key, val]) => el.setAttribute(key, val));
  } else if (attributes instanceof Node || typeof attributes === 'string') {
    el.append(attributes);
  }
  el.append(...children.flat().filter(Boolean));
  return el;
}

export const div = (attrs, ...children) => createElement('div', attrs, ...children);
export const a = (attrs, ...children) => createElement('a', attrs, ...children);
export const span = (attrs, ...children) => createElement('span', attrs, ...children);
export const img = (attrs) => createElement('img', attrs);
export const video = (attrs, ...children) => createElement('video', attrs, ...children);
export const source = (attrs) => createElement('source', attrs);
export const button = (attrs, ...children) => createElement('button', attrs, ...children);
export const h2 = (attrs, ...children) => createElement('h2', attrs, ...children);
