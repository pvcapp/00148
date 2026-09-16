APP.user.changePassword = 
{
    ui: {},
    control: {},
    api: {}
}

APP.user.changePassword.ui = 
{
    render: function()
    {
        div({id: 'user_changePassword_divChe', 
            className: 'user_changePassword_divChe', 
            parent: document.body
        });
        
        div({id: 'changePassword_container', 
            className: 'login__container',
            parent: document.body});

        $('#changePassword_container').innerHTML = `
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
                <center>
                    <font color="white">
                        Đổi mật khẩu
                    </font>
                </center>
                <table style="width:100%;padding:8px;" border="0" id="changePassword_Form" class="login__form">
                    <tr>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td style="position:relative;">
                            <input type="password" id="changePass_newPassword1" placeholder="Mật khẩu" class="inputBox inputBox-001">
                            <img src="https://pvcapp.github.io/00148/img/password_icon.png" style="position:absolute;left:5px;bottom:7px;width:18px;opacity:0.5;">
                        </td>
                    </tr>

                    <tr>
                        <td style="position:relative;">
                            <input type="password" id="changePass_newPassword2" placeholder="Mật khẩu" class="inputBox inputBox-001">
                            <img src="https://pvcapp.github.io/00148/img/password_icon.png" style="position:absolute;left:5px;bottom:7px;width:18px;opacity:0.5;">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top:35px;text-align:center;">
                            <center>
                                <table>
                                    <tr>
                                        <td>
                                            <div id="user_changePassword_submitButton"
                                                class="button sidebar__button" style="min-width:150px;">
                                                Đổi mật khẩu
                                            </div>
                                        </td>
                                        <td>
                                            <div id="user_changePassword_cancelButton"
                                                class="button sidebar__button" style="width:90px;">
                                                Bỏ qua
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                                
                            </center>
                        </td>
                    </tr>
                </table>
                <div style="height:20px;"></div>
            </div>
        `;
    },
    show: function()
    {
        show('user_changePassword_divChe');
        $('#changePassword_container').style.display = 'flex';
        $('#changePass_newPassword1').value = '';
        $('#changePass_newPassword2').value = '';
        APP.user.menu.ui.hide();
    },
    hide: function()
    {
        hide('user_changePassword_divChe');
        $('#changePass_newPassword1').value = '';
        $('#changePass_newPassword2').value = '';
        hide('changePassword_container');
    }
}