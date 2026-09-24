APP.features.chuNha.quanLyKhachHang.form.ui = 
{   
    init: function()
    {
        APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan.ui.init();
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
        
        <div class="form__footer" style="margin-top:12px;">                
                        <div id="chuNha_khachHang_updateButton" class="button"
                            onclick="APP.features.chuNha.quanLyKhachHang.detail.xacMinh.control.ok();">
                            Chấp nhận
                        </div>  

                        <div class="button" id="chuNha_khachHang_update_reset" 
                            onclick="APP.features.chuNha.quanLyKhachHang.detail.xacMinh.control.notOk();">
                            Không chấp nhận
                        </div>

                        <div class="button" 
                            onclick="APP.features.chuNha.quanLyKhachHang.detail.xacMinh.control.hide();">
                            Bỏ qua
                        </div>
                    </div>
        const footer = div({className: 'form__footer', parent: formKhachHang_card1});

        footer.appendChild(button({
            id: 'chuNha_khachHang_saveButton', 
            text: 'Thêm khách hàng', 
            onclick: () => APP.ui.chuNha.quanLyKhachHang.form.thongTinCoBan.control.submit()
        }));

        footer.appendChild(button({
            text: 'Bỏ qua', 
            onclick: () => APP.ui.chuNha.quanLyKhachHang.form.thongTinCoBan.control.abort()
        }));
                    
        APP.view.ui.addElementToTab('chuNha', 'quanLyKhachHang', 'form_thongTinCoBan', tab_main);
    },
    show: function()
    {
        APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan.control.reset();
        APP.view.ui.showTab('chuNha', 'quanLyKhachHang', 'form_thongTinCoBan');
    }
};

