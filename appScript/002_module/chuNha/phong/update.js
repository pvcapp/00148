function phong_edit_capNhatDanhSachKhu()
{
    const select = $('#phong_edit_idKhuNha');

    select.innerHTML = `
        <option value="">-- Chọn khu nhà --</option>
        ${(APP.data.khuNha || []).map(function(khuNha)
        {
            const idKhuNha = khuNha.idKhuNha || '';
            const tenKhuNha = khuNha.tenKhuNha;
            return `<option value="${escapeHtml(idKhuNha)}">${escapeHtml(tenKhuNha)}</option>`;
        }).join('')}
    `;
}

function phong_edit(idPhong)
{
    const phong = (APP.data.phong || []).find(function(dong)
    {
        return String(dong.idPhong) === String(idPhong);
    });

    if (!phong)
    {
        toast('Không tìm thấy phòng');
        return;
    }

    phong_edit_capNhatDanhSachKhu();
    $('#phong_edit_idPhong').value = phong.idPhong || '';
    $('#phong_edit_idKhuNha').value = phong.idKhuNha || '';
    $('#phong_edit_tenPhong').value = phong.tenPhong || '';
    $('#phong_edit_tang').value = phong.tang || '';
    $('#phong_edit_dienTich').value = phong.dienTich || '';
    $('#phong_edit_giaPhong').value = phong.giaPhong || '';
    $('#phong_edit_tienCocMacDinh').value = phong.tienCocMacDinh || '';
    $('#phong_edit_trangThai').value = phong.trangThai || 'Trong';
    $('#phong_edit_moTa').value = phong.moTa || '';

    hide('danhSachPhong_div');
    show('phong_edit_form', 'grid');
}

function phong_edit_layDuLieu()
{
    return {
        idKhuNha: $('#phong_edit_idKhuNha').value,
        tenPhong: $('#phong_edit_tenPhong').value.trim(),
        tang: $('#phong_edit_tang').value.trim(),
        dienTich: $('#phong_edit_dienTich').value,
        giaPhong: $('#phong_edit_giaPhong').value || 0,
        tienCocMacDinh: $('#phong_edit_tienCocMacDinh').value || 0,
        trangThai: $('#phong_edit_trangThai').value,
        moTa: $('#phong_edit_moTa').value.trim()
    };
}

function phong_edit_boQua()
{
    hide('phong_edit_form');
    show('danhSachPhong_div');
}

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

            const viTri = (APP.data.phong || []).findIndex(function(dong)
            {
                return String(dong.idPhong) === String(idPhong);
            });

            if (viTri !== -1)
            {
                APP.data.phong[viTri] = phong;
            }

            chuNha_showDanhSachPhong(APP.data.phong || []);
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
        .sv_capNhatPhong(idPhong, duLieu);
}