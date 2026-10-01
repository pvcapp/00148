APP.features.chuNha.quanLyKhachHang.form.api = 
{
    get: function ()
    {

    },
    create: function()
    {
        
        const data = APP.features.chuNha.quanLyKhachHang.form.control.getData();
        console.log(JSON.stringify(data));
        return new Promise((resolve, reject) =>
        {
            google.script.run
                .withSuccessHandler(resolve)
                .withFailureHandler(reject)
                .sv_chuNha_quanLyKhachHang_addNew(data, APP.user.token);
        });
    },
    update: async function()
    {
        const data = APP.features.chuNha.quanLyKhachHang.form.control.getData();
        console.log(JSON.stringify(data));
        if (!data.idKhachHang)
        {
            canhBao('Không thấy id Khách hàng cần cập nhật', 'Lỗi kỹ thuật');
            return;
        }

        if (!APP.features.chuNha.quanLyKhachHang.form.control.checkData()) return;
        inactiveButton('chuNha_khachHang_updateButton');
        $('#chuNha_khachHang_updateButton').innerText = 'Đang lưu..';
        toast('Đang cập nhật thông tin..');
        google.script.run
            .withSuccessHandler(function(kh)
            {
                activeButton('chuNha_khachHang_updateButton');
                $('#chuNha_khachHang_updateButton').innerText = 'Lưu thay đổi';
                const viTri = (APP.cache.danhSachKhachHang || []).findIndex(function(khach)
                {
                    return String(khach.idKhachHang) === String(data.idKhachHang);
                });

                if (viTri !== -1)
                {
                    APP.cache.danhSachKhachHang[viTri] = kh;
                }
                
                APP.features.chuNha.quanLyKhachHang.list.ui.render();
                APP.features.chuNha.quanLyKhachHang.list.ui.show();
                capNhatTongQuanTuCache();
                toast('Đã cập nhật Khách hàng', 1500);
            })
            .withFailureHandler(function(loi)
            {
                activeButton('chuNha_khachHang_updateButton');
                $('#chuNha_khachHang_updateButton').innerText = 'Lưu thay đổi';
                alert('Có lỗi khi cập nhật Khách hàng:\n' + loi.message);
            })
            .sv_capNhatKhachHang(APP.features.chuNha.quanLyKhachHang.form.idKhachHang, data, APP.user.token);
    }
};