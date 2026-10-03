APP.features.chuNha.quanLyKhachHang.control =
{
    init: function()
    {
        APP.features.chuNha.quanLyKhachHang.ui.init();
        APP.features.chuNha.quanLyKhachHang.list.control.init();
        APP.features.chuNha.quanLyKhachHang.detail.control.init();
        APP.features.chuNha.quanLyKhachHang.form.control.init();
    },
    delete: async function(idKhachHang, hoVaTen)
    {
        let cb = await canhBao('Bạn có thực sự muốn xóa khách hàng: ' + hoVaTen, 'Cảnh báo', "OkCancel");
        if (!cb) return;
        toast('Đang xóa khách hàng: ' + hoVaTen);
        google.script.run
        .withSuccessHandler(function(ketQua) 
        {
            if (!ketQua.thanhCong) 
            {
                toast(ketQua.thongBao);
                return;
            }

            if (ketQua && ketQua.thanhCong) 
            {
                toast('Đã xóa khách hàng "' + hoVaTen + '"');
                const khachHang = APP.cache.danhSachKhachHang.find(
                    khach => String(khach.idKhachHang) === String(idKhachHang)
                );
                if (khachHang) 
                {
                    khachHang.active = '0';
                }
                APP.features.chuNha.quanLyKhachHang.list.render();
                APP.features.chuNha.quanLyKhachHang.update.hide();
                    APP.features.chuNha.dashboard.list.control.updateCustomerCount({active: '1'}, khachHang);
            }
        })
        .withFailureHandler(function(loi) 
        {   
            console.error(loi);
            canhBao('Có lỗi khi xóa khách hàng:\n' + loi.message);
        })
        .sv_xoaKhachHang(idKhachHang, hoVaTen, APP.user.token);
    },
    dangThue: function(idKhachHang)
    {
        let hopDong = APP.cache.danhSachHopDong.data.find(function(hd)
        {
            return hd.khachHang_idKhachHang == idKhachHang;
        });

        if (hopDong)
        {
            return hopDongActive(hopDong) ? true : false;
        }
        else
        {
            return false;
        }
    },
    canXacMinh: function(idKhachHang)
    {
        let dongXacMinh = APP.cache.danhSachKhachHang_xacMinh.data.find(function(dxm){
            return dxm.idKhachHang == idKhachHang
        });
        
        if (dongXacMinh && dongXacMinh.xacMinh == '')
        {
            return true;
        }
        return false;
    }
};