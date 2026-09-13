//Bao gồm: thông tin tổng quát về việc thuê phòng, trang thái hồ sơ (để bổ sung), trạng thái hợp đồng, nội quy 
// và các thông tin tổng quát khác
APP.khachHang.dashboard =
{
    ui:
    {
        show: function()
        {
            APP.ui.setManHinh('khachHang', 'khachHang_dashboard');
        },
        hide: function()
        {

        }
    },
    control:
    {
        init: function()
        {
            let ndDiv = document.createElement('div');
            ndDiv.id = 'tab_khachHang_dashboard_danhSach';
            ndDiv.className = 'tab__noi-dung';

                let welcomeDiv = document.createElement('div');
                welcomeDiv.id = 'tab_khachHang_dashboard_welcome';
                welcomeDiv.className = 'card__caption';
                ndDiv.appendChild(welcomeDiv);

                let totalDiv = document.createElement('div');
                totalDiv.id = 'tab_khachHang_dashboard_total';
                totalDiv.className = 'tab__grid';
                ndDiv.appendChild(totalDiv);

                let thongTinKhachHangDiv = document.createElement('div');
                thongTinKhachHangDiv.id = 'tab_khachHang_dashboard_thongTinKhachHang';
                thongTinKhachHangDiv.className = 'card';
                ndDiv.appendChild(thongTinKhachHangDiv);

            $('#tab_khachHang_dashboard').appendChild(ndDiv);
        },
        startup: function()
        {
            APP.khachHang.dashboard.ui.init();
            //Thông tin nhanh hồ sơ khách hàng:
            
            
            
            //Thông tin nhanh hợp đồng
            danhSachHopDong = APP.data.danhSachHopDong;
            if (!danhSachHopDong || danhSachHopDong.length == 0)
            {
                
            }
            
            const hopDong = (danhSachHopDong || []).filter(function(item) {
                return hopDongActive(item)
            })[0] || (danhSachHopDong || [])[0] || {};
            
            let trangThaiArray = {
                'DangThue':'Đang thuê',
                'HetThue' : 'Hết thuê'};
            
            
            return `
                <div class="tab__grid">
                    ${totalCard_render('Trạng thái', trangThaiArray[khachHang.trangThai] || '')}
                    ${totalCard_render('Phòng', hopDong.tenPhong || 'Chưa có')}
                </div>

                <div class="card">
                    <h2 class="card__caption">Thông tin của tôi</h2>
                    <p>email: ${escapeHtml(khachHang.email || '')}</p>
                    <p>Điện thoại: ${escapeHtml(khachHang.dienThoai || '')}</p>
                    <p>CCCD: ${escapeHtml(khachHang.soCCCD || '')}</p>
                </div>`;
            

            APP.ui.setManHinh('khachHang', 'khachHang_dashboard');
        },
    },
    server:
    {

    }
};