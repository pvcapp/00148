function khuNha_edit(idKhuNha)
{
    const khu = (APP.data.khuNha || []).find(function(khu)
    {
        return String(khu.idKhuNha) === String(idKhuNha);
    });

    if (!khu)
    {
        toast('Không tìm thấy khu nhà');
        return;
    }
    khuNha_edit_loadForm(khu);
}


function khuNha_edit_loadForm(duLieu)
{
    if (!duLieu)
    {
        toast('Không tìm thấy dữ liệu khu nhà');
        return;
    }
    $('#khuNha_edit_idKhuNha').value = duLieu.idKhuNha || '';
    $('#khuNha_edit_tenKhuNha').value = duLieu.tenKhuNha || '';
    $('#khuNha_edit_diaChi').value = duLieu.diaChi || '';
    $('#khuNha_edit_moTa').value = duLieu.moTa || '';
    $('#khuNha_edit_trangThai').value = duLieu.trangThai || 'dangHoatDong';
    hide('tab_chuNha_khuNha_danhSach');
    show('khuNha_edit_form', 'grid');
}


function khuNha_edit_layDuLieu()
{
    return {
        idKhuNha:   $('#khuNha_edit_idKhuNha').value.trim(),
        tenKhuNha:  $('#khuNha_edit_tenKhuNha').value.trim(),
        diaChi:     $('#khuNha_edit_diaChi').value.trim(),
        moTa:       $('#khuNha_edit_moTa').value.trim(),
        trangThai:  $('#khuNha_edit_trangThai').value
    };
}


function khuNha_edit_kiemTra(duLieu)
{
    if (!duLieu.tenKhuNha)
    {
        toast('Vui lòng nhập tên khu');
        return false;
    }


    if (!duLieu.diaChi)
    {
        toast('Vui lòng nhập địa chỉ');
        return false;
    }

    if (!duLieu.trangThai)
    {
        toast('Vui lòng chọn trạng thái khu nhà');
        return false;
    }
    return true;
}


function khuNha_edit_luu()
{
    const duLieu = khuNha_edit_layDuLieu();
    if (!khuNha_edit_kiemTra(duLieu))
    {
        return;
    }
    inactiveButton('chuNha_newKhuNha_saveButton');
    $('#chuNha_newKhuNha_saveButton').innerText = 'Đang lưu..';

    google.script.run
        .withSuccessHandler(
            function(ketQua)
            {
                activeButton('chuNha_newKhuNha_saveButton');
                $('#chuNha_newKhuNha_saveButton').innerText = 'Lưu thay đổi';
                if (ketQua)
                {
                    toast('Cập nhật khu nhà thành công');                    
                    if (ketQua.data && APP.data && Array.isArray(APP.data.khuNha))
                    {
                        const viTri = APP.data.khuNha.findIndex(
                            function(dong)
                            {
                                return String(dong.idKhuNha) === String(ketQua.data.idKhuNha);
                            }
                        );

                        if (viTri !== -1)
                        {
                            APP.data.khuNha[viTri] = ketQua.data;
                        }
                    }
                    chuNha_showDanhSachKhuNha(APP.data.khuNha);
                    khuNha_edit_boQua();
                }
                else
                {
                    canhBao('Không thể cập nhật khu nhà');
                }
            }
        )
        .withFailureHandler(
            function(loi)
            {
                activeButton('chuNha_newKhuNha_saveButton');
                $('#chuNha_newKhuNha_saveButton').innerText = 'Lưu thay đổi';
                console.error(loi);
                canhBao('Có lỗi khi cập nhật khu nhà:\n' + loi.message);
            }
        )
        .sv_capNhatKhuNha(duLieu, APP.user.token);
}


function khuNha_edit_boQua()
{
    $('#khuNha_edit_idKhuNha').value = '';
    hide('khuNha_edit_form');
    show('tab_chuNha_khuNha_danhSach');
}
