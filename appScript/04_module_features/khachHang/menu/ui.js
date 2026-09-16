APP.features.khachHang.sidebar.ui =
{
    render: function()
    {
        const manHinhDangChon = APP.state.manHinhHienTai.manHinh || 'khachHang_dashboard';

        const sidebar =
        [
            { manHinh: 'khachHang_dashboard', ten: 'Home' },
            { manHinh: 'khachHang_hoSo', ten: 'Hồ sơ' },
            { manHinh: 'khachHang_hopDong', ten: 'Hợp đồng' },
            { manHinh: 'khachHang_dienNuoc', ten: 'Điện nước' },
            { manHinh: 'khachHang_thanhToan', ten: 'Thanh toán' },            
            { manHinh: 'khachHang_tamTru', ten: 'Thủ tục tạm trú' },
            { manHinh: 'khachHang_vi', ten: 'Ví' }
        ];

        $('#sidebarGrid').innerHTML = sidebar.map(function(item)
        {
            const selected = item.manHinh === manHinhDangChon ? ' sidebar__button__selected' : '';
            return `
                <div id="sidebar_${item.manHinh}" class="sidebar__button${selected}"
                    onclick="APP.ui.setManHinh('khachHang', '${item.manHinh}'); APP.sidebar.ui.hideIfMobile(); APP.sidebar.ui.setSelectedButton(this);">
                    ${item.ten}
                </div>
            `;
        }).join('');        
    },
    show: function()
    {
        hide('buttonChoThuePhong');
        APP.sidebar.ui.setSelectedButton($('#sidebar_khachHang_dashboard'));
    }
};
