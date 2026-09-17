APP.user.login.control = 
{
    init: function () 
    {
        APP.user.login.ui.init();
        APP.user.login.control.bindEvents();
    },
    bindEvents: function ()
    {
        $('#login_password').addEventListener('keydown', function (e) 
        {
            if (e.key === 'Enter') APP.user.login.control.submit();
        });

        $('#login_submitButton').addEventListener('click', function (e) 
        {
            APP.user.login.control.submit();
        });       
    },
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
                    
                    APP.control.getStartupData();
                    $('#user_hoVaTen').innerText = user.hoVaTen;
                    activeButton('user_changePassword_submitButton');
                    $('#login_submitButton').innerText = 'Đăng nhập';
                    activeButton('login_submitButton');
                    APP.user.login.ui.hide();
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
};