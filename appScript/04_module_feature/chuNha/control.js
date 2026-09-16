APP.chuNha.control =
{
    show: false,
    init: function()
    {
        APP.chuNha.sidebar.init();
        APP.ui.setManHinh('chuNha', 'chuNha_dashboard');
        $('#tab_chuNha_dashboard_danhSach').innerHTML = chuNha_buildDashboard(APP.cache.tongQuan || {});
        setTimeout(function() 
        {
            APP.chuNha.control.getData();
        }, 500);                    
    },
    getData: function()
    {
        APP.ui.chuNha.quanLyKhachHang.danhSach.startup();
        google.script.run
            .withSuccessHandler(function(ketQua)
            {
                APP.cache.khuNha = ketQua.khuNha || [];
                APP.cache.phong = ketQua.phong || [];
                APP.cache.danhSachKhachHang = ketQua.danhSachKhachHang || [];
                APP.cache.danhSachKhachHang_xacMinh = ketQua.danhSachKhachHang_xacMinh || [];
                APP.cache.setting = ketQua.setting || [];

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
            chuNha_showDanhSachKhuNha(APP.cache.khuNha || []);
            activeButton('sidebar_chuNha_khuNha');
        }
    },
    quanLyPhong:
    {
        startup: function()
        {
            chuNha_showDanhSachPhong(APP.cache.phong || []);
            activeButton('sidebar_chuNha_phong');
        }
    },
    quanLyHopDong:
    {
        startup: function()
        {
            chuNha_showDanhSachHopDong(APP.cache.hopDong || []);
            activeButton('sidebar_chuNha_hopDong');
        }
    },   
    quanLyThuTien:
    {
        startup: function()
        {
            buildDanhSachThuTien(APP.cache.thuTien || []);
            activeButton('sidebar_chuNha_thuTien');
        }
    },
    setting:
    {
        startup: function()
        {
            chuNha_showSetting(APP.cache.setting);
            activeButton('sidebar_chuNha_setting');
        }
    }
};