
const loadingScreen = (id = '', type='02') => 
{
    switch (type)
    {
        case '01':
            return loadingScreen_01({id: id});
        case '02':
            return loadingScreen_02(id);
        default:
            return loadingScreen_02(id);
    };
}

const loadingScreen_init = (id= 'app_loadingScreen') =>
{
    document.body.appendChild(loadingScreen(id));
    hide(id);
}