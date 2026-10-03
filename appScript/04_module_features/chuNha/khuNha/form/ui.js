APP.features.chuNha.quanLyKhuNha.form.ui = 
{
    init: function()
    {
        let tabHeader = document.createElement('div');
        tabHeader.className = 'tab__header';
        tabHeader.innerHTML = `<div class="tab__header" id="chuNha_quanLyKhuNha_form_caption">THÊM MỚI KHU NHÀ</div>`;
        APP.view.ui.addTab('chuNha', 'quanLyKhuNha', 'form', tabHeader);   
        
        let tabMain = document.createElement('div');
        tabMain.id = 'chuNha_quanLyKhuNha_form_main';
        tabMain.className = 'card__container';
        tabMain.innerHTML = `
            <div class="form__field_01" style="display: none;">
                <label for="chuNha_quanLyKhuNha_form_idKhuNha">Id khu Nhà</label>
                <input type="text" id="chuNha_quanLyKhuNha_form_idKhuNha">
            </div>

            <div class="form__field_01" style="max-width:450px;">
                <label for="chuNha_quanLyKhuNha_form_tenKhuNha">Tên khu nhà</label>
                <input type="text" id="chuNha_quanLyKhuNha_form_tenKhuNha" required>
            </div>

            <div class="form__field_01" style="max-width:450px;">
                <label for="chuNha_quanLyKhuNha_form_diaChi">Địa chỉ</label>
                <input type="text" id="chuNha_quanLyKhuNha_form_diaChi">
            </div>

            <div class="form__field_01" style="max-width:450px;">
                <label for="chuNha_quanLyKhuNha_form_moTa">Mô tả</label>
                <input type="text" id="chuNha_quanLyKhuNha_form_moTa">
            </div>

            <div class="form__field_01" style="max-width:450px;">
                <label for="chuNha_quanLyKhuNha_form_trangThai">Trạng thái</label>
                <select id="chuNha_quanLyKhuNha_form_trangThai">
                    <option value="dangHoatDong">Đang hoạt động</option>
                    <option value="tamDung">Ngừng hoạt động</option>
                </select>
            </div>
        `;
               
        
        let tabFooter = document.createElement('div');
        tabFooter.className = 'form__footer';

        let saveButton = document.createElement('div');
        saveButton.className = 'button_01';
        saveButton.id = 'chuNha_quanLyKhuNha_form_saveButton';
        saveButton.innerText = 'Thêm khu nhà';
        saveButton.onclick = function() {
            APP.features.chuNha.quanLyKhuNha.form.control.submit();
        };
        tabFooter.appendChild(saveButton);

        let resetButton = document.createElement('div');
        resetButton.className = 'button_01';
        resetButton.innerText = 'Làm mới';
        resetButton.onclick = function() {
            APP.features.chuNha.quanLyKhuNha.form.control.reset();
        };
        tabFooter.appendChild(resetButton);

        let abortButton = document.createElement('div');
        abortButton.className = 'button_01';
        abortButton.innerText = 'Bỏ qua';
        abortButton.onclick = function() {
            APP.features.chuNha.quanLyKhuNha.form.control.abort();
        };
        tabFooter.appendChild(abortButton);
        tabMain.appendChild(tabFooter);
        APP.view.ui.addElementToTab('chuNha', 'quanLyKhuNha', 'form', tabMain);
    },
    render: function(mode = 'addNew', idKhuNha = '')
    {
        APP.features.chuNha.quanLyKhuNha.form.mode = mode;
        APP.features.chuNha.quanLyKhuNha.form.idKhuNha = idKhuNha;

        if (mode === 'addNew')
        {
            $('#chuNha_quanLyKhuNha_form_caption').innerText = 'THÊM MỚI KHU NHÀ';
            $('#chuNha_quanLyKhuNha_form_saveButton').innerText = 'Thêm khu nhà';
            APP.features.chuNha.quanLyKhuNha.form.control.reset();
        }
        else if (mode === 'update' || mode === 'edit')
        {
            $('#chuNha_quanLyKhuNha_form_caption').innerText = 'CẬP NHẬT KHU NHÀ';
            $('#chuNha_quanLyKhuNha_form_saveButton').innerText = 'Cập nhật khu nhà';
            const danhSachKhuNha = APP.cache.danhSachKhuNha && Array.isArray(APP.cache.danhSachKhuNha.data)
                ? APP.cache.danhSachKhuNha.data
                : [];
            const khuNha = danhSachKhuNha.find(k => String(k.idKhuNha) === String(idKhuNha));
            if (khuNha)
            {
                $('#chuNha_quanLyKhuNha_form_idKhuNha').value = khuNha.idKhuNha || '';
                $('#chuNha_quanLyKhuNha_form_tenKhuNha').value = khuNha.tenKhuNha || '';
                $('#chuNha_quanLyKhuNha_form_diaChi').value = khuNha.diaChi || '';
                $('#chuNha_quanLyKhuNha_form_moTa').value = khuNha.moTa || '';
                $('#chuNha_quanLyKhuNha_form_trangThai').value = khuNha.trangThai || 'dangHoatDong';
            }
            else
            {
                toast('Không tìm thấy khu nhà');
            }
        }
    },
    show: function()
    {
        APP.view.ui.showTab('chuNha', 'quanLyKhuNha', 'form');
    }
}