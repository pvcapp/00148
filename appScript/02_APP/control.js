APP.control =
{
    init: function()
    {
        if (!window.google || !google.script || !google.script.run) 
        {
            alert('Hãy mở trang này từ Google Apps Script Web App trên trình duyệt web');
            return;
        }

        APP.ui.init();
    },
    startup: async function()
    {        
        let loginStatus = localStorage.getItem('a00148user');
        if (!loginStatus)
        {
            console.log('APP startup: localStorage chưa có');
            APP.user.login.ui.show();
            return;
        }
        console.log('APP startup with localstorage: ' + loginStatus);
        loginStatus = JSON.parse(loginStatus);
        if (!loginStatus.token)
        {
            console.log('APP startup: localStorage_token chưa có');
            APP.user.login.ui.show();
            return;
        }

        const token = loginStatus.token;
        if (token == '')
        {
            console.log('APP startup: localStorage_token trống');
            APP.user.login.ui.show();
            return;
        }
        
        APP.user.login.ui.hide();
        APP.ui.render();
        APP.user.token = token;
        APP.control.getStartupData();
    },
    getStartupData: function()
    {
        console.log('getStartupData...');
        google.script.run
            .withSuccessHandler(function(duLieu)
            {                      
                APP.user.data = duLieu.user;
                console.log(JSON.stringify(duLieu.user));
                $('#user_hoVaTen').innerText = APP.user.data.hoVaTen;
                if (APP.user.data.loaiTaiKhoan === 'khach')
                {
                    APP.cache = duLieu;
                    APP.features.khachHang.control.init();
                } 
                else 
                {
                    APP.cache.tongQuan = duLieu.tongQuan;
                    APP.features.chuNha.control.init();
                }   

            })
            .withFailureHandler(function(error)
            {
                console.log(JSON.stringify(error));
                xuLyLoi(error);
                console.log('getStartupData: lấy dữ liệu không thành công!');
                APP.user.login.ui.show();
            })
            .sv_appstartup_getData(APP.user.token);
    }
}