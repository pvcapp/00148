APP.features.chuNha.sidebar.control = 
{
    init: function()
    {
        const moduleDangChon = 'chuNha_dashboard';
        const sidebar =
        [
            { module: 'chuNha_dashboard', ten: 'Home' },
            { module: 'chuNha_khuNha', ten: 'Khu nhà' },
            { module: 'chuNha_phong', ten: 'Phòng' },
            
            { module: 'chuNha_khachHang', ten: 'Khách hàng' },
            { module: 'chuNha_hopDong', ten: 'Phòng cho thuê'},
            { module: 'chuNha_thanhToan', ten: 'Thanh toán' },
            { module: 'chuNha_setting', ten: 'Setting' }
            //{ module: 'chuNha_noiQuy', ten: 'Nội quy' },   
            //{ module: 'chuNha_huongDanSuDung', ten: 'Hướng dẫn sử dụng thiết bị' }       
        ];

        $('#sidebarGrid').innerHTML = sidebar.map(function(item)
        {
            const active = item.module === moduleDangChon ? ' sidebar__button__selected' : ''; //active 1 lần đầu
            return `
                <div
                    id="sidebar_${item.module}"
                    class="sidebar__button${active}"
                    onclick="APP.ui.setManHinh('chuNha','${item.module}', 'list');">
                    ${item.ten}
                </div>
            `;
        }).join('');
    }
};
