<script>
    APP.user = 
    {
        token: '',
        menu:
        {
            showing: false,
            show: function()
            {
                $('#menuUser').style.display = "flex";
                show('userMenu_divChe');
                APP.user.menu.showing = true;   
                if (APP.mobileMode) APP.ui.menu.hide();             
            },
            hide: function()
            {
                hide('userMenu_divChe');
                hide('menuUser');
                APP.user.menu.showing = false;
            },
            toggle: function()
            {
                if (APP.user.menu.showing)
                {
                    APP.user.menu.hide();
                }
                else
                {
                    APP.user.menu.show();
                }
            }
        },
        checkUser: async function()
        {
            let loginStatus = localStorage.getItem('a00148user');
            if (loginStatus)
            {
                google.script.run.withSuccessHandler(function(user) 
                {
                    user = JSON.parse(user);
                    localStorage.setItem('a00148user', JSON.stringify(user));                    
                    //console.log(user);

                    if (user.status !== 'ok')
                    {
                        localStorage.removeItem('a00148user');
                        $('#userMenu_hoVaTen').value = '';
                        APP.user.login.show();
                    }
                    else
                    {
                        APP.user = user;
                        $('#user_hoVaTen').innerText = user.hoVaTen;
                        APP.getStartupData();
                    }
                }).sv_user_getLoginStatus_(loginStatus.token);
            }
            else
            {
                localStorage.setItem('a00148user', 'notOk');
                APP.user.login.show();
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
            },
            submit: async function()
            {
                let cb;
                $('#loginError').innerHTML = 'Đang kiểm tra thông tin đăng nhập <marquee style="width:4px;">......</marquee>';
                let userName = document.getElementById("login_userName").value;
                let pass = document.getElementById("login_password").value;
                if (userName.length < 3)
                {
                    cb = await canhBao('Vui lòng kiểm tra tên đăng nhập!');
                    return;
                }
                else if (pass.length < 3)
                {
                    cb = await canhBao('Vui lòng kiểm tra lại mật khẩu!');
                    return;
                }
                else
                {
                    let loginInfor = {userName: userName, password: pass};
                    google.script.run.withSuccessHandler(function(user)
                    {
                        user = JSON.parse(user);
                        if (user.status == 'ok')
                        {
                            localStorage.setItem('a00148user', JSON.stringify(user));
                            APP.user.token = user.token;
                            APP.getStartupData();
                            $('#user_hoVaTen').innerText = user.hoVaTen;

                            APP.user.login.hide();
                        }
                        else
                        {
                            canhBao(user.message);
                        }
                    }).sv_user_doLogin(JSON.stringify(loginInfor));
                }
            }
        },
        logout: function()
        {
            let token = APP.user.token;
            APP.user.menu.hide();
            APP.ui.hideAllTabs();
            APP.ui.hideAllForms();

            APP.user.login.show();

            localStorage.setItem('a00148user', '');
            $('#user_hoVaTen').innerText = '--';   
            
            google.script.run.withSuccessHandler(function(userStatus)
            {
                        
            }).sv_doLogout(token);
        }
    };
</script>

