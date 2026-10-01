APP.features.chuNha.quanLyPhong.form.control = 
{
    init: function()
    {
        APP.features.chuNha.quanLyPhong.form.ui.init();
    },
    getData: function()
    {
        return {
            idKhuNha: $('#themMoiPhong_idKhuNha').value,
            tenPhong: $('#themMoiPhong_tenPhong').value.trim(),
            tang: $('#themMoiPhong_tang').value.trim(),
            dienTich: $('#themMoiPhong_dienTich').value,
            giaNiemYet: $('#themMoiPhong_giaNiemYet').value || 0,
            tienDatCoc: $('#themMoiPhong_tienDatCoc').value || 0,
            trangThai: $('#themMoiPhong_trangThai').value,
            moTa: $('#themMoiPhong_moTa').value.trim()
        };
    },
    reset: function()
    {
        APP.features.chuNha.quanLyPhong.form.ui.renderKhuNhaOptions();
        $('#themMoiPhong_idKhuNha').value = '';
        $('#themMoiPhong_tenPhong').value = '';
        $('#themMoiPhong_tang').value = '';
        $('#themMoiPhong_dienTich').value = '';
        $('#themMoiPhong_giaNiemYet').value = '';
        $('#themMoiPhong_tienDatCoc').value = '';
        $('#themMoiPhong_trangThai').value = 'Trong';
        $('#themMoiPhong_moTa').value = '';
    },
    submit: async function()
    {
        const duLieu = APP.features.chuNha.quanLyPhong.form.control.getData();
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

        const phongTonTai = APP.cache.danhSachPhong.data && APP.cache.danhSachPhong.data.find(p => p.tenPhong === duLieu.tenPhong && p.idKhuNha === duLieu.idKhuNha);
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
                    APP.cache.danhSachPhong.data.push(ketQua);
                    APP.features.chuNha.quanLyPhong.list.ui.render();
                    APP.features.chuNha.quanLyPhong.form.control.reset();
                    //cap nhat tong quan
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
    },
    delete: async function(idPhong)
    {
        let cb = await canhBao('Bạn có chắc chắn muốn xóa phòng?', 'Xác nhận xóa phòng', 'okCancel');
        if (!cb) return;

        google.script.run
            .withSuccessHandler(function(ketQua)
            {
                if (!ketQua || !ketQua.thanhCong)
                {
                    toast(ketQua && ketQua.thongBao ? ketQua.thongBao : 'Không thể xóa phòng');
                    return;
                }

                const phong = (APP.cache.danhSachPhong.data || []).find(function(dong)
                {
                    return String(dong.idPhong) === String(idPhong);
                });

                if (phong)
                {
                    phong.active = '0';
                }
                APP.features.chuNha.quanLyPhong.list.ui.render();
                //capNhatTongQuanTuCache();
                toast('Đã xóa phòng');
            })
            .withFailureHandler(function(loi)
            {
                alert('Có lỗi khi xóa phòng:\n' + loi.message);
            })
            .xoaPhong(idPhong, APP.user.token);
    },
    abort: function()
    {
        APP.features.chuNha.quanLyPhong.form.control.reset();
        APP.features.chuNha.quanLyPhong.list.ui.show();
    }
};