APP.user = 
{
    data: {},
    token: '',
    ui: {},
    control: {},
    api: {}
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
            if (APP.mobileMode) APP.menu.ui.hide();             
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
    login:
    {
        show: function()
        {
            var emptyLoginStatus =
            {
                loginStatus: 'notOk',
                message: '',
                token: '',
                userName: '',
                userHoVaTen: '',
                loaiTaiKhoan: ''
            };

            $('#loginError').innerHTML = 'Vui lòng đăng nhập để vào trang này';
            $('#loginContainer').style.display = 'flex';
            $('#login_password').value = '';
            localStorage.setItem('a00148user', JSON.stringify(emptyLoginStatus));
        },
        hide: function()
        {
            hide('loginContainer');
            $('#login_password').value = '';
            $('#loginError').innerHTML = 'Vui lòng đăng nhập để vào trang này';
        }
    },
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