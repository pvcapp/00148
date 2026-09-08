function khachHang_edit_loadForm(duLieu) 
{
    if (!duLieu) 
    {
        toast('Không tìm thấy thông tin khách hàng');            
        return;        
    }

    // Đổ dữ liệu vào form
    $('#themMoiKhachHang_idKhachHang').value = duLieu.idKhachHang || '';
    $('#themMoiKhachHang_hoVaTen').value = duLieu.hoVaTen || '';
    $('#themMoiKhachHang_soCCCD').value = duLieu.soCCCD || '';
    $('#themMoiKhachHang_ngaySinh').value = duLieu.ngaySinh || '';
    $('#themMoiKhachHang_gioiTinh').value = duLieu.gioiTinh || '';
    $('#themMoiKhachHang_dienThoai').value = duLieu.dienThoai || '';
    $('#themMoiKhachHang_email').value = duLieu.email || '';
    $('#themMoiKhachHang_diaChiThuongTru').value = duLieu.diaChiThuongTru || '';
    $('#themMoiKhachHang_ngheNghiep').value = duLieu.ngheNghiep || '';
    $('#themMoiKhachHang_anhKhach').value = duLieu.anhKhach || '';
    $('#themMoiKhachHang_anhCCCDMatTruoc').value = duLieu.anhCCCDMatTruoc || '';
    $('#themMoiKhachHang_anhCCCDMatSau').value = duLieu.anhCCCDMatSau || '';
    $('#themMoiKhachHang_trangThai').value = duLieu.trangThai || 'DangThue';
    $('#themMoiKhachHang_ghiChu').value = duLieu.ghiChu || '';
    // Đổi giao diện form sang chế độ sửa
    $('#themMoiKhachHang_caption').innerText = 'CẬP NHẬT KHÁCH HÀNG';
    const nutLuu = document.querySelector('#themMoiKhachHang_form .menu__button');
    nutLuu.textContent = 'Lưu cập nhật';        
    nutLuu.onclick = themMoiKhachHang_luuCapNhat;
    // Hiển thị form
    hide('tab_chuNha_khachHang_danhSach');        
    show('themMoiKhachHang_form');
    // Form đang ở chế độ sửa
    APP.state = APP.state || {};        
    APP.state.cheDoKhachHang = 'sua';        
    APP.state.idKhachHangDangSua = duLieu.idKhachHang;
}



function khachHang_edit(idKhachHang)
{
    const khachHang =
        APP.data.danhSachKhachHang.find(function(khach) 
        {
            return String(khach.idKhachHang) === String(idKhachHang);
        });

    if (!khachHang)
    {
        toast('Không tìm thấy khách hàng');
        return;
    }

    khachHang_edit_loadForm(khachHang);
}


function khachHang_edit_luu()
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
        .sv_capNhatPhong(idPhong, duLieu, APP.user.token);
}


const chuNha_khachHang_xacMinh = (userName) =>
{

}