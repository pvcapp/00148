APP.features.chuNha.quanLyPhong.form.control = 
{
    init: function()
    {
        APP.features.chuNha.quanLyPhong.form.ui.init();
    },
    getData: function()
    {
        return {
            idKhuNha: $('#chuNha_quanLyPhong_form_idKhuNha').value,
            tenPhong: $('#chuNha_quanLyPhong_form_tenPhong').value.trim(),
            tang: $('#chuNha_quanLyPhong_form_tang').value.trim(),
            dienTich: $('#chuNha_quanLyPhong_form_dienTich').value,
            giaNiemYet: $('#chuNha_quanLyPhong_form_giaNiemYet').value || 0,
            tienDatCoc: $('#chuNha_quanLyPhong_form_tienDatCoc').value || 0,
            trangThai: $('#chuNha_quanLyPhong_form_trangThai').value,
            moTa: $('#chuNha_quanLyPhong_form_moTa').value.trim()
        };
    },
    refresh: function()
    {
        APP.features.chuNha.quanLyPhong.form.ui.render(APP.features.chuNha.quanLyPhong.form.mode, APP.features.chuNha.quanLyPhong.form.idPhong);
    },
    reset: function()
    {
        APP.features.chuNha.quanLyPhong.form.ui.renderKhuNhaOptions();
        $('#chuNha_quanLyPhong_form_idKhuNha').value = '';
        $('#chuNha_quanLyPhong_form_tenPhong').value = '';
        $('#chuNha_quanLyPhong_form_tang').value = '';
        $('#chuNha_quanLyPhong_form_dienTich').value = '';
        $('#chuNha_quanLyPhong_form_giaNiemYet').value = '';
        $('#chuNha_quanLyPhong_form_tienDatCoc').value = '';
        $('#chuNha_quanLyPhong_form_trangThai').value = 'Trong';
        $('#chuNha_quanLyPhong_form_moTa').value = '';
    },
    show: function(mode = 'addNew', idPhong = '')
    {
        APP.features.chuNha.quanLyPhong.form.mode = mode;
        APP.features.chuNha.quanLyPhong.form.ui.render(mode, idPhong);
        APP.view.ui.showTab('chuNha', 'quanLyPhong', 'form');
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

        if (APP.features.chuNha.quanLyPhong.form.mode == 'addNew')
        {
            APP.features.chuNha.quanLyPhong.form.control.addNew(data);
        }
        else if (APP.features.chuNha.quanLyPhong.form.mode == 'update' || 
            APP.features.chuNha.quanLyPhong.form.mode == 'edit'
        )
        {
            const idPhong = APP.features.chuNha.quanLyPhong.form.idPhong;
            APP.features.chuNha.quanLyPhong.form.control.update(idPhong, data);
        }
    },
    addNew: async function(data)
    {
        const phongTonTai = APP.cache.danhSachPhong.data && APP.cache.danhSachPhong.data.find(p => p.tenPhong === data.tenPhong && p.idKhuNha === data.idKhuNha);
        if (phongTonTai) 
        {
            toast('Phòng đã tồn tại trong khu nhà này');
            return;
        }

        try
        {
            inactiveButton('chuNha_quanLyKhachHang_form_saveButton');
            $('#chuNha_quanLyKhachHang_form_saveButton').innerText = 'Đang thêm..';
            const ketQua = await APP.features.chuNha.quanLyPhong.form.api.create(data);
            if (!ketQua)
            {
                toast('Không thể thêm phòng');
                return;
            }

            APP.cache.danhSachPhong.data.push(ketQua);
            APP.features.chuNha.quanLyPhong.list.ui.render();
            APP.features.chuNha.quanLyPhong.list.ui.show();
            this.reset();
            toast('Thêm phòng thành công');
        }
        catch (loi)
        {
            alert('Có lỗi khi thêm phòng:\n' + loi.message);
        }
        finally
        {
            activeButton('chuNha_quanLyKhachHang_form_saveButton');
            $('#chuNha_quanLyKhachHang_form_saveButton').innerText = 'Thêm phòng';
        }
    },
    update: async function(idPhong, data)
    {
        try
        {
            inactiveButton('chuNha_quanLyKhachHang_form_saveButton');
            $('#chuNha_quanLyKhachHang_form_saveButton').innerText = 'Đang cập nhật..';
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
            APP.features.chuNha.quanLyPhong.list.ui.show();
            this.reset();
            toast('Cập nhật phòng thành công');
        }
        catch (loi)
        {
            alert('Có lỗi khi cập nhật phòng:\n' + loi.message);
        }
        finally
        {
            activeButton('chuNha_quanLyKhachHang_form_saveButton');
            $('#chuNha_quanLyKhachHang_form_saveButton').innerText = 'Cập nhật phòng';
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