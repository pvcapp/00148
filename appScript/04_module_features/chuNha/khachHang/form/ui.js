APP.features.chuNha.quanLyKhachHang.form.ui = 
{   
    init: function()
    {
        APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan.ui.init();
        APP.features.chuNha.quanLyKhachHang.form.thongTinChiTiet.ui.init();
    }
};

APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan = 
{ 
    ui: {},
    control:{}
};

APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan.ui =
{
    init: function()
    {
        const tabHeader = document.createElement('div');
        tabHeader.className = 'tab__header';
        tabHeader.innerHTML = `
            <div style="display: flex; flex-wrap: nowrap;">
                <div id="chuNha_quanLyKhachHang_form_thongTinCoBan_caption" class="card__caption hide-on-mobile" style="width:200px;">
                    Thêm khách hàng mới
                </div>
            </div>`;            
        APP.view.ui.addTab('chuNha', 'quanLyKhachHang', 'form_thongTinCoBan', tabHeader);
        
        const tab_main = document.createElement('div');
        tab_main.id = 'chuNha_quanLyKhachHang_form_thongTinCoBan_main';
        tab_main.className = 'tab__main';
        
        const formKhachHang_card1 = div({className: 'card', parent: tab_main,
            style: 'max-width:450px; padding:var(--padding-xl); display:flex; gap:12px; flex-direction:column;'});

        formKhachHang_card1.appendChild(formField({
            id: 'formKhachHang_input_hoVaTen', 
            caption: 'Họ và tên', 
            required: true}));
        formKhachHang_card1.appendChild(formField({
            id: 'formKhachHang_input_dienThoai', 
            caption: 'Số điện thoại', 
            required: true, 
            type: 'tel' }));
        formKhachHang_card1.appendChild(formField({
            id: 'formKhachHang_input_soCCCD', 
            caption: 'Số CCCD', 
            required: true}));
        
        
        const footer = div({className: 'form__footer', parent: formKhachHang_card1});

        footer.appendChild(button({
            id: 'chuNha_khachHang_saveButton', 
            text: 'Thêm khách hàng', 
            onclick: () => APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan.control.submit()
        }));

        footer.appendChild(button({
            text: 'Bỏ qua', 
            onclick: () => APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan.control.abort()
        }));
                    
        APP.view.ui.addElementToTab('chuNha', 'quanLyKhachHang', 'form_thongTinCoBan', tab_main);
    },
    show: function()
    {
        APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan.control.reset();
        APP.view.ui.showTab('chuNha', 'quanLyKhachHang', 'form_thongTinCoBan');
    }
};








APP.features.chuNha.quanLyKhachHang.form.thongTinChiTiet.ui =
{
    init: function()
    {
        const tabHeader = document.createElement('div');
        tabHeader.className = 'tab__header';
        tabHeader.innerHTML = `
            <div style="display: flex; flex-wrap: nowrap;">
                <div id="chuNha_quanLyKhachHang_form_thongTinCoBan_caption" class="card__caption hide-on-mobile" style="width:200px;">
                    Thêm khách hàng mới
                </div>
            </div>`;            
        APP.view.ui.addTab('chuNha', 'quanLyKhachHang', 'form_thongTinChiTiet', tabHeader);
        
        const tab_main = document.createElement('div');
        tab_main.id = 'chuNha_quanLyKhachHang_form_thongTinChiTiet_main';
        tab_main.className = 'tab__main';
        
        const formKhachHang_card1 = div({className: 'card', parent: tab_main,
            style: 'max-width:450px; padding:var(--padding-xl); display:flex; gap:12px; flex-direction:column;'});

        formKhachHang_card1.innerHTML = `
            - Họ và tên: <span id="formKhachHang_input_hoVaTen_text"></span><br>
            - Số điện thoại: <span id="formKhachHang_input_dienThoai_text"></span><br>
            - Số CCCD: <span id="formKhachHang_input_soCCCD_text"></span><br>
        `;
        
        formKhachHang_card1.innerHTML += 
            `<input type="hidden" id="formKhachHang_input_idKhachHang">
            <div class="form__field_01">
                <label for="formKhachHang_input_gioiTinh">
                    Giới tính
                </label>
                <select id="formKhachHang_input_gioiTinh">
                    <option value="">-- Chọn giới tính --</option>
                    <option value="Nam">Nam</option>
                    <option value="Nu">Nữ</option>
                    <option value="Khac">Khác</option>
                </select>
            </div>

            <div class="form__field_01">
                <label for="formKhachHang_input_ngaySinh">
                    Ngày sinh
                </label>
                <table>
                    <tr>
                        <td>
                            <input type="number" id="formKhachHang_input_ngaySinh" placeholder="" style="width:80px;">
                        </td>
                        <td>
                            <input type="number" id="formKhachHang_input_thangSinh" placeholder="" style="width:80px;">
                        </td>
                        <td>
                            <input type="number" id="formKhachHang_input_namSinh" placeholder="" style="width:160px;">
                        </td>
                    </tr>
                </table>            
            </div>
            
            <div class="form__field">
                <label for="formKhachHang_input_gioiTinh">
                    Giới tính
                </label>
                <select id="formKhachHang_input_gioiTinh">
                    <option value="">-- Chọn giới tính --</option>
                    <option value="Nam">Nam</option>
                    <option value="Nu">Nữ</option>
                    <option value="Khac">Khác</option>
                </select>
            </div>

            <div class="form__field">
                <label for="formKhachHang_input_email">
                    Email
                </label>
                <input type="email" id="formKhachHang_input_email" placeholder="">
            </div>`;


        const formKhachHang_card2 = div({className: 'card', parent: tab_main,
            style: 'max-width:450px; padding:var(--padding-xl); display:flex; gap:12px; flex-direction:column;'});
        formKhachHang_card2.innerHTML = `
            <div class="form__field">
                <label for="formKhachHang_input_diaChiThuongTru">
                    Địa chỉ thường trú
                </label>
                <input type="text" id="formKhachHang_input_diaChiThuongTru" placeholder="">
            </div>

            <div class="form__field" style="display: none;">
                <label for="formKhachHang_input_ngheNghiep">
                    Nghề nghiệp
                </label>
                <input class="form__field" style="display: none;" type="text" id="formKhachHang_input_ngheNghiep" placeholder="">
            </div>

            <div class="form__field" style="display: none;">
                <label for="formKhachHang_input_anhKhach">
                    Ảnh khách hàng
                </label>
                <input type="text" id="formKhachHang_input_anhKhach" placeholder="">
            </div>

            <div class="form__field" style="display: none;">
                <label for="formKhachHang_input_anhCCCDMatTruoc">
                    Ảnh CCCD mặt trước
                </label>
                <input type="text" id="formKhachHang_input_anhCCCDMatTruoc" placeholder="">
            </div>

            <div class="form__field" style="display: none;">
                <label for="formKhachHang_input_anhCCCDMatSau">
                    Ảnh CCCD mặt sau
                </label>
                <input type="text" id="formKhachHang_input_anhCCCDMatSau" placeholder="">
            </div>

            <div class="form__field">
                <label for="formKhachHang_input_ghiChu">
                    Ghi chú
                </label>
                <textarea id="formKhachHang_input_ghiChu" placeholder=""></textarea>
            </div>
            <input type="hidden" id="formKhachHang_input_xacMinh">
            <input type="hidden" id="formKhachHang_input_active">`;


        const footer = div({className: 'form__footer', parent: formKhachHang_card2});

        footer.appendChild(button({
            id: 'formKhachHang_thongTinChiTiet_saveButton', 
            text: 'Thêm khách hàng', 
            onclick: () => APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan.control.submit()
        }));

        footer.appendChild(button({
            id: 'formKhachHang_thongTinChiTiet_reset', 
            text: 'Làm mới', 
            onclick: () => APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan.control.submit()
        }));

        footer.appendChild(button({
            text: 'Bỏ qua', 
            onclick: () => APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan.control.abort()
        }));
                    
        APP.view.ui.addElementToTab('chuNha', 'quanLyKhachHang', 'form_thongTinCoBan', tab_main);
    },
    render: function()
    {

    },
    show: function()
    {
        APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan.control.reset();
        APP.view.ui.showTab('chuNha', 'quanLyKhachHang', 'form_thongTinCoBan');
    }
};




            
            
