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
    document.querySelector('#themMoiKhachHang_form h2').textContent = 'CẬP NHẬT KHÁCH HÀNG';
    const nutLuu = document.querySelector('#themMoiKhachHang_form .menu__button');
    nutLuu.textContent = 'Lưu cập nhật';        
    nutLuu.onclick = themMoiKhachHang_luuCapNhat;
    // Hiển thị form
    hide('chuNha_danhSachKhachHang_div');        
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