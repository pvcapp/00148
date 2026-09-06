function xoaPhong(idPhong)
{
    if (!confirm('Xóa phòng này?'))
    {
        return;
    }

    google.script.run
        .withSuccessHandler(function(ketQua)
        {
            if (!ketQua || !ketQua.thanhCong)
            {
                toast(ketQua && ketQua.thongBao ? ketQua.thongBao : 'Không thể xóa phòng');
                return;
            }

            const phong = (APP.data.phong || []).find(function(dong)
            {
                return String(dong.idPhong) === String(idPhong);
            });

            if (phong)
            {
                phong.trangThai = 'NgungHoatDong';
            }

            chuNha_showDanhSachPhong(APP.data.phong || []);
            capNhatTongQuanTuCache();
            toast('Đã xóa phòng');
        })
        .withFailureHandler(function(loi)
        {
            alert('Có lỗi khi xóa phòng:\n' + loi.message);
        })
        .xoaPhong(idPhong);
}
