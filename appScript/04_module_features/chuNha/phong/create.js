

function themMoiPhong_them()
{
    const duLieu = themMoiPhong_layDuLieu();
    //Kiểm tra phòng tồn tại chưa: tên phòng và khu nhà đã có:    

    if (!duLieu.idKhuNha)
    {
        toast('Vui lòng chọn khu nhà');
        return;
    }

    if (!duLieu.tenPhong)
    {
        toast('Vui lòng nhập tên phòng');
        return;
    }

    const phongTonTai = APP.cache.danhSachPhong && APP.cache.danhSachPhong.find(p => p.tenPhong === duLieu.tenPhong && p.idKhuNha === duLieu.idKhuNha);
    if (phongTonTai) 
    {
        toast('Phòng đã tồn tại trong khu nhà này');
        return;
    }
   inactiveButton('khachHang_newPhong_saveButton');
    $('#khachHang_newPhong_saveButton').innerText = 'Đang thêm..';

    google.script.run
        .withSuccessHandler(function(ketQua)
        {
            activeButton('khachHang_newPhong_saveButton');
            $('#khachHang_newPhong_saveButton').innerText = 'Thêm phòng';

            if (ketQua)
            {
                APP.cache.danhSachPhong = APP.cache.danhSachPhong || [];
                APP.cache.danhSachPhong.push(ketQua);
                chuNha_showDanhSachPhong(APP.cache.danhSachPhong);
                themMoiPhong_boQua();
                capNhatTongQuanTuCache();
                toast('Thêm phòng thành công');
                return;
            }

            toast('Không thể thêm phòng');
        })
        .withFailureHandler(function(loi)
        {
            activeButton('khachHang_newPhong_saveButton');
            $('#khachHang_newPhong_saveButton').innerText = 'Thêm phòng';
            alert('Có lỗi khi thêm phòng:\n' + loi.message);
        })
        .sv_themPhong(duLieu, APP.user.token);
}
