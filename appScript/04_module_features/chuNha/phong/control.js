APP.features.chuNha.quanLyPhong.control =
{   
    init: function()
    {
        APP.features.chuNha.quanLyPhong.list.control.init();
        APP.features.chuNha.quanLyPhong.form.control.init();
    },
    dangChoThue: function(idPhong)
    {
        let hopDong = APP.cache.danhSachHopDong.data.find(function(hd)
        {
            return hd.phong_idPhong == idPhong;
        });

        if (hopDong)
        {
            return hopDongActive(hopDong) ? true : false;
        }
        else
        {
            return false;
        }
    }    
};