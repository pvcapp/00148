//Phảicó loading-bar trước
const loadingScreen = (options = {}) =>
{
    let screen = div({...options, className: `loading-screen ${options.className || ''}`.trim()});
    screen.appendChild(loadingBar());
}