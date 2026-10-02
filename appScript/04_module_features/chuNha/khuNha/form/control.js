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
            APP.features.chuNha.quanLyKhuNha.form.control.addNew(data);
        }
        else if (APP.features.chuNha.quanLyKhuNha.form.mode == 'update')
        {
            APP.features.chuNha.quanLyKhuNha.form.control.update(data);
        }
    },
    addNew: async function(data)
    {
        inactiveButton('chuNha_quanLyKhuNha_form_saveButton');
        $('#chuNha_quanLyKhuNha_form_saveButton').innerText = 'Đang thêm..';
        const ketQua = await APP.features.chuNha.quanLyKhuNha.api.addNew(data);
        if (ketQua && ketQua.success)
        {
            activeButton('chuNha_quanLyKhuNha_form_saveButton');
            $('#chuNha_quanLyKhuNha_form_saveButton').innerText = 'Thêm khu nhà';            
            
            APP.cache.danhSachKhuNha.data.push(ketQua);
            APP.features.chuNha.quanLyKhuNha.list.ui.render();
            APP.features.chuNha.quanLyKhuNha.list.ui.show();            
            toast('Thêm mới khu nhà thành công');
        }
    },
    update: async function(data)
    {
        inactiveButton('chuNha_quanLyKhuNha_form_saveButton');
        $('#chuNha_quanLyKhuNha_form_saveButton').innerText = 'Đang cập nhật..';
        const ketQua = await APP.features.chuNha.quanLyKhuNha.api.update(data);
        if (ketQua && ketQua.success)
        {
            activeButton('chuNha_quanLyKhuNha_form_saveButton');
            $('#chuNha_quanLyKhuNha_form_saveButton').innerText = 'Cập nhật khu nhà';
            
            const index = APP.cache.danhSachKhuNha.data.findIndex(k => k.idKhuNha === data.idKhuNha);
            if (index !== -1)
            {
                APP.cache.danhSachKhuNha.data[index] = ketQua;
            }
            APP.features.chuNha.quanLyKhuNha.list.ui.render();
            APP.features.chuNha.quanLyKhuNha.list.ui.show();
            toast('Cập nhật thông tin khu nhà thành công');
        }
    },
    delete: async function(idKhuNha, tenKhuNha)
    {
        const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa khu nhà "${tenKhuNha}" không?`);
        if (!confirmDelete) return;

        const ketQua = await APP.features.chuNha.quanLyKhuNha.api.delete(idKhuNha);
        if (ketQua && ketQua.success)
        {
            toast('Xóa khu nhà thành công');
            APP.features.chuNha.quanLyKhuNha.list.control.refresh();
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