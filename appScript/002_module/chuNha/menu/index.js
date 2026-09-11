APP.ui.chuNha.menu = 
{
    startup: function()
    {
        APP.ui.chuNha.menu.render();
        APP.ui.chuNha.menu.show();
    },
    render: function()
    {
        const manHinhDangChon = APP.state.manHinhHienTai.manHinh || 'home';
        const menu =
        [
            { manHinh: 'chuNha_dashboard', ten: 'Home' },
            { manHinh: 'chuNha_khuNha', ten: 'Khu nhà' },
            { manHinh: 'chuNha_phong', ten: 'Phòng' },
            
            { manHinh: 'chuNha_khachHang', ten: 'Khách hàng' },
            { manHinh: 'chuNha_hopDong', ten: 'Phòng cho thuê'},
            { manHinh: 'chuNha_thanhToan', ten: 'Thanh toán' },
            { manHinh: 'chuNha_setting', ten: 'Setting' }
            //{ manHinh: 'chuNha_noiQuy', ten: 'Nội quy' },   
            //{ manHinh: 'chuNha_huongDanSuDung', ten: 'Hướng dẫn sử dụng thiết bị' }       
        ];

        $('#menuGrid').innerHTML = menu.map(function(item)
        {
            const active = item.manHinh === manHinhDangChon ? ' menu__button__selected' : ''; //active 1 lần đầu
            return `
                <div
                    id="menu_${item.manHinh}"
                    class="menu__button${active}"
                    onclick="APP.ui.setManHinh('chuNha','${item.manHinh}'); APP.ui.menu.hideIfMobile(); APP.ui.menu.setSelectedButton(this);">
                    ${item.ten}
                </div>
            `;
        }).join('');
    },
    show: function()
    {
        show('buttonChoThuePhong');
        APP.ui.menu.setSelectedButton($('#menu_chuNha_dashboard'));
    }
};
