

function phong_edit_luu()
{
    const idPhong = $('#phong_edit_idPhong').value;
    const duLieu = phong_edit_layDuLieu();

    if (!duLieu.idKhuNha || !duLieu.tenPhong)
    {
        toast('Vui lòng nhập đủ khu nhà và tên phòng');
        return;
    }

    
    inactiveButton('chuNha_updatePhong_saveButton');
    $('#chuNha_updatePhong_saveButton').innerText = 'Đang lưu..';

    google.script.run
        .withSuccessHandler(function(phong)
        {
            activeButton('chuNha_updatePhong_saveButton');
            $('#chuNha_updatePhong_saveButton').innerText = 'Lưu thay đổi';

            const viTri = (APP.cache.danhSachPhong || []).findIndex(function(dong)
            {
                return String(dong.idPhong) === String(idPhong);
            });

            if (viTri !== -1)
            {
                APP.cache.danhSachPhong[viTri] = phong;
            }

            chuNha_showDanhSachPhong(APP.cache.danhSachPhong || []);
            phong_edit_boQua();
            capNhatTongQuanTuCache();
            toast('Đã cập nhật phòng');
        })
        .withFailureHandler(function(loi)
        {
            activeButton('chuNha_updatePhong_saveButton');
            $('#chuNha_updatePhong_saveButton').innerText = 'Lưu thay đổi';
            alert('Có lỗi khi cập nhật phòng:\n' + loi.message);
        })
        .sv_capNhatPhong(idPhong, duLieu, APP.user.token);
}