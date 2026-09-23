APP.features.chuNha.quanLyKhachHang.addNew = 
{
    startup: function()
    {
        //Form đã được startup bằng embed trực tiếp html
    },
    reset: function()
    {
        const danhSachInput = document.querySelectorAll('#formKhachHang_input_form input:not([readonly]), ' + '#formKhachHang_input_form textarea');
        danhSachInput.forEach(function(input) {
            input.value = '';
        });
        $('#formKhachHang_input_gioiTinh').value = '';
    },
    show: function()
    {
        APP.features.chuNha.quanLyKhachHang.addNew.reset();
        $('#formKhachHang_input_caption').innerText = 'THÊM KHÁCH HÀNG MỚI';        
        
        hide('chuNha_khachHang_updateButton');
        hide('chuNha_khachHang_update_reset');
        
        show('chuNha_khachHang_saveButton');
        show('chuNha_khachHang_addNew_reset');
    
        hide('formKhachHang_deleteButton');
        
        
        hide('tab_chuNha_khachHang_danhSach'); 
        show('formKhachHang_input_form', 'grid');
    },
    hide: function()
    {
        APP.features.chuNha.quanLyKhachHang.addNew.reset();
        hide('formKhachHang_input_form');
        show('tab_chuNha_khachHang_danhSach');
    },
    readData: function()
    {
        return {
            idKhachHang: $('#formKhachHang_input_idKhachHang').value || '',
            hoVaTen: $('#formKhachHang_input_hoVaTen').value || '',
            soCCCD: $('#formKhachHang_input_soCCCD').value || '',

            ngaySinh: $('#formKhachHang_input_ngaySinh').value || '',
            thangSinh: $('#formKhachHang_input_thangSinh').value || '',
            namSinh: $('#formKhachHang_input_namSinh').value || '',

            gioiTinh: $('#formKhachHang_input_gioiTinh').value || '',
            dienThoai: $('#formKhachHang_input_dienThoai').value || '',
            email: $('#formKhachHang_input_email').value || '',

            diaChiThuongTru: $('#formKhachHang_input_diaChiThuongTru').value || '',
            ngheNghiep: $('#formKhachHang_input_ngheNghiep').value || '',

            anhKhach: $('#formKhachHang_input_anhKhach').value || '',
            anhCCCDMatTruoc: $('#formKhachHang_input_anhCCCDMatTruoc').value || '',
            anhCCCDMatSau: $('#formKhachHang_input_anhCCCDMatSau').value || '',  

            ghiChu: $('#formKhachHang_input_ghiChu').value || '',
            active: '1'
        };
    },
    submit: async function()
    {
        const duLieu = APP.features.chuNha.quanLyKhachHang.addNew.readData();
        if (!APP.features.chuNha.quanLyKhachHang.addNew.checkData(duLieu)) return;

        inactiveButton('chuNha_khachHang_saveButton');
        $('#chuNha_khachHang_saveButton').innerText = 'Đang thêm..';
        toast('Đang thêm khách hàng..');
        google.script.run
            .withSuccessHandler(function(ketQua) 
            {
                activeButton('chuNha_khachHang_saveButton');
                $('#chuNha_khachHang_saveButton').innerText = 'Thêm khách hàng';
                if (ketQua && ketQua.thanhCong) 
                {
                    toast('Thêm khách hàng thành công: ' + duLieu.hoVaTen);
                    APP.cache.danhSachKhachHang = APP.cache.danhSachKhachHang || [];
                    APP.cache.danhSachKhachHang.push(ketQua.khachHang);
                    APP.features.chuNha.quanLyKhachHang.list.render();
                    APP.features.chuNha.quanLyKhachHang.addNew.hide();
                    capNhatTongQuanTuCache();
                    return;
                } 
                else 
                {
                    canhBao('Không thành công!', ketQua.thongBao || 'Không thể thêm khách hàng');
                }
            })
            .withFailureHandler(function(loi) {

                activeButton('chuNha_khachHang_saveButton');
                $('#chuNha_khachHang_saveButton').innerText = 'Thêm khách hàng';

                console.error(loi);

                alert('Không thành công!', 'Có lỗi khi thêm khách hàng:\n' + loi.message);
            })
            .sv_themKhachHang(duLieu, APP.user.token);
    },
    checkData: function(duLieu)
    {
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

        return true;
    }
}
