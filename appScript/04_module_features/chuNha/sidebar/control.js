APP.features.chuNha.sidebar.control = 
{
    init: function()
    {
        const moduleDangChon = 'dashboard';
        const sidebar =
        [
            { module: 'dashboard', ten: 'Home' },
            { module: 'khuNha', ten: 'Khu nhà' },
            { module: 'phong', ten: 'Phòng' },
            
            { module: 'quanLyKhachHang', ten: 'Khách hàng' },
            { module: 'hopDong', ten: 'Phòng cho thuê'},
            { module: 'thanhToan', ten: 'Thanh toán' },
            { module: 'setting', ten: 'Setting' }
            //{ module: 'noiQuy', ten: 'Nội quy' },   
            //{ module: 'huongDanSuDung', ten: 'Hướng dẫn sử dụng thiết bị' }       
        ];

        $('#sidebarGrid').innerHTML = sidebar.map(function(item)
        {
            const active = item.module === moduleDangChon ? ' sidebar__button__selected' : ''; //active 1 lần đầu
            return `
                <div
                    id="sidebar_chuNha_${item.module}"
                    class="sidebar__button${active}"
                    onclick="APP.ui.setManHinh('chuNha','${item.module}', 'list');">
                    ${item.ten}
                </div>
            `;
        }).join('');
    }
};
