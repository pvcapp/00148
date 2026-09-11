APP.ui.khachHang =
{
    thongTinHopDong:
    {
        startup: function()
        {
            chuNha_showDanhSachKhachHang(APP.data.danhSachKhachHang || []);
            activeButton('menu_khachHang_hopDong');
        },
        render: function()
        {
            if (APP.state.manHinhHienTai.manHinh === 'khachHang_hopDong') 
            {
                APP.ui.showTab('tab_khachHang_hopDong');
            }
        }
    },
    
    taiDuLieuManHinh: function(manHinh)
    {
        if (APP.state.dangTai[ manHinh])
        {
            return;
        }

        APP.state.dangTai[manHinh] = true;

        google.script.run
            .withSuccessHandler(function(duLieu)
            {
                APP.state.dangTai[manHinh] = false;
                Object.assign(APP.data, duLieu || {});

                if (
                    APP.state.manHinhHienTai.vaiTro === 'khachHang' &&
                    APP.state.manHinhHienTai.manHinh === manHinh
                )
                {
                    APP.ui.render();
                }
            })
            .withFailureHandler(function(loi)
            {
                APP.state.dangTai[manHinh] = false;
                alert('Có lỗi khi tải dữ liệu:\n' + loi.message);
            })
            .sv_khachHang_layDuLieuManHinh(manHinh, APP.user.token);
    }
};
