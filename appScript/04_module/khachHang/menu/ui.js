APP.khachHang.menu =
{
    startup: function()
    {
        APP.khachHang.menu.render();
        APP.khachHang.menu.show();
    },
    render: function()
    {
        const manHinhDangChon = APP.state.manHinhHienTai.manHinh || 'khachHang_dashboard';

        const menu =
        [
            { manHinh: 'khachHang_dashboard', ten: 'Home' },
            { manHinh: 'khachHang_hoSo', ten: 'Hồ sơ' },
            { manHinh: 'khachHang_hopDong', ten: 'Hợp đồng' },
            { manHinh: 'khachHang_dienNuoc', ten: 'Điện nước' },
            { manHinh: 'khachHang_thanhToan', ten: 'Thanh toán' },            
            { manHinh: 'khachHang_tamTru', ten: 'Thủ tục tạm trú' },
            { manHinh: 'khachHang_vi', ten: 'Ví' }
        ];

        $('#menuGrid').innerHTML = menu.map(function(item)
        {
            const selected = item.manHinh === manHinhDangChon ? ' menu__button__selected' : '';
            return `
                <div id="menu_${item.manHinh}" class="menu__button${selected}"
                    onclick="APP.ui.setManHinh('khachHang', '${item.manHinh}'); APP.menu.ui.hideIfMobile(); APP.menu.ui.setSelectedButton(this);">
                    ${item.ten}
                </div>
            `;
        }).join('');        
    },
    show: function()
    {
        hide('buttonChoThuePhong');
        APP.menu.ui.setSelectedButton($('#menu_khachHang_dashboard'));
    }
};
