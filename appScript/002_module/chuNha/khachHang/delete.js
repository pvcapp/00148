APP.ui.chuNha.quanLyKhachHang.delete = 
{
    submit:async function(idKhachHang, hoVaTen)
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
                const khachHang = APP.data.danhSachKhachHang.find(
                    khach => String(khach.idKhachHang) === String(idKhachHang)
                );
                if (khachHang) 
                {
                    khachHang.active = '0';
                }
                APP.ui.chuNha.quanLyKhachHang.danhSach.render();
                capNhatTongQuanTuCache();
            }
        })
        .withFailureHandler(function(loi) 
        {   
            console.error(loi);
            canhBao('Có lỗi khi xóa khách hàng:\n' + loi.message);
        })
        .sv_xoaKhachHang(idKhachHang, hoVaTen, APP.user.token);
    }
}

