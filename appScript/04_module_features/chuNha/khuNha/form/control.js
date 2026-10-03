APP.features.chuNha.quanLyKhuNha.form.control = 
{
    init: function()
    {
        APP.features.chuNha.quanLyKhuNha.form.ui.init();
    },
    show: function(mode = 'addNew', idKhuNha = '')
    {
        APP.features.chuNha.quanLyKhuNha.form.mode = mode;
        APP.features.chuNha.quanLyKhuNha.form.ui.render(mode, idKhuNha);
        APP.view.ui.showTab('chuNha', 'quanLyKhuNha', 'form');
    },
    getData: function()
    {
        return {
            idKhuNha: $('#chuNha_quanLyKhuNha_form_idKhuNha').value,
            tenKhuNha: $('#chuNha_quanLyKhuNha_form_tenKhuNha').value.trim(),
            diaChi: $('#chuNha_quanLyKhuNha_form_diaChi').value.trim(),
            moTa: $('#chuNha_quanLyKhuNha_form_moTa').value.trim(),
            trangThai: $('#chuNha_quanLyKhuNha_form_trangThai').value
        };
    },
    refresh: function()
    {
        APP.features.chuNha.quanLyKhuNha.form.ui.render(APP.features.chuNha.quanLyKhuNha.form.mode, APP.features.chuNha.quanLyKhuNha.form.idKhuNha);
    },
    submit: async function()
    {
        const data = APP.features.chuNha.quanLyKhuNha.form.control.getData();
        if (!data.tenKhuNha)
        {
            toast('Vui lòng nhập tên khu nhà');
            return;
        }

        if (APP.features.chuNha.quanLyKhuNha.form.mode == 'addNew')
        {
            await APP.features.chuNha.quanLyKhuNha.form.control.addNew(data);
        }
        else if (APP.features.chuNha.quanLyKhuNha.form.mode == 'update' || APP.features.chuNha.quanLyKhuNha.form.mode == 'edit')
        {
            await APP.features.chuNha.quanLyKhuNha.form.control.update(data);
        }
    },
    addNew: async function(data)
    {
        const saveButton = $('#chuNha_quanLyKhuNha_form_saveButton');
        try
        {
            inactiveButton('chuNha_quanLyKhuNha_form_saveButton');
            saveButton.innerText = 'Đang thêm..';
            const ketQua = await APP.features.chuNha.quanLyKhuNha.form.api.create(data);
            const khuNhaMoi = ketQua && (ketQua.data || ketQua.khuNha || ketQua);
            if (!khuNhaMoi || !khuNhaMoi.idKhuNha || ketQua.success === false || ketQua.thanhCong === false)
            {
                toast((ketQua && (ketQua.thongBao || ketQua.message)) || 'Không thể thêm khu nhà');
                return;
            }

            APP.cache.danhSachKhuNha.data.push(khuNhaMoi);
            APP.features.chuNha.quanLyKhuNha.list.control.refresh();
            APP.features.chuNha.quanLyKhuNha.form.control.abort();
            toast('Thêm mới khu nhà thành công');
        }
        catch (loi)
        {
            await canhBao('Có lỗi khi thêm khu nhà:\n' + loi.message, 'Lỗi khi thêm khu nhà', 'ok');
        }
        finally
        {
            activeButton('chuNha_quanLyKhuNha_form_saveButton');
            saveButton.innerText = 'Thêm khu nhà';
        }
    },
    update: async function(data)
    {
        const saveButton = $('#chuNha_quanLyKhuNha_form_saveButton');
        try
        {
            inactiveButton('chuNha_quanLyKhuNha_form_saveButton');
            saveButton.innerText = 'Đang cập nhật..';
            const ketQua = await APP.features.chuNha.quanLyKhuNha.form.api.update(data);
            if (!ketQua || ketQua.success === false || ketQua.thanhCong === false)
            {
                toast((ketQua && (ketQua.thongBao || ketQua.message)) || 'Không thể cập nhật khu nhà');
                return;
            }

            const khuNhaCapNhat = ketQua.data || ketQua.khuNha || ketQua;
            const danhSachKhuNha = APP.cache.danhSachKhuNha.data;
            const index = danhSachKhuNha.findIndex(k => String(k.idKhuNha) === String(data.idKhuNha));
            if (index !== -1)
            {
                danhSachKhuNha[index] = khuNhaCapNhat.idKhuNha
                    ? khuNhaCapNhat
                    : Object.assign({}, danhSachKhuNha[index], data);
            }
            APP.features.chuNha.quanLyKhuNha.list.control.refresh();
            APP.features.chuNha.quanLyKhuNha.form.control.abort();
            toast('Cập nhật thông tin khu nhà thành công');
        }
        catch (loi)
        {
            await canhBao('Có lỗi khi cập nhật khu nhà:\n' + loi.message, 'Lỗi khi cập nhật khu nhà', 'ok');
        }
        finally
        {
            activeButton('chuNha_quanLyKhuNha_form_saveButton');
            saveButton.innerText = 'Cập nhật khu nhà';
        }
    },
    delete: async function(idKhuNha, tenKhuNha)
    {
        const confirmDelete = await canhBao(`Bạn có chắc chắn muốn xóa khu nhà "${tenKhuNha}" không?`, 'Xác nhận xóa khu nhà', 'okCancel');
        if (!confirmDelete) return;

        try
        {
            const ketQua = await APP.features.chuNha.quanLyKhuNha.form.api.delete(idKhuNha, tenKhuNha);
            if (!ketQua || ketQua.success === false || ketQua.thanhCong === false)
            {
                toast((ketQua && (ketQua.thongBao || ketQua.message)) || 'Không thể xóa khu nhà');
                return;
            }

            const khuNha = APP.cache.danhSachKhuNha.data.find(k => String(k.idKhuNha) === String(idKhuNha));
            if (khuNha) khuNha.active = '0';
            toast('Xóa khu nhà thành công');
            APP.features.chuNha.quanLyKhuNha.list.control.refresh();
        }
        catch (loi)
        {
            await canhBao('Có lỗi khi xóa khu nhà:\n' + loi.message, 'Lỗi khi xóa khu nhà', 'ok');
        }
    },
    reset: function()
    {
        $('#chuNha_quanLyKhuNha_form_idKhuNha').value = '';
        $('#chuNha_quanLyKhuNha_form_tenKhuNha').value = '';
        $('#chuNha_quanLyKhuNha_form_diaChi').value = '';
        $('#chuNha_quanLyKhuNha_form_moTa').value = '';
        $('#chuNha_quanLyKhuNha_form_trangThai').value = 'dangHoatDong';
    },
    abort: function()
    {
        APP.features.chuNha.quanLyKhuNha.form.control.reset();
        APP.features.chuNha.quanLyKhuNha.list.ui.show();
    }
};