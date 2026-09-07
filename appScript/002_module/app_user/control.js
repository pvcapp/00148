    APP.user = 
    {
        token: '',
        data: {},
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
            inactiveButton('user_changePassword_submitButton');
            let loginStatus = localStorage.getItem('a00148user');
            if (loginStatus)
            {
                google.script.run.withSuccessHandler(function(user) 
                {
                    user = JSON.parse(user);
                    localStorage.setItem('a00148user', JSON.stringify(user));

                    if (user.status !== 'ok')
                    {
                        localStorage.removeItem('a00148user');
                        $('#userMenu_hoVaTen').value = '';
                        APP.user.login.show();
                    }
                    else
                    {
                        APP.user.data = user;
                        APP.user.token = user.token;
                        $('#user_hoVaTen').innerText = user.hoVaTen;
                        activeButton('user_changePassword_submitButton');
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
                            APP.user.data = user;
                            APP.getStartupData();
                            $('#user_hoVaTen').innerText = user.hoVaTen;
                            activeButton('user_changePassword_submitButton');
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
            APP.user.data = {};
            APP.user.login.show();

            localStorage.setItem('a00148user', '');
            $('#user_hoVaTen').innerText = '--';   
            
            google.script.run.withSuccessHandler(function(userStatus)
            {
                        
            }).sv_doLogout(token);
        },
        changePassword:
        {
            show: function()
            {
                show('user_changePassword_divChe');
                $('#changePassword_container').style.display = 'flex';
                $('#changePass_newPassword1').value = '';
                $('#changePass_newPassword2').value = '';
                APP.user.menu.hide();
            },
            hide: function()
            {
                hide('user_changePassword_divChe');
                $('#changePass_newPassword1').value = '';
                $('#changePass_newPassword2').value = '';
                hide('changePassword_container');
            },
            submit: async function()
            {
                let cb;
                let pass1 = document.getElementById("changePass_newPassword1").value;
                let pass2 = document.getElementById("changePass_newPassword2").value;
                if (pass1.length < 6)
                {
                    cb = await canhBao('Mật khẩu tối thiểu phải có từ 6 ký tự trở lên!');
                    return;
                }
                else if (pass1 !== pass2)
                {
                    cb = await canhBao('Hai mật khẩu chưa trùng khớp!');
                    return;
                }
                else
                {
                    toast('Đang đổi mật khẩu..');
                    google.script.run.withSuccessHandler(function(user)
                    {
                        user = JSON.parse(user);
                        if (user.status == 'ok')
                        {
                            localStorage.setItem('a00148user', JSON.stringify(user));
                            APP.user.token = user.token;
                            APP.user.changePassword.hide();
                        }
                        else
                        {
                            canhBao(user.message);
                        }
                    }).sv_user_changePassword(APP.user.data.userName, pass1, APP.user.token);
                }
            }
        }
    };
