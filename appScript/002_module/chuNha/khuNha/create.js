function themMoiKhuNha_layDuLieu()
{
    return {
        idKhuNha: $('#themMoiKhuNha_idKhuNha').value.trim(),
        tenKhuNha: $('#themMoiKhuNha_tenKhuNha').value.trim(),
        diaChi: $('#themMoiKhuNha_diaChi').value.trim(),
        moTa: $('#themMoiKhuNha_moTa').value.trim(),
        trangThai: $('#themMoiKhuNha_trangThai').value
    };
}

function themMoiKhuNha_lamMoi()
{
    $('#themMoiKhuNha_idKhuNha').value = '';
    $('#themMoiKhuNha_tenKhuNha').value = '';
    $('#themMoiKhuNha_diaChi').value = '';
    $('#themMoiKhuNha_moTa').value = '';
    $('#themMoiKhuNha_trangThai').value = 'dangHoatDong';
}

function themMoiKhuNha_boQua()
{
    themMoiKhuNha_lamMoi();
    hide('themMoiKhuNha_form');
    show('danhSachKhuNha_div');
}

function themMoiKhuNha_them()
{
    const duLieu = themMoiKhuNha_layDuLieu();

    if (!duLieu.tenKhuNha)
    {
        toast('Vui lòng nhập tên khu nhà');
        return;
    }

    inactiveButton('chuNha_newKhuNha_saveButton');
    $('#chuNha_newKhuNha_saveButton').innerText = 'Đang thêm..';

    google.script.run
        .withSuccessHandler(function(ketQua)
        {
            activeButton('chuNha_newKhuNha_saveButton');
            $('#chuNha_newKhuNha_saveButton').innerText = 'Thêm khu nhà';

            if (ketQua)
            {
                APP.data.khuNha = APP.data.khuNha || [];
                APP.data.khuNha.push(ketQua);
                chuNha_showDanhSachKhuNha(APP.data.khuNha);
                themMoiKhuNha_boQua();
                capNhatTongQuanTuCache();
                toast('Thêm khu nhà thành công..');
                return;
            }

            toast('Không thể thêm khu nhà');
        })
        .withFailureHandler(function(loi)
        {            
            activeButton('chuNha_newKhuNha_saveButton');
            $('#chuNha_newKhuNha_saveButton').innerText = 'Thêm khu nhà';
            alert('Có lỗi khi thêm khu nhà:\n' + loi.message);
        })
        .sv_themKhuNha(duLieu, APP.user.token);
}
