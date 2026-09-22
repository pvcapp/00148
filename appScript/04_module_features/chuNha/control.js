APP.features.chuNha.control =
{    
    init: function()
    {
        APP.features.chuNha.sidebar.control.init();
        APP.features.chuNha.dashboard.control.init();        
        APP.features.chuNha.quanLyKhachHang.control.list.init();
        APP.features.chuNha.quanLyKhuNha.control.list.init();
        APP.features.chuNha.quanLyPhong.control.list.init();
        //hopDong
        APP.features.chuNha.setting.control.list.init();
        setManHinh('chuNha', 'dashboard', 'list');

        setTimeout(function()
        {
            APP.features.chuNha.control.getData();
        }, 500);                    
    },
    getData: function()
    {
        //APP.features.chuNha.quanLyKhachHang.list.startup();
        google.script.run
            .withSuccessHandler(function(ketQua)
            {
                APP.cache.danhSachKhuNha = ketQua.khuNha || [];
                APP.cache.danhSachPhong = ketQua.phong || [];
                APP.cache.danhSachKhachHang = ketQua.danhSachKhachHang || [];
                APP.cache.danhSachKhachHang_xacMinh = ketQua.danhSachKhachHang_xacMinh || [];
                APP.cache.setting = ketQua.setting || [];
                APP.cache.danhSachHopDong = ketQua.hopDong || [];

                APP.features.chuNha.quanLyKhachHang.ui.list.render();
                APP.features.chuNha.quanLyKhuNha.ui.list.render();
                APP.features.chuNha.quanLyPhong.ui.list.render();
                //APP.features.chuNha.quanLyHopDong.startup();
                APP.features.chuNha.setting.ui.list.render();
                
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
            chuNha_showDanhSachKhuNha(APP.cache.danhSachKhuNha || []);
            activeButton('sidebar_chuNha_khuNha');
        }
    },
    quanLyPhong:
    {
        startup: function()
        {
            chuNha_showDanhSachPhong(APP.cache.danhSachPhong || []);
            activeButton('sidebar_chuNha_phong');
        }
    },
    quanLyHopDong:
    {
        startup: function()
        {
            chuNha_showDanhSachHopDong(APP.cache.danhSachHopDong || []);
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