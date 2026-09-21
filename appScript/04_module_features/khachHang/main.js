APP.features.khachHang =
{
    ui:
    {       
        taiDuLieuManHinh: function(module)
        {
            if (APP.state.dangTai[ module])
            {
                return;
            }

            APP.state.dangTai[module] = true;

            google.script.run
                .withSuccessHandler(function(duLieu)
                {
                    APP.state.dangTai[module] = false;
                    Object.assign(APP.cache, duLieu || {});

                    if (
                        APP.state.manHinhHienTai.vaiTro === 'khachHang' &&
                        APP.state.manHinhHienTai.module === module
                    )
                    {
                        APP.ui.render();
                    }
                })
                .withFailureHandler(function(loi)
                {
                    APP.state.dangTai[module] = false;
                    alert('Có lỗi khi tải dữ liệu:\n' + loi.message);
                })
                .sv_khachHang_layDuLieuManHinh(module, APP.user.token);
        }
    },
    control:
    {
        startup: function()
        {
            APP.features.khachHang.sidebar.ui.init();
            APP.features.khachHang.dashboard.startup();
        }
    },
    api:
    {

    },
    thongTinHopDong:
    {
        startup: function()
        {
            chuNha_showDanhSachKhachHang(APP.cache.danhSachKhachHang || []);
            activeButton('sidebar_khachHang_hopDong');
        },
        render: function()
        {
            if (APP.state.manHinhHienTai.module === 'khachHang_hopDong') 
            {
                APP.ui.showTab('tab_khachHang_hopDong');
            }
        }
    }
};
