APP.ui = 
{
    setManHinh: function(vaiTro, manHinh)
    {
        APP.state.manHinhHienTai =
        {
            vaiTro: vaiTro,
            manHinh: manHinh
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
            .querySelectorAll('#uiBody .tab')
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
    },
    render: function()
    {            
        if (APP.state.manHinhHienTai.vaiTro == 'chuNha' || APP.state.manHinhHienTai.vaiTro == 'khachHang')
        {
            activeButton('menu_' + APP.state.manHinhHienTai.manHinh);
            APP.ui.hideAllForms();
            APP.ui.showTab(APP.state.manHinhHienTai.vaiTro, APP.state.manHinhHienTai.manHinh);
            return;
        }
        else
        {
            APP.user.login.show();
        }
    }
};