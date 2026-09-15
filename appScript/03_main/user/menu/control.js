APP.user.menu.control =
{
    init: function ()
    {
        APP.user.menu.ui.render();
        APP.user.menu.control.bindEvents();
    },
    bindEvents: function () 
    {
        $('#userMenu_divChe').addEventListener('click', function (e) 
        {
            APP.user.menu.ui.hide();
        });

        $('#userMenu_humberger').addEventListener('click', function (e) 
        {
            APP.user.menu.ui.toggle();
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