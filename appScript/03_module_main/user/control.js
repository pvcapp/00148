    APP.user.control = 
    {
        init: function()
        {
            APP.user.menu.control.init();
            APP.user.login.control.init();
            APP.user.changePassword.control.init();
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
                        APP.user.login.ui.show();
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
                APP.user.login.ui.show();
            }
        },
        logout: function()
        {
            let token = APP.user.token;
            APP.user.menu.ui.hide();
            APP.sidebar.ui.clear();

            APP.ui.hideAllTabs();
            APP.ui.hideAllForms();
            APP.user.data = {};
            APP.user.login.ui.show();

            localStorage.setItem('a00148user', '');
            $('#user_hoVaTen').innerText = '--';   
            
            google.script.run.withSuccessHandler(function(userStatus)
            {
                        
            }).sv_doLogout(token);
        }
    };
