APP.user.sidebar.control =
{
    init: function ()
    {
        APP.user.sidebar.ui.render('headerContent');
        APP.user.sidebar.control.bindEvents();
    },
    bindEvents: function () 
    {
        $('#userMenu_divChe').addEventListener('click', function (e) 
        {
            APP.user.sidebar.ui.hide();
        });

        $('#userMenu_humberger').addEventListener('click', function (e) 
        {
            APP.user.sidebar.ui.toggle();
        });

        $('#userMenu_changePassword').addEventListener('click', function (e) 
        {
            APP.user.changePassword.ui.show();
        });

        $('#userMenu_dangXuat').addEventListener('click', function (e) 
        {
            APP.user.control.logout();
        });
    }
};