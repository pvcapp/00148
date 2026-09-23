APP.features.chuNha.quanLyKhachHang.control =
{
    init: function()
    {
        APP.features.chuNha.quanLyKhachHang.ui.init();
        
        APP.features.chuNha.quanLyKhachHang.list.control.init();
        APP.features.chuNha.quanLyKhachHang.detail.control.init();
        //APP.features.chuNha.quanLyKhachHang.form.control.init();
    },
    list:
    {
        init: function()
        {
            
            APP.features.chuNha.quanLyKhachHang.ui.detail.xacMinh.init();
        }
    },
    detail:
    {
        idKhachHang: '',
        init: function()
        {
            APP.features.chuNha.quanLyKhachHang.ui.detail.xacMinh.init();
        }
    },
    form: 
    {
        
    }
    
};