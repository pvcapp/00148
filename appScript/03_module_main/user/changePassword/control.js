APP.user.changePassword.control =
{
    init: function()
    {
        APP.user.changePassword.ui.init();
        APP.user.changePassword.control.bindEvents();
    },
    bindEvents: function () 
    {
        $('#user_changePassword_divChe').addEventListener('click', function (e) 
        {
            APP.user.changePassword.ui.hide();
        });

        $('#user_changePassword_submitButton').addEventListener('click', function (e) 
        {
            APP.user.changePassword.control.submit();
        });

        $('#user_changePassword_cancelButton').addEventListener('click', function (e) 
        {
            APP.user.changePassword.ui.hide();
        });

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