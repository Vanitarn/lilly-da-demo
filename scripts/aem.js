export { loadBlock } from './ak.js';

export function loadCSS(href) {
  return new Promise((resolve, reject) => {
    if (!document.querySelector(`head > link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = resolve;
      link.onerror = reject;
      document.head.append(link);
    } else {
      resolve();
    }
  });
}

export function createOptimizedPicture(
  src,
  alt = '',
  eager = false,
  breakpoints = [{ media: '(min-width: 600px)', width: '2000' }, { width: '750' }],
) {
  const url = new URL(src, window.location.href);
  const picture = document.createElement('picture');
  const { pathname } = url;
  const ext = pathname.substring(pathname.lastIndexOf('.') + 1);

  breakpoints.forEach((br) => {
    const source = document.createElement('source');
    if (br.media) source.setAttribute('media', br.media);
    source.setAttribute('type', 'image/webp');
    source.setAttribute('srcset', `${pathname}?width=${br.width}&format=webply&optimize=medium`);
    picture.append(source);
  });

  const img = document.createElement('img');
  img.setAttribute('loading', eager ? 'eager' : 'lazy');
  img.setAttribute('alt', alt);
  picture.append(img);
  const lastBp = breakpoints[breakpoints.length - 1];
  img.setAttribute('src', `${pathname}?width=${lastBp.width}&format=${ext}&optimize=medium`);
  return picture;
}

export function buildBlock(blockName, content) {
  const table = typeof content === 'string' ? [[content]] : content;
  const blockEl = document.createElement('div');
  blockEl.classList.add(blockName);
  table.forEach((row) => {
    const rowEl = document.createElement('div');
    row.forEach((col) => {
      const colEl = document.createElement('div');
      if (col instanceof Element) {
        colEl.append(col);
      } else {
        colEl.innerHTML = col;
      }
      rowEl.append(colEl);
    });
    blockEl.append(rowEl);
  });
  return blockEl;
}

export function decorateBlock(block) {
  const shortBlockName = block.classList[0];
  if (shortBlockName) {
    block.classList.add('block');
    block.dataset.blockName = shortBlockName;
    block.dataset.blockStatus = 'initialized';
  }
}

export async function decorateIcons(element) {
  const icons = [...element.querySelectorAll('span.icon')];
  await Promise.all(icons.map(async (span) => {
    const iconName = [...span.classList]
      .find((c) => c.startsWith('icon-'))
      ?.substring(5);
    if (iconName) {
      const icon = document.createElement('img');
      icon.src = `${window.hlx?.codeBasePath || ''}/icons/${iconName}.svg`;
      icon.alt = iconName;
      icon.loading = 'lazy';
      span.append(icon);
    }
  }));
}

export async function fetchPlaceholders(prefix = 'default') {
  window.placeholders = window.placeholders || {};
  if (!window.placeholders[prefix]) {
    window.placeholders[prefix] = new Promise((resolve) => {
      fetch(`${prefix === 'default' ? '' : prefix}/placeholders.json`)
        .then((resp) => (resp.ok ? resp.json() : {}))
        .then((json) => {
          const placeholders = {};
          json.data?.forEach(({ Key, Value }) => { placeholders[Key] = Value; });
          window.placeholders[prefix] = placeholders;
          resolve(window.placeholders[prefix]);
        })
        .catch(() => {
          window.placeholders[prefix] = {};
          resolve(window.placeholders[prefix]);
        });
    });
  }
  return window.placeholders[prefix];
}
