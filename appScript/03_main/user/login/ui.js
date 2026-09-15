
APP.user.login = 
{
    ui:{}, control: {}, api: {}
};

APP.user.login.ui = 
{
    render: function(parent = null)
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
                    Ứng dụng nhà cho thuê
                </div>

                <div class="login__error" id="loginError" style="text-align:center;">
                    <br>Vui lòng đăng nhập để vào trang này
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
                                <div id="login_submitButton" style="background:var(--color-primary-gradient);color:(--color-on-primary-gradient);padding:12px;width:200px;border-radius:5px;border:1px solid rgba(255,255,255,0.5);">
                                    Đăng nhập
                                </div>
                            </center>
                        </td>
                    </tr>
                </table>
                <div style="height:20px;"></div>
            </div>
        `;

        if (parent)
        {
            parent.appendChild(loginContainer);
        }
        else
        {
            document.body.appendChild(loginContainer);
        }
    },
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