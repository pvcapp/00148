APP.features.chuNha.quanLyKhachHang.form.control =
{    
    init: function()
    {
        APP.features.chuNha.quanLyKhachHang.form.ui.init();
    },
    showAddNew: function()
    {
        APP.features.chuNha.quanLyKhachHang.form.mode = 'new';
        APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan.ui.show();
    },
    showAddNew_detail: function()
    {
        APP.features.chuNha.quanLyKhachHang.form.thongTinChiTiet.ui.show();
    }
};


APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan.control =
{
    init: function()
    {
        APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan.ui.init();
    },
    reset: function()
    {
        resetForm('chuNha_quanLyKhachHang_form_thongTinCoBan_tab');
    },
    submit: function()
    {

    },
    abort: function()
    {
        APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan.control.reset();
        APP.view.ui.showTab('chuNha', 'quanLyKhachHang', 'list');
    }
};