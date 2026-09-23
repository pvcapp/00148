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
                <div id="formKhachHang_caption" class="card__caption hide-on-mobile" style="width:200px;">
                    ${APP.features.chuNha.quanLyKhachHang.form == 'new' ? 'Thêm khách hàng mới' : 'Cập nhật thông tin'}
                </div>
            </div>`;
        tabHeader.appendChild(button({
            type: 'iconOnlyButton'
            iconSrc: 'https://pvcapp.github.io/00148/img/recycle.svg',
            onclick: () => APP.chuNha.quanLyKhachHang.control.delete(APP.chuNha.quanLyKhachHang.form.idKhachHang, $('#formKhachHang_input_hoVaTen').value)
            }));
        APP.view.ui.addTab('chuNha', 'quanLyKhachHang', 'form_thongTinCoBan', tabHeader);
        
        const tab_main = document.createElement('div');
        tab_main.id = 'chuNha_quanLyKhachHang_list_main';
        tab_main.className = 'tab__main';
        tab_main.appendChild(loadingBar());
        APP.view.ui.addElementToTab('chuNha', 'quanLyKhachHang', 'list', tab_main);
        
        <div class="card" style="max-width:400px; padding:var(--padding-xl); display:flex; gap:12px; flex-direction:column;">
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
        </div>
    }
};