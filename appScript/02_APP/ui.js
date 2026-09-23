APP.ui = 
{
    init: function()
    {    
        //render modal dialogs
        toast_init();
        canhBao_init();
        
        //Render layout: header, sidebar, view, footer
        APP.loadingScreen.init();
        APP.header.control.init();  
        
        APP.sidebar.control.init();
        APP.actionbar.control.init();
        APP.user.control.init();

        APP.view.control.init();
        APP.footer.control.init();
    },
    render: function()
    {
        const state = APP.state.manHinhHienTai;
        if (!state) return;

        if (state.vaiTro != 'chuNha' && state.vaiTro != 'khachHang')
        {
            console.log('APP.ui.render: Vai trò người dùng không xác định!');
            APP.user.login.ui.show();
            return;
        }

        APP.sidebar.ui.hideIfMobile();
        APP.sidebar.control.setSelectedButton('sidebar_' + state.vaiTro + '_' + state.module);

        APP.view.ui.showTab(state.vaiTro, state.module, state.type || 'list');
        APP.ui.scrollTop();
    },
    setManHinh: function(vaiTro, module, type)
    {
        APP.state.manHinhHienTai =
        {
            vaiTro: vaiTro,
            module: module,
            type: type
        };            

        APP.ui.render();
        APP.ui.scrollTop();
    },
    hideAllForms: function()
    {
        [
            'formKhachHang_input_form',
            'khuNha_edit_form',
            'themMoiKhuNha_form',
            'themMoiPhong_form',
            'phong_edit_form',
            'hopDong_form'
        ].forEach(function(id)
        {
            if ($('#' + id))
            {
                hide(id);
            }
        });

        document
            .querySelectorAll('.formKhachHang, .formKhuNha, .formPhong, .formHopDong')
            .forEach(function(form)
            {
                form.style.display = 'none';
            });
    },
    scrollTop: function()
    {
        window.scrollTo(
        {
            top: 0,
            left: 0,
            behavior: 'auto'
        });
    },
    hideAllTabs: function()
    {
        document
            .querySelectorAll('#ui_main .tab')
            .forEach(function(tab)
            {
                tab.style.display = 'none';
            });
    }
};