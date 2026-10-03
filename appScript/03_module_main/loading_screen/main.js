APP.loadingScreen = 
{
    init: function()
    {
        loadingScreen_init();
    },
    show: function(noiDung = 'Dữ liệu của bạn đang được tải')
    {
        $('#loading-screen_message').innerText = noiDung;
        show('app_loadingScreen');
    },
    hide: function()
    {
        hide('app_loadingScreen');
    }
};