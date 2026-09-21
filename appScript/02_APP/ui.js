APP.ui = 
{
    render: function() //chỉ cập nhật state hiện tại của ui,chứ không xây ui từ đầu
    {
        if (APP.state.manHinhHienTai.vaiTro == 'chuNha' || APP.state.manHinhHienTai.vaiTro == 'khachHang')
        {
            activeButton('sidebar_' + APP.state.manHinhHienTai.manHinh);
            APP.ui.hideAllForms();
            APP.ui.showTab(APP.state.manHinhHienTai.vaiTro, APP.state.manHinhHienTai.manHinh);
            return;
        }
        else
        {
            APP.user.login.ui.show();
        }
    },
    init: function()
    {    
        //render modal dialogs
        toast_render();
        canhBao_render();
        
        
        
        //Render layout: header, sidebar, view, footer
        APP.header.control.init();  
        
        APP.sidebar.control.init();
        APP.actionbar.control.init();
        APP.user.control.init();

        APP.view.control.init();
        APP.footer.control.init();
    },
    setManHinh: function(vaiTro, manHinh, type)
    {
        APP.state.manHinhHienTai =
        {
            vaiTro: vaiTro,
            manHinh: manHinh,
            type: type
        };            

        APP.ui.render();
        APP.ui.scrollTop();
    },
    hideAllForms: function()
    {
        [
            'themMoiKhachHang_form',
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
    },
    showTab: function(vaiTro, manHinh)
    {
        APP.ui.hideAllTabs();
        let tabId = 'tab_' + manHinh;
        let danhSachId = tabId + '_danhSach';
        if ($('#' + tabId))
        {
            show(tabId);
            show(danhSachId);
            return;
        }
        APP.ui.hienThiDangPhatTrien('Màn hình');
    }
};