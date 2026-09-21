APP.features.khachHang.sidebar.ui =
{
    render: function()
    {
        const moduleDangChon = APP.state.manHinhHienTai.module || 'khachHang_dashboard';

        const sidebar =
        [
            { module: 'khachHang_dashboard', ten: 'Home' },
            { module: 'khachHang_hoSo', ten: 'Hồ sơ' },
            { module: 'khachHang_hopDong', ten: 'Hợp đồng' },
            { module: 'khachHang_dienNuoc', ten: 'Điện nước' },
            { module: 'khachHang_thanhToan', ten: 'Thanh toán' },            
            { module: 'khachHang_tamTru', ten: 'Thủ tục tạm trú' },
            { module: 'khachHang_vi', ten: 'Ví' }
        ];

        $('#sidebarGrid').innerHTML = sidebar.map(function(item)
        {
            const selected = item.module === moduleDangChon ? ' sidebar__button__selected' : '';
            return `
                <div id="sidebar_${item.module}" class="sidebar__button${selected}"
                    onclick="APP.ui.setManHinh('khachHang', '${item.module}'); APP.sidebar.ui.hideIfMobile(); APP.sidebar.control.setSelectedButton(this);">
                    ${item.ten}
                </div>
            `;
        }).join('');        
    },
    show: function()
    {
        APP.sidebar.control.setSelectedButton($('#sidebar_khachHang_dashboard'));
    }
};
