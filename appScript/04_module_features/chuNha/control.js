APP.features.chuNha.control =
{    
    init: function()
    {
        APP.features.chuNha.sidebar.control.init();
        APP.features.chuNha.dashboard.control.init();
        APP.features.chuNha.quanLyKhachHang.control.init();
        APP.features.chuNha.quanLyKhuNha.control.list.init();
        APP.features.chuNha.quanLyPhong.control.init();
        //hopDong
        APP.features.chuNha.setting.control.list.init();
        APP.ui.setManHinh('chuNha', 'dashboard', 'list');

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

                APP.features.chuNha.quanLyKhachHang.ui.render();
                APP.features.chuNha.quanLyKhuNha.ui.list.render();
                APP.features.chuNha.quanLyPhong.list.ui.render();
                //APP.features.chuNha.quanLyHopDong.startup();
                APP.features.chuNha.setting.ui.list.render();
                
            })
            .withFailureHandler(function(loi)
            {
                alert('Có lỗi khi tải dữ liệu cần thiết cho giao diện chủ nhà:\n' + loi.message);
            })
            .sv_chuNha_getData(APP.user.token);
    }
};