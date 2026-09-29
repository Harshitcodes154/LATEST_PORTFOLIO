const paths = {
  arrow: '<path d="M7 17 17 7M7 7h10v10"/>',
  down: '<path d="M12 4v16m-6-6 6 6 6-6"/>',
  github:
    '<path d="M9 19c-4 1-4-2-6-2m12 5v-4a3.5 3.5 0 0 0-1-2.7c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.3 4 5 5 0 0 0 19.2.5S18 .1 15 2a15 15 0 0 0-8 0C4 .1 2.8.5 2.8.5A5 5 0 0 0 2.7 4a5.4 5.4 0 0 0-1.5 3.8c0 5.4 3.5 6.6 6.8 7A3.5 3.5 0 0 0 7 17.5V22" transform="translate(1 1) scale(.9)"/>',
  linkedin: '<path d="M5 9v11M5 4v.01M10 20V9h4v2c2-4 7-2 7 2v7M14 12v8"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
  code: '<path d="m8 5-6 7 6 7m8-14 6 7-6 7m-3-16-2 20"/>',
};
export const icon = (name, className = "") =>
  `<svg class="icon ${className}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.arrow}</svg>`;
