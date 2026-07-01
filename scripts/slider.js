export default function createSlider(block) {
  const list = block.querySelector('ul');
  if (!list) return;

  list.setAttribute('role', 'list');
  list.style.overflowX = 'auto';
  list.style.scrollSnapType = 'x mandatory';
  list.style.display = 'flex';

  [...list.children].forEach((item) => {
    item.style.scrollSnapAlign = 'start';
    item.style.flexShrink = '0';
  });

  const prev = document.createElement('button');
  prev.className = 'slider-prev';
  prev.setAttribute('aria-label', 'Previous');
  prev.innerHTML = '&#8249;';

  const next = document.createElement('button');
  next.className = 'slider-next';
  next.setAttribute('aria-label', 'Next');
  next.innerHTML = '&#8250;';

  prev.addEventListener('click', () => {
    list.scrollBy({ left: -list.offsetWidth, behavior: 'smooth' });
  });

  next.addEventListener('click', () => {
    list.scrollBy({ left: list.offsetWidth, behavior: 'smooth' });
  });

  block.prepend(prev);
  block.append(next);
}
