APP.features.chuNha.quanLyKhachHang.form.ui = 
{   
    init: function()
    {
        
    }
};


APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan = 
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
         
        /* formField({id='formKhachHang_input_hoVaTen',caption = 'Họ và tên') */

        tab_main.innerHTML = `
        <div class="card" style="max-width:450px; padding:var(--padding-xl); display:flex; gap:12px; flex-direction:column;">
            <div class="form__field hide">
                <label for="formKhachHang_input_idKhachHang">
                    Mã khách hàng
                </label>
                <input type="text" id="formKhachHang_input_idKhachHang" placeholder="" readonly>
            </div>

            <div class="form__field">
                <label for="formKhachHang_input_hoVaTen">
                    Họ và tên
                </label>
                <input type="text" id="formKhachHang_input_hoVaTen" placeholder="" required>
            </div>

            <div class="form__field">
                <label for="formKhachHang_input_dienThoai">
                    Số điện thoại
                </label>
                <input type="tel" id="formKhachHang_input_dienThoai" placeholder="" inputmode="numeric" maxlength="10" required>
            </div>

            <div class="form__field">
                <label for="formKhachHang_input_soCCCD">
                    Số CCCD
                </label>
                <input type="text" id="formKhachHang_input_soCCCD" placeholder="" inputmode="numeric" maxlength="12" required>
            </div>

            <div class="form__footer">
                <div id="chuNha_khachHang_saveButton" class="button sidebar__button" onclick="APP.ui.chuNha.quanLyKhachHang.addNew.submit()">
                    Thêm khách hàng
                </div>

                <div class="sidebar__button button" onclick="APP.ui.chuNha.quanLyKhachHang.update.abort();">
                    Bỏ qua
                </div>
            </div>

        </div>`;

        APP.view.ui.addElementToTab('chuNha', 'quanLyKhachHang', 'list', tab_main);
    }
};