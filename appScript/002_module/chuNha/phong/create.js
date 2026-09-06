function themMoiPhong_capNhatDanhSachKhu()
{
    const select = $('#themMoiPhong_idKhuNha');

    if (!select)
    {
        return;
    }

    const danhSachKhuNha = APP.data && APP.data.khuNha ? APP.data.khuNha : [];

    select.innerHTML = `
        <option value="">-- Chọn khu nhà --</option>
        ${danhSachKhuNha.map(function(khuNha)
        {
            const idKhuNha = khuNha.idKhuNha || '';
            const tenKhuNha = khuNha.tenKhuNha;

            return `
                <option value="${escapeHtml(idKhuNha)}">
                    ${escapeHtml(tenKhuNha)}
                </option>
            `;
        }).join('')}
    `;
}

function themMoiPhong_layDuLieu()
{
    return {
        idKhuNha: $('#themMoiPhong_idKhuNha').value,
        tenPhong: $('#themMoiPhong_tenPhong').value.trim(),
        tang: $('#themMoiPhong_tang').value.trim(),
        dienTich: $('#themMoiPhong_dienTich').value,
        giaPhong: $('#themMoiPhong_giaPhong').value || 0,
        tienCocMacDinh: $('#themMoiPhong_tienCocMacDinh').value || 0,
        trangThai: $('#themMoiPhong_trangThai').value,
        moTa: $('#themMoiPhong_moTa').value.trim()
    };
}

function themMoiPhong_lamMoi()
{
    themMoiPhong_capNhatDanhSachKhu();
    $('#themMoiPhong_idKhuNha').value = '';
    $('#themMoiPhong_tenPhong').value = '';
    $('#themMoiPhong_tang').value = '';
    $('#themMoiPhong_dienTich').value = '';
    $('#themMoiPhong_giaPhong').value = '';
    $('#themMoiPhong_tienCocMacDinh').value = '';
    $('#themMoiPhong_trangThai').value = 'Trong';
    $('#themMoiPhong_moTa').value = '';
}

function themMoiPhong_boQua()
{
    themMoiPhong_lamMoi();
    hide('themMoiPhong_form');
    show('tab_chuNha_phong_danhSach');
}

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

    const phongTonTai = APP.data.phong && APP.data.phong.find(p => p.tenPhong === duLieu.tenPhong && p.idKhuNha === duLieu.idKhuNha);
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
                APP.data.phong = APP.data.phong || [];
                APP.data.phong.push(ketQua);
                chuNha_showDanhSachPhong(APP.data.phong);
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
