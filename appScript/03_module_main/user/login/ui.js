
APP.user.login = 
{
    ui:{}, 
    control: {}, 
    state: {},
    api: {}
};

APP.user.login.state =
{
    loginStatus: 'notOk',
    message: 'Vui lòng đăng nhập để vào trang này',
    doingLogin: false
};

APP.user.login.ui = 
{
    appName: 'Ứng dụng nhà cho thuê',
    setMessage: function(message)
    {
        APP.user.login.state.message = message;
        APP.user.login.ui.render();
    },
    setdoingLogin: function(doingLogin)
    {
        APP.user.login.state.doingLogin = doingLogin;
        APP.user.login.ui.render();
    },
    reset: function()
    {
        APP.user.login.state.message = 'Vui lòng đăng nhập để vào trang này';
        APP.user.login.state.doingLogin = false;
        $('#login_password').value = '';
        APP.user.login.ui.render();
    },
    init: function()
    {
        const loginContainer = div({id: 'loginContainer', className: 'login__container'});
        loginContainer.innerHTML = `
            <div class="login__div">
                <table class="login__header">
                    <tr>
                        <td style="position:relative;">
                            <div style="width:100%;text-align:center;">
                                <img src="https://pvcapp.github.io/00148/img/ourhome.svg" style="height:25px;opacity:0.75;">
                            </div>
                            <img src="https://pvcapp.github.io/00148/img/favicon_white.png" style="height:32px;position:absolute;right:30px;top:2px;opacity:0.55;">
                        </td>
                    </tr>
                </table>

                <div class="DivUnderHeader" style="height:70px;">&nbsp;
                </div>

                <div class="login__error" style="text-align:center;">
                    ${APP.user.login.ui.appName}
                </div>

                <div class="login__error" id="loginError" style="text-align:center;">
                    <br>${APP.user.login.state.message}
                </div>

                <table style="width:100%;padding:8px;" border="0" id="loginForm" class="login__form">
                    <tr>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td style="position:relative;">
                            <input type="text" id="login_userName" placeholder="Tên đăng nhập" class="inputBox inputBox-001" value="">
                            <img src="https://pvcapp.github.io/00148/img/user_icon.png" style="position:absolute;left:5px;bottom:7px;width:18px;opacity:0.5;">
                        </td>
                    </tr>
                    <tr>
                        <td style="position:relative;">
                            <input type="password" id="login_password" placeholder="Mật khẩu" class="inputBox inputBox-001">
                            <img src="https://pvcapp.github.io/00148/img/password_icon.png" style="position:absolute;left:5px;bottom:7px;width:18px;opacity:0.5;">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top:35px;text-align:center;">
                            <center>
                                <div id="login_submitButton" class="login__submitButton">
                                    Đăng nhập
                                </div>
                            </center>
                        </td>
                    </tr>
                </table>
                <div style="height:20px;"></div>
            </div>
        `;
        document.body.appendChild(loginContainer);
    },
    render: function()
    {
        $('#loginError').innerHTML = APP.user.login.state.message;
        $('#login_submitButton').innerText = APP.user.login.state.doingLogin ? 'Đang đăng nhập..' : 'Đăng nhập';
        
        if (APP.user.login.state.doingLogin)
        {
            inactiveButton('login_submitButton');
        }
        else
        {
            activeButton('login_submitButton');
        }
    },
    show: function()
    {
        APP.loadingScreen.hide();
        var emptyLoginStatus =
        {
            loginStatus: 'notOk',
            message: '',
            token: '',
            userName: '',
            userHoVaTen: '',
            loaiTaiKhoan: ''
        };

        APP.user.login.ui.reset();
        $('#loginContainer').style.display = 'flex';
        localStorage.setItem('a00148user', JSON.stringify(emptyLoginStatus));
    },
    hide: function()
    {
        hide('loginContainer');
        APP.user.login.ui.reset();
    }    
};