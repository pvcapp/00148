//Phải có loading-bar trước
const loadingScreen_01 = (options = {}) =>
{
    let screen = div({...options, className: `loading-screen_01 ${options.className || ''}`.trim()});
    screen.appendChild(loadingBar());
    return screen;
}