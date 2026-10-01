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
    }
}
