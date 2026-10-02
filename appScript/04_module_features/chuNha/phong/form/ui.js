APP.features.chuNha.quanLyPhong.form.ui = 
{
    init: function()
    {
        const tabHeader = document.createElement('div');
        tabHeader.className = 'tab__header';
        tabHeader.innerHTML = `<span class="card__caption" id="chuNha_quanLyPhong_form_header">Danh sách phòng</span>`;            
        APP.view.ui.addTab('chuNha', 'quanLyPhong', 'form', tabHeader);

        const tab_main = document.createElement('div');
        tab_main.id = 'chuNha_quanLyPhong_form_main';
        tab_main.className = 'tab__main';
        tab_main.innerHTML = `
            <div class="card form__grid" style="background: rgba(255,255,255,0.3)">
                <div class="form__field_01">
                    <label for="chuNha_quanLyPhong_form_idKhuNha">Khu nhà</label>
                    <select id="chuNha_quanLyPhong_form_idKhuNha"></select>
                </div>        

                <div class="form__field_01">
                    <label for="chuNha_quanLyPhong_form_tang">Tầng</label>
                    <input type="text" id="chuNha_quanLyPhong_form_tang">
                </div>
            </div>

            <div class="card form__grid" style="margin-top: 12px;">
                <div class="form__field_01">
                    <label for="chuNha_quanLyPhong_form_tenPhong">Tên phòng</label>
                    <input type="text" id="chuNha_quanLyPhong_form_tenPhong" required>
                </div>

                <div class="form__field_01">
                    <label for="chuNha_quanLyPhong_form_dienTich">Diện tích</label>
                    <input type="number" id="chuNha_quanLyPhong_form_dienTich" min="0" step="0.1">
                </div>

                <div class="form__field_01">
                    <label for="chuNha_quanLyPhong_form_giaNiemYet">Giá phòng</label>
                    <input type="number" id="chuNha_quanLyPhong_form_giaNiemYet" min="0" step="1000">
                </div>

                <div class="form__field_01">
                    <label for="chuNha_quanLyPhong_form_tienDatCoc">Tiền cọc mặc định</label>
                    <input type="number" id="chuNha_quanLyPhong_form_tienDatCoc" min="0" step="1000">
                </div>

                <div class="form__field_01">
                    <label for="chuNha_quanLyPhong_form_trangThai">Trạng thái</label>
                    <select id="chuNha_quanLyPhong_form_trangThai">
                        <option value="dangHoatDong">Đang hoạt động</option>
                        <option value="tamDung">Tạm dừng hoạt động</option>                
                    </select>
                </div>

                <div class="form__field_01">
                    <label for="chuNha_quanLyPhong_form_moTa">Mô tả</label>
                    <input type="text" id="chuNha_quanLyPhong_form_moTa">
                </div>
            </div>

            <div class="form__footer" style="flex-direction:row;margin-top:12px;margin-bottom:100px;gap: 12px;">                
                <div class="button_01" id="chuNha_quanLyKhachHang_form_saveButton"
                    onclick="APP.features.chuNha.quanLyPhong.form.control.submit()">
                    Thêm phòng
                </div>
                <div class="button_01" onclick="APP.features.chuNha.quanLyPhong.form.control.refresh()">
                    Làm mới
                </div>
                <div class="button_01" onclick="APP.features.chuNha.quanLyPhong.form.control.abort()">
                    Bỏ qua
                </div>
            </div>
        `;
        APP.view.ui.addElementToTab('chuNha', 'quanLyPhong', 'form', tab_main);   
    },
    renderKhuNhaOptions: function()
    {
        const select = $('#chuNha_quanLyPhong_form_idKhuNha');
        if (!select)
        {
            return;
        }
        const danhSachKhuNha = APP.cache && APP.cache.danhSachKhuNha ? APP.cache.danhSachKhuNha.data : [];

        select.innerHTML = `
            <option value="">-- Chọn khu nhà --</option>
            ${danhSachKhuNha.map(function(khuNha)
            {
                const idKhuNha = khuNha.idKhuNha || '';
                const tenKhuNha = khuNha.tenKhuNha;

                return `
                    <option value="${escapeHtml(idKhuNha)}">
                        ${escapeHtml(tenKhuNha)}
                    </option>
                `;
            }).join('')}
        `;

            /*
        const select = $('#chuNha_quanLyPhong_form_idKhuNha');

        select.innerHTML = `
            <option value="">-- Chọn khu nhà --</option>
            ${(APP.cache.danhSachKhuNha || []).map(function(khuNha)
            {
                const idKhuNha = khuNha.idKhuNha || '';
                const tenKhuNha = khuNha.tenKhuNha;
                return `<option value="${escapeHtml(idKhuNha)}">${escapeHtml(tenKhuNha)}</option>`;
            }).join('')}
        `;*/
    },
    render: function(mode = 'addNew', idPhong = '')
    {
        if (mode =='addNew')
        {
            APP.features.chuNha.quanLyPhong.form.control.reset();
            $('#chuNha_quanLyKhachHang_form_saveButton').innerText = 'Thêm phòng';
        }
        else
        {
            $('#chuNha_quanLyKhachHang_form_saveButton').innerText = 'Cập nhật phòng';
            const phong = (APP.cache.danhSachPhong.data || []).find(function(dong)
            {
                return String(dong.idPhong) === String(idPhong);
            });

            if (!phong)
            {
                toast('Không tìm thấy phòng');
                return;
            }
            APP.features.chuNha.quanLyPhong.form.idPhong = idPhong;
            APP.features.chuNha.quanLyPhong.form.ui.renderKhuNhaOptions();
            $('#chuNha_quanLyPhong_form_idKhuNha').value = phong.idKhuNha || '';
            $('#chuNha_quanLyPhong_form_tang').value = phong.tang || '';

            $('#chuNha_quanLyPhong_form_tenPhong').value = phong.tenPhong || '';    
            $('#chuNha_quanLyPhong_form_dienTich').value = phong.dienTich || '';
            $('#chuNha_quanLyPhong_form_giaNiemYet').value = phong.giaNiemYet || '';
            $('#chuNha_quanLyPhong_form_tienDatCoc').value = phong.tienDatCoc || '';
            $('#chuNha_quanLyPhong_form_trangThai').value = phong.trangThai || 'dangHoatDong';
            $('#chuNha_quanLyPhong_form_moTa').value = phong.moTa || '';
        }
    },
    show: function()
    {
        APP.view.ui.showTab('chuNha', 'quanLyPhong', 'form');
    }
};