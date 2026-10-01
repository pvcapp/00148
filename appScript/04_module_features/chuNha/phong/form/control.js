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
        const data = APP.features.chuNha.quanLyPhong.form.control.getData();
        if (!data.idKhuNha)
        {
            toast('Vui lòng chọn khu nhà');
            return;
        }

        if (!data.tenPhong)
        {
            toast('Vui lòng nhập tên phòng');
            return;
        }

        const phongTonTai = APP.cache.danhSachPhong.data && APP.cache.danhSachPhong.data.find(p => p.tenPhong === data.tenPhong && p.idKhuNha === data.idKhuNha);
        if (phongTonTai) 
        {
            toast('Phòng đã tồn tại trong khu nhà này');
            return;
        }


        if (APP.features.chuNha.quanLyPhong.form.mode == 'addNew')
        {
            APP.features.chuNha.quanLyPhong.form.control.addNew(data);
        }
        else if (APP.features.chuNha.quanLyPhong.form.mode == 'update')
        {
            const idPhong = APP.features.chuNha.quanLyPhong.form.idPhong;
            APP.features.chuNha.quanLyPhong.form.control.update(idPhong, data);
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
            .sv_themPhong(data, APP.user.token);
    },
    addNew: async function(data)
    {
        try
        {
            disableButton('khachHang_newPhong_saveButton');
            $('#khachHang_newPhong_saveButton').innerText = 'Đang thêm..';
            const ketQua = await APP.features.chuNha.quanLyPhong.form.api.create(data);
            if (!ketQua)
            {
                toast('Không thể thêm phòng');
                return;
            }

            APP.cache.danhSachPhong.data.push(ketQua);
            APP.features.chuNha.quanLyPhong.list.ui.render();
            this.reset();
            toast('Thêm phòng thành công');
        }
        catch (loi)
        {
            alert('Có lỗi khi thêm phòng:\n' + loi.message);
        }
        finally
        {
            activeButton('khachHang_newPhong_saveButton');
            $('#khachHang_newPhong_saveButton').innerText = 'Thêm phòng';
        }
    },
    update: async function(idPhong, data)
    {
        try
        {
            disableButton('khachHang_newPhong_saveButton');
            $('#khachHang_newPhong_saveButton').innerText = 'Đang cập nhật..';
            const ketQua = await APP.features.chuNha.quanLyPhong.form.api.update(idPhong, data);
            if (!ketQua)
            {
                toast('Không thể cập nhật phòng');
                return;
            }

            const viTri = (APP.cache.danhSachPhong.data || []).findIndex(function(dong)
            {
                return String(dong.idPhong) === String(idPhong);
            });

            if (viTri !== -1)
            {
                APP.cache.danhSachPhong.data[viTri] = ketQua;
            }

            APP.features.chuNha.quanLyPhong.list.ui.render();
            this.reset();
            toast('Cập nhật phòng thành công');
        }
        catch (loi)
        {
            alert('Có lỗi khi cập nhật phòng:\n' + loi.message);
        }
        finally
        {
            activeButton('khachHang_newPhong_saveButton');
            $('#khachHang_newPhong_saveButton').innerText = 'Cập nhật phòng';
        }
    },
    delete: async function(idPhong)
    {
        let cb = await canhBao('Bạn có chắc chắn muốn xóa phòng?', 'Xác nhận xóa phòng', 'okCancel');
        if (!cb) return;
        toast('Đang xóa phòng...');
        let xoa = await APP.features.chuNha.quanLyPhong.form.api.delete(idPhong);
        
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
    },
    abort: function()
    {
        APP.features.chuNha.quanLyPhong.form.control.reset();
        APP.features.chuNha.quanLyPhong.list.ui.show();
    }
};