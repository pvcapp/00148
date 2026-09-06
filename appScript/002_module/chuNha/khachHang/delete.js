function xoaKhachHang(idKhachHang, hoVaTen)
{
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
            toast('Đã xóa khách hàng!');
            // Tìm khách hàng trong danh sách hiện tại
            const khachHang = APP.data.danhSachKhachHang.find(
                khach => String(khach.idKhachHang) === String(idKhachHang)
            );
            if (khachHang) 
            {
                khachHang.trangThai = 'inactive';
            }
            chuNha_showDanhSachKhachHang(APP.data.danhSachKhachHang);
            capNhatTongQuanTuCache();
        }
    })
    .withFailureHandler(function(loi) 
    {   
        console.error(loi);
        alert('Có lỗi khi xóa khách hàng:\n' + loi.message);
    })
    .xoaKhachHang(idKhachHang, hoVaTen);
}

