
const loadingBar = (options = {}) =>
{
   let bar = div({...options, className: `loading-container ${options.className || ''}`.trim()});
   bar.innerHTML = `<div class="loading-bar"></div>`;
   return bar;
}