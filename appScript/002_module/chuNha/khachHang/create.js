APP.ui.chuNha.quanLyKhachHang.addNew = 
{
    startup: function()
    {
        //Form đã được startup bằng embed trực tiếp html
    },
    reset: function()
    {
        const danhSachInput = document.querySelectorAll('#themMoiKhachHang_form input:not([readonly]), ' + '#themMoiKhachHang_form textarea');
        danhSachInput.forEach(function(input) {
            input.value = '';
        });
        $('#themMoiKhachHang_gioiTinh').value = '';
    },
    show: function()
    {
        APP.ui.chuNha.quanLyKhachHang.addNew.reset();
        $('#themMoiKhachHang_caption').innerText = 'THÊM KHÁCH HÀNG MỚI';        
        
        hide('chuNha_khachHang_updateButton');
        hide('chuNha_khachHang_update_reset');
        
        show('chuNha_khachHang_saveButton');
        show('chuNha_khachHang_addNew_reset');
    
        hide('formKhachHang_deleteButton');
        
        
        hide('tab_chuNha_khachHang_danhSach'); 
        show('themMoiKhachHang_form', 'grid');
    },
    hide: function()
    {
        APP.ui.chuNha.quanLyKhachHang.addNew.reset();
        hide('themMoiKhachHang_form');
        show('tab_chuNha_khachHang_danhSach');
    },
    readData: function()
    {
        return {
            idKhachHang: $('#themMoiKhachHang_idKhachHang').value || '',
            hoVaTen: $('#themMoiKhachHang_hoVaTen').value || '',
            soCCCD: $('#themMoiKhachHang_soCCCD').value || '',

            ngaySinh: $('#themMoiKhachHang_ngaySinh').value || '',
            ngaySinh: $('#themMoiKhachHang_thangSinh').value || '',
            ngaySinh: $('#themMoiKhachHang_namSinh').value || '',

            gioiTinh: $('#themMoiKhachHang_gioiTinh').value || '',
            dienThoai: $('#themMoiKhachHang_dienThoai').value || '',
            email: $('#themMoiKhachHang_email').value || '',

            diaChiThuongTru: $('#themMoiKhachHang_diaChiThuongTru').value || '',
            ngheNghiep: $('#themMoiKhachHang_ngheNghiep').value || '',

            anhKhach: $('#themMoiKhachHang_anhKhach').value || '',
            anhCCCDMatTruoc: $('#themMoiKhachHang_anhCCCDMatTruoc').value || '',
            anhCCCDMatSau: $('#themMoiKhachHang_anhCCCDMatSau').value || '',  

            ghiChu: $('#themMoiKhachHang_ghiChu').value || '',
            xacMinh: $('#themMoiKhachHang_xacMinh').value || '0',
            active: '1'
        };
    },
    submit: async function()
    {
        const duLieu = APP.ui.chuNha.quanLyKhachHang.addNew.readData();
        if (!APP.ui.chuNha.quanLyKhachHang.addNew.checkData(duLieu)) return;

        inactiveButton('chuNha_khachHang_saveButton');
        $('#chuNha_khachHang_saveButton').innerText = 'Đang thêm..';
        google.script.run
            .withSuccessHandler(function(ketQua) 
            {
                activeButton('chuNha_khachHang_saveButton');
                $('#chuNha_khachHang_saveButton').innerText = 'Thêm khách hàng';
                if (ketQua && ketQua.thanhCong) 
                {
                    toast('Thêm khách hàng thành công: ' + duLieu.hoVaTen);
                    APP.ui.chuNha.quanLyKhachHang.addNew.hide();
                    capNhatTongQuanTuCache();
                } 
                else 
                {
                    alert(ketQua.thongBao || 'Không thể thêm khách hàng');
                }
            })
            .withFailureHandler(function(loi) {

                activeButton('chuNha_khachHang_saveButton');
                $('#chuNha_khachHang_saveButton').innerText = 'Thêm khách hàng';

                console.error(loi);

                alert(
                    'Có lỗi khi thêm khách hàng:\n' +
                    loi.message
                );
            })
            .sv_themKhachHang(duLieu);
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

        if (!duLieu.trangThai) {
            toast('Vui lòng chọn trạng thái khách hàng');
            return false;
        }

        return true;
    }
}
