
APP.ui.chuNha.quanLyKhachHang.update = 
{
    idKhachHang: '',
    loadData: function(duLieu)
    {
        $('#themMoiKhachHang_idKhachHang').value = duLieu.idKhachHang || '';
        $('#themMoiKhachHang_hoVaTen').value = duLieu.hoVaTen || '';
        $('#themMoiKhachHang_soCCCD').value = duLieu.soCCCD || '';

        $('#themMoiKhachHang_ngaySinh').value = duLieu.ngaySinh || '';
        $('#themMoiKhachHang_thangSinh').value = duLieu.thangSinh || '';
        $('#themMoiKhachHang_namSinh').value = duLieu.namSinh || '';
    
        $('#themMoiKhachHang_gioiTinh').value = duLieu.gioiTinh || '';
        $('#themMoiKhachHang_dienThoai').value = duLieu.dienThoai || '';
        $('#themMoiKhachHang_email').value = duLieu.email || '';

        $('#themMoiKhachHang_diaChiThuongTru').value = duLieu.diaChiThuongTru || '';
        $('#themMoiKhachHang_ngheNghiep').value = duLieu.ngheNghiep || '';

        $('#themMoiKhachHang_anhKhach').value = duLieu.anhKhach || '';
        $('#themMoiKhachHang_anhCCCDMatTruoc').value = duLieu.anhCCCDMatTruoc || '';
        $('#themMoiKhachHang_anhCCCDMatSau').value = duLieu.anhCCCDMatSau || '';

        $('#themMoiKhachHang_ghiChu').value = duLieu.ghiChu || '';
        $('#themMoiKhachHang_xacMinh').value = duLieu.xacMinh || '';
        $('#themMoiKhachHang_active').value = '1';
    },
    readData: function()
    {
        return {
            idKhachHang: $('#themMoiKhachHang_idKhachHang').value || '',
            hoVaTen: $('#themMoiKhachHang_hoVaTen').value || '',
            soCCCD: $('#themMoiKhachHang_soCCCD').value || '',

            ngaySinh: $('#themMoiKhachHang_ngaySinh').value || '',
            thangSinh: $('#themMoiKhachHang_thangSinh').value || '',
            namSinh: $('#themMoiKhachHang_namSinh').value || '',

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
    show: function(idKhachHang)
    {
        const khachHang = APP.data.danhSachKhachHang.find(function(khach) 
        {
            return String(khach.idKhachHang) === String(idKhachHang);
        });

        if (!khachHang)
        {
            toast('Không tìm thấy khách hàng');
            return;
        }

        APP.ui.chuNha.quanLyKhachHang.update.loadData(khachHang);
        APP.ui.chuNha.quanLyKhachHang.update.idKhachHang = khachHang.idKhachHang;

        $('#themMoiKhachHang_caption').innerText = 'CẬP NHẬT THÔNG TIN';
        show('chuNha_khachHang_updateButton');
        show('chuNha_khachHang_update_reset');

        hide('chuNha_khachHang_saveButton');
        hide('chuNha_khachHang_addNew_reset');
    
        show('formKhachHang_deleteButton');        

        hide('tab_chuNha_khachHang_danhSach'); 
        show('themMoiKhachHang_form', 'grid');
    },
    hide: function()
    {
        show('tab_chuNha_khachHang_danhSach'); 
        hide('themMoiKhachHang_form', 'grid');
    },
    submit: async function()
    {
        const data = APP.ui.chuNha.quanLyKhachHang.update.readData();
        if (!data.idKhachHang) 
        {
            canhBao('Lỗi kỹ thuật' , 'Không thấy id Khách hàng cần cập nhật');
            return;
        }

        if (!APP.ui.chuNha.quanLyKhachHang.addNew.checkData(data)) return;

        inactiveButton('chuNha_khachHang_updateButton');
        $('#chuNha_khachHang_updateButton').innerText = 'Đang lưu..';
        toast('Đang cập nhật thông tin..');
        google.script.run
            .withSuccessHandler(function(kh)
            {
                console.log(JSON.stringify(kh));
                activeButton('chuNha_khachHang_updateButton');
                $('#chuNha_khachHang_updateButton').innerText = 'Lưu thay đổi';
                const viTri = (APP.data.danhSachKhachHang || []).findIndex(function(khach)
                {
                    return String(khach.idKhachHang) === String(data.idKhachHang);
                });

                if (viTri !== -1)
                {
                    APP.data.danhSachKhachHang[viTri] = kh;
                }
                
                APP.ui.chuNha.quanLyKhachHang.danhSach.render();

                APP.ui.chuNha.quanLyKhachHang.update.hide();
                APP.ui.chuNha.quanLyKhachHang.danhSach.show();
                capNhatTongQuanTuCache();
                toast('Đã cập nhật Khách hàng', 3000);
            })
            .withFailureHandler(function(loi)
            {
                activeButton('chuNha_khachHang_updateButton');
                $('#chuNha_khachHang_updateButton').innerText = 'Lưu thay đổi';
                alert('Có lỗi khi cập nhật Khách hàng:\n' + loi.message);
            })
            .sv_capNhatKhachHang(APP.ui.chuNha.quanLyKhachHang.update.idKhachHang, data, APP.user.token);
    },
    reset: function()
    {
        APP.ui.chuNha.quanLyKhachHang.update.show(APP.ui.chuNha.quanLyKhachHang.update.idKhachHang);
    },
    abort: function()
    {
        APP.ui.chuNha.quanLyKhachHang.addNew.reset();
        APP.ui.chuNha.quanLyKhachHang.update.hide();
    }
}





const chuNha_khachHang_xacMinh = (userName) =>
{

}