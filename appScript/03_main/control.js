APP.control.startup = async function()
{
    if (!window.google || !google.script || !google.script.run) 
    {
        canhBao('Hãy mở trang này từ Google Apps Script Web App trên trình duyệt web');
        return;
    }

    let loginStatus = localStorage.getItem('a00148user');
    
    if (!loginStatus)
    {
        console.log('APP startup: localStorage chưa có');
        APP.user.ui.login.show();
        return;
    }
    console.log('APP startup with localstorage: ' + loginStatus);
    loginStatus = JSON.parse(loginStatus);
    if (!loginStatus.token)
    {
        console.log('APP startup: localStorage_token chưa có');
        APP.user.ui.login.show();
        return;
    }

    const token = loginStatus.token;
    if (token == '')
    {
        console.log('APP startup: localStorage_token trống');
        APP.user.ui.login.show();
        return;
    }
    
    APP.user.login.hide();
    APP.user.token = token;
    APP.control.getStartupData();
}

APP.control.getStartupData = function()
{
    console.log('getStartupData...');
    google.script.run
        .withSuccessHandler(function(duLieu)
        {                      
            APP.user.data = duLieu.user;
            APP.user.data = duLieu.user;
            $('#user_hoVaTen').innerText = APP.user.data.hoVaTen;
            if (APP.user.data.loaiTaiKhoan === 'khach')
            {
                APP.cache = duLieu;
                APP.khachHang.control.startup();
            } 
            else 
            {
                APP.cache.tongQuan = duLieu.tongQuan;
                APP.ui.chuNha.startup();                            
            }   

        })
        .withFailureHandler(function(error)
        {
            xuLyLoi(error);
            console.log('getStartupData: lấy dữ liệu không thành công!');
            APP.user.ui.login.show();
        })
        .sv_appstartup_getData(APP.user.token);
}