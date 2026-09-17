APP.features.chuNha.sidebar.control = 
{
    init: function()
    {
        const manHinhDangChon = 'chuNha_dashboard';
        const sidebar =
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

        $('#sidebarGrid').innerHTML = sidebar.map(function(item)
        {
            const active = item.manHinh === manHinhDangChon ? ' sidebar__button__selected' : ''; //active 1 lần đầu
            return `
                <div
                    id="sidebar_${item.manHinh}"
                    class="sidebar__button${active}"
                    onclick="APP.ui.setManHinh('chuNha','${item.manHinh}'); APP.sidebar.ui.hideIfMobile(); APP.sidebar.control.setSelectedButton(this);">
                    ${item.ten}
                </div>
            `;
        }).join('');
    }
};
