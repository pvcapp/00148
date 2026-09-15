
APP.user.login = 
{
    ui:{}, control: {}, api: {}
};

APP.user.login.ui = 
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
};