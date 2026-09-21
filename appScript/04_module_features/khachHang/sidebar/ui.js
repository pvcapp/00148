APP.features.khachHang.sidebar.ui =
{
    render: function()
    {
        const moduleDangChon = APP.state.manHinhHienTai.module || 'dashboard';

        const sidebar =
        [
            { module: 'dashboard', ten: 'Home' },
            { module: 'hoSo', ten: 'Hồ sơ' },
            { module: 'hopDong', ten: 'Hợp đồng' },
            { module: 'dienNuoc', ten: 'Điện nước' },
            { module: 'thanhToan', ten: 'Thanh toán' },            
            { module: 'tamTru', ten: 'Thủ tục tạm trú' },
            { module: 'vi', ten: 'Ví' }
        ];

        $('#sidebarGrid').innerHTML = sidebar.map(function(item)
        {
            const selected = item.module === moduleDangChon ? ' sidebar__button__selected' : '';
            return `
                <div id="sidebar_khachHang_${item.module}" class="sidebar__button${selected}"
                    onclick="APP.ui.setManHinh('khachHang', '${item.module}'); APP.sidebar.ui.hideIfMobile(); APP.sidebar.control.setSelectedButton(this);">
                    ${item.ten}
                </div>
            `;
        }).join('');        
    },
    show: function()
    {
        APP.sidebar.control.setSelectedButton($('#sidebar_dashboard'));
    }
};
