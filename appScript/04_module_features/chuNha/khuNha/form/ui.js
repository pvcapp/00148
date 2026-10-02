APP.features.chuNha.quanLyKhuNha.form.ui = 
{
    init: function()
    {
        let formHTML = `
            <div class="card__caption">THÊM MỚI KHU NHÀ</div>

            <div class="card__container">   
                <div class="form__field_01" style="display: none;">
                    <label for="chuNha_quanLyKhuNha_form_idKhuNha">Id khu Nhà</label>
                    <input type="text" id="chuNha_quanLyKhuNha_form_idKhuNha">
                </div>

                <div class="form__field_01">
                    <label for="chuNha_quanLyKhuNha_form_tenKhuNha">Tên khu nhà</label>
                    <input type="text" id="chuNha_quanLyKhuNha_form_tenKhuNha" required>
                </div>

                <div class="form__field_01">
                    <label for="chuNha_quanLyKhuNha_form_diaChi">Địa chỉ</label>
                    <input type="text" id="chuNha_quanLyKhuNha_form_diaChi">
                </div>

                <div class="form__field_01">
                    <label for="chuNha_quanLyKhuNha_form_moTa">Mô tả</label>
                    <input type="text" id="chuNha_quanLyKhuNha_form_moTa">
                </div>

                <div class="form__field_01">
                    <label for="chuNha_quanLyKhuNha_form_trangThai">Trạng thái</label>
                    <select id="chuNha_quanLyKhuNha_form_trangThai">
                        <option value="dangHoatDong">Đang hoạt động</option>
                        <option value="tamDung">Ngừng hoạt động</option>
                    </select>
                </div>
            </div>

            <div class="form__footer">
                <div class="button_01" id="chuNha_quanLyKhuNha_form_saveButton"
                onclick="APP.features.chuNha.quanLyKhuNha.form.control.submit()">Thêm khu nhà</div>
                <div class="button_01" onclick="APP.features.chuNha.quanLyKhuNha.form.control.reset()">Làm mới</div>
                <div class="button_01" onclick="APP.features.chuNha.quanLyKhuNha.form.control.abort()">Bỏ qua</div>
            </div>`;

        APP.view.ui.addTab('chuNha', 'quanLyKhuNha', 'form', formHTML);        
    },
    render: function(mode = 'addNew', idKhuNha = '')
    {
        APP.features.chuNha.quanLyKhuNha.form.mode = mode;
        APP.features.chuNha.quanLyKhuNha.form.idKhuNha = idKhuNha;

        if (mode === 'addNew')
        {
            $('#chuNha_quanLyKhuNha_form_saveButton').innerText = 'Thêm khu nhà';
            APP.features.chuNha.quanLyKhuNha.form.control.reset();
        }
        else if (mode === 'update' || mode === 'edit')
        {
            $('#chuNha_quanLyKhuNha_form_saveButton').innerText = 'Cập nhật khu nhà';
            const khuNha = APP.cache.danhSachKhuNha.data.find(k => k.idKhuNha === idKhuNha);
            if (khuNha)
            {
                $('#chuNha_quanLyKhuNha_form_idKhuNha').value = khuNha.idKhuNha || '';
                $('#chuNha_quanLyKhuNha_form_tenKhuNha').value = khuNha.tenKhuNha || '';
                $('#chuNha_quanLyKhuNha_form_diaChi').value = khuNha.diaChi || '';
                $('#chuNha_quanLyKhuNha_form_moTa').value = khuNha.moTa || '';
                $('#chuNha_quanLyKhuNha_form_trangThai').value = khuNha.trangThai || 'dangHoatDong';
            }
        }
    },
    show: function()
    {
        APP.view.ui.showTab('chuNha', 'quanLyKhuNha', 'form');
    }
}