function chuNha_xoaPhong(idPhong)
{
    let cb = canhBao('Bạn có chắc chắn muốn xóa phòng?', 'Xác nhận xóa phòng', 'okCancel');
    if (!cb) return;

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
        .xoaPhong(idPhong, APP.user.token);
}
