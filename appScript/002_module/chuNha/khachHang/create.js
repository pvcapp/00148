function themMoiKhachHang_layDuLieu() {

    return {
        idKhachHang: $('#themMoiKhachHang_idKhachHang').value.trim(),
        hoVaTen: $('#themMoiKhachHang_hoVaTen').value.trim(),
        soCCCD: $('#themMoiKhachHang_soCCCD').value.trim(),
        ngaySinh: $('#themMoiKhachHang_ngaySinh').value,
        gioiTinh: $('#themMoiKhachHang_gioiTinh').value,
        dienThoai: $('#themMoiKhachHang_dienThoai').value.trim(),
        email: $('#themMoiKhachHang_email').value.trim(),
        diaChiThuongTru: $('#themMoiKhachHang_diaChiThuongTru').value.trim(),
        ngheNghiep: $('#themMoiKhachHang_ngheNghiep').value.trim(),
        anhKhach: $('#themMoiKhachHang_anhKhach').value.trim(),
        anhCCCDMatTruoc: $('#themMoiKhachHang_anhCCCDMatTruoc').value.trim(),
        anhCCCDMatSau: $('#themMoiKhachHang_anhCCCDMatSau').value.trim(),
        trangThai: $('#themMoiKhachHang_trangThai').value,
        ghiChu: $('#themMoiKhachHang_ghiChu').value.trim(),
        ngayTao: $('#themMoiKhachHang_ngayTao').value,
        ngayCapNhat: $('#themMoiKhachHang_ngayCapNhat').value
    };
}


function themMoiKhachHang_kiemTra(duLieu) {

    if (!duLieu.hoVaTen) {
        toast('Vui lòng nhập họ và tên');
        return false;
    }

    if (!/^\d{12}$/.test(duLieu.soCCCD)) {
        toast('Số CCCD phải gồm đúng 12 chữ số');
        return false;
    }

    if (
        duLieu.dienThoai &&
        !/^(0|\+84)\d{9}$/.test(duLieu.dienThoai)
    ) {
        toast('Số điện thoại không hợp lệ');
        return false;
    }

    if (
        duLieu.email &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(duLieu.email)
    ) {
        toast('Email không hợp lệ');
        return false;
    }

    if (!duLieu.trangThai) {
        toast('Vui lòng chọn trạng thái khách hàng');
        return false;
    }

    return true;
}


function themMoiKhachHang_them() {

    const duLieu = themMoiKhachHang_layDuLieu();

    if (!themMoiKhachHang_kiemTra(duLieu)) {
        return;
    }



    inactiveButton('khachHang_newKhachHang_saveButton');
    $('#khachHang_newKhachHang_saveButton').innerText = 'Đang thêm..';

    google.script.run
        .withSuccessHandler(function(ketQua) {

            activeButton('khachHang_newKhachHang_saveButton');
            $('#khachHang_newKhachHang_saveButton').innerText = 'Thêm khách hàng';

            if (ketQua && ketQua.thanhCong) {

                toast(
                    'Thêm khách hàng thành công.\n' +
                    'Mã khách: ' + ketQua.idKhachHang
                );

                themMoiKhachHang_lamMoi();
                capNhatTongQuanTuCache();

            } else {

                alert(
                    ketQua.thongBao ||
                    'Không thể thêm khách hàng'
                );
            }
        })
        .withFailureHandler(function(loi) {

            activeButton('khachHang_newKhachHang_saveButton');
            $('#khachHang_newKhachHang_saveButton').innerText = 'Thêm khách hàng';

            console.error(loi);

            alert(
                'Có lỗi khi thêm khách hàng:\n' +
                loi.message
            );
        })
        .themKhachHang(duLieu);
}


function themMoiKhachHang_lamMoi() {

    const danhSachInput = document.querySelectorAll(
        '#themMoiKhachHang_form input:not([readonly]), ' +
        '#themMoiKhachHang_form textarea'
    );

    danhSachInput.forEach(function(input) {
        input.value = '';
    });

    document.getElementById(
        'themMoiKhachHang_gioiTinh'
    ).value = '';

    document.getElementById(
        'themMoiKhachHang_trangThai'
    ).value = 'DangThue';
}