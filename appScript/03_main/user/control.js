    APP.user.control = 
    {
        init: null,
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
                        APP.user.ui.login.show();
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
                console.log('Client checkUser: localstorage not found!');
                localStorage.setItem('a00148user', 'notOk');
                APP.user.ui.login.show();
            }
        },
        login:
        {
            submit: async function()
            {
                let cb;
                $('#loginError').innerHTML = 'Đang kiểm tra thông tin <marquee style="width:8px;">......</marquee>';
                $('#login_submitButton').innerText = 'Đang đăng nhập..';
                inactiveButton('login_submitButton');
                let userName = document.getElementById("login_userName").value;
                let pass = document.getElementById("login_password").value;
                if (userName.length < 3)
                {
                    cb = await canhBao('Vui lòng kiểm tra tên đăng nhập!','Đăng nhập ứng dụng');
                    $('#login_submitButton').innerText = 'Đăng nhập';
                    $('#loginError').innerHTML = 'Vui lòng đăng nhập để vào trang này';
                    activeButton('login_submitButton');
                    return;
                }
                else if (pass.length < 3)
                {
                    cb = await canhBao('Vui lòng kiểm tra lại mật khẩu!','Đăng nhập ứng dụng');
                    $('#login_submitButton').innerText = 'Đăng nhập';
                    $('#loginError').innerHTML = 'Vui lòng đăng nhập để vào trang này';
                    activeButton('login_submitButton');
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
                            console.log('Client login success: localstorage is: ' + JSON.stringify(user));
                            localStorage.setItem('a00148user', JSON.stringify(user));
                            APP.user.token = user.token;
                            APP.user.data = user;
                            
                            APP.getStartupData();
                            $('#user_hoVaTen').innerText = user.hoVaTen;
                            activeButton('user_changePassword_submitButton');
                            $('#login_submitButton').innerText = 'Đăng nhập';
                            activeButton('login_submitButton');
                            APP.user.ui.login.hide();
                        }
                        else
                        {
                            canhBao(user.message, 'Đăng nhập ứng dụng');
                            $('#login_submitButton').innerText = 'Đăng nhập';
                            activeButton('login_submitButton');
                        }
                    }).sv_user_doLogin(JSON.stringify(loginInfor));
                }
            }
        },
        logout: function()
        {
            let token = APP.user.token;
            APP.user.ui.menu.hide();
            APP.menu.ui.clear();

            APP.ui.hideAllTabs();
            APP.ui.hideAllForms();
            APP.user.data = {};
            APP.user.ui.login.show();

            localStorage.setItem('a00148user', '');
            $('#user_hoVaTen').innerText = '--';   
            
            google.script.run.withSuccessHandler(function(userStatus)
            {
                        
            }).sv_doLogout(token);
        },
        changePassword:
        {
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
                    $('#user_changePassword_submitButton').innerText = 'Đang đổi mật khẩu..';
                    inactiveButton('user_changePassword_submitButton');
                    toast('Đang đổi mật khẩu..');
                    google.script.run.withSuccessHandler(function(user)
                    {
                        user = JSON.parse(user);
                        if (user.status == 'ok')
                        {
                            $('#user_changePassword_submitButton').innerText = 'Đổi mật khẩu';
                            activeButton('user_changePassword_submitButton');
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
