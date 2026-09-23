APP.features.chuNha.quanLyKhachHang.detail.api =
{
    xacMinh:
    {
        xoaPhieu: function(idKhachHang)
        {
            return new Promise(function(resolve, reject) 
            { 
                google.script.run 
                    .withSuccessHandler(resolve) 
                    .withFailureHandler(reject) 
                    .sv_capNhatKhachHang_xacMinh_xoaDong(idKhachHang, APP.user.token );
            });
        },
        notOk: function(idKhachHang)
        {
            return new Promise(function(resolve, reject)
            {
                google.script.run
                    .withSuccessHandler(resolve)
                    .withFailureHandler(reject)
                    .sv_capNhatKhachHang_xacMinh_notOk(idKhachHang,APP.user.token);
            });
        }        
    }
};