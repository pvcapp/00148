APP.features.chuNha.control =
{    
    init: function()
    {
        APP.features.chuNha.sidebar.control.init();
        APP.features.chuNha.dashboard.list.control.init();
        APP.features.chuNha.quanLyKhachHang.control.init();
        APP.features.chuNha.quanLyKhuNha.control.init();
        APP.features.chuNha.quanLyPhong.control.init();
        APP.features.chuNha.quanLyHopDong.control.init();
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
                const khuNha = ketQua.khuNha || [];
                const phong = ketQua.phong || [];
                APP.cache.danhSachKhuNha = {data: Array.isArray(khuNha) ? khuNha : (Array.isArray(khuNha.data) ? khuNha.data : [])};
                APP.cache.danhSachPhong = {data: Array.isArray(phong) ? phong : (Array.isArray(phong.data) ? phong.data : [])};
                APP.cache.danhSachKhachHang = ketQua.danhSachKhachHang || [];
                APP.cache.danhSachKhachHang_xacMinh = ketQua.danhSachKhachHang_xacMinh || [];
                APP.cache.setting = ketQua.setting || [];
                APP.cache.danhSachHopDong = ketQua.hopDong || [];

                APP.features.chuNha.quanLyKhachHang.ui.render();
                APP.features.chuNha.quanLyKhuNha.ui.render();
                APP.features.chuNha.quanLyPhong.ui.render();
                APP.features.chuNha.quanLyHopDong.list.control.render();
                APP.features.chuNha.setting.ui.list.render();
                APP.features.chuNha.dashboard.list.control.rerender();
            })
            .withFailureHandler(function(loi)
            {
                alert('Có lỗi khi tải dữ liệu cần thiết cho giao diện chủ nhà:\n' + loi.message);
            })
            .sv_chuNha_getData(APP.user.token);
    }
};