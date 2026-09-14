APP.ui.chuNha =
{
    show: false,
    startup: function()
    {
        APP.ui.chuNha.menu.startup();
        APP.ui.setManHinh('chuNha', 'chuNha_dashboard');
        $('#tab_chuNha_dashboard_danhSach').innerHTML = chuNha_buildDashboard(APP.data.tongQuan || {});
        setTimeout(function() 
        {
            APP.ui.chuNha.getData();
        }, 500);                    
    },
    home:
    {
    },
    getData: function()
    {
        APP.ui.chuNha.quanLyKhachHang.danhSach.startup();
        google.script.run
            .withSuccessHandler(function(ketQua)
            {
                APP.data.khuNha = ketQua.khuNha || [];
                APP.data.phong = ketQua.phong || [];
                APP.data.danhSachKhachHang = ketQua.danhSachKhachHang || [];
                APP.data.danhSachKhachHang_xacMinh = ketQua.danhSachKhachHang_xacMinh || [];
                APP.data.setting = ketQua.setting || [];

                APP.ui.chuNha.quanLyKhachHang.danhSach.render();
                APP.ui.chuNha.quanLyKhuNha.startup();
                APP.ui.chuNha.quanLyPhong.startup();
                APP.ui.chuNha.quanLyHopDong.startup();
                APP.ui.chuNha.setting.startup();
                
            })
            .withFailureHandler(function(loi)
            {
                alert('Có lỗi khi tải dữ liệu cần thiết cho giao diện chủ nhà:\n' + loi.message);
            })
            .sv_chuNha_getData(APP.user.token);
    },
    quanLyKhachHang:
    {
        danhSach:{},
        addNew:{},
        update:{},
        delete: {}
    },
    quanLyKhuNha:
    {
        startup: function()
        {
            chuNha_showDanhSachKhuNha(APP.data.khuNha || []);
            activeButton('menu_chuNha_khuNha');
        }
    },
    quanLyPhong:
    {
        startup: function()
        {
            chuNha_showDanhSachPhong(APP.data.phong || []);
            activeButton('menu_chuNha_phong');
        }
    },
    quanLyHopDong:
    {
        startup: function()
        {
            chuNha_showDanhSachHopDong(APP.data.hopDong || []);
            activeButton('menu_chuNha_hopDong');
        }
    },   
    quanLyThuTien:
    {
        startup: function()
        {
            buildDanhSachThuTien(APP.data.thuTien || []);
            activeButton('menu_chuNha_thuTien');
        }
    },
    setting:
    {
        startup: function()
        {
            chuNha_showSetting(APP.data.setting);
            activeButton('menu_chuNha_setting');
        }
    }
};