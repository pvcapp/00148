APP.user = 
{
    data: {},
    token: '',
    ui: {},
    control: {},
    api: {},
    login: {}
};

APP.user.ui =
{
    menu:
    {
        showing: false,
        show: function()
        {
            $('#menuUser').style.display = "flex";
            show('userMenu_divChe');
            APP.user.ui.menu.showing = true;   
            if (APP.config.mobileMode) APP.menu.ui.hide();             
        },
        hide: function()
        {
            hide('userMenu_divChe');
            hide('menuUser');
            APP.user.ui.menu.showing = false;
        },
        toggle: function()
        {
            if (APP.user.ui.menu.showing)
            {
                APP.user.ui.menu.hide();
            }
            else
            {
                APP.user.ui.menu.show();
            }
        }
    },
    login: {},
    changePassword:
    {
        show: function()
        {
            show('user_changePassword_divChe');
            $('#changePassword_container').style.display = 'flex';
            $('#changePass_newPassword1').value = '';
            $('#changePass_newPassword2').value = '';
            APP.user.ui.menu.hide();
        },
        hide: function()
        {
            hide('user_changePassword_divChe');
            $('#changePass_newPassword1').value = '';
            $('#changePass_newPassword2').value = '';
            hide('changePassword_container');
        }
    }
    
}