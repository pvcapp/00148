//Bao gồm: thông tin tổng quát về việc thuê phòng, trang thái hồ sơ (để bổ sung), trạng thái hợp đồng, nội quy 
// và các thông tin tổng quát khác
APP.ui.khachHang.dashboard =
{
    startup: function(khachHang, danhSachHopDong) 
    {
        const hopDong = (danhSachHopDong || []).filter(function(item) {
            return ['HieuLuc', 'DangThue'].indexOf(item.trangThai) !== -1;
        })[0] || (danhSachHopDong || [])[0] || {};
        let trangThaiArray = {
            'DangThue':'Đang thuê',
            'HetThue' : 'Hết thuê'};
        return `
        <div class="tab__grid">
            ${taoTheSo('Trạng thái', trangThaiArray[khachHang.trangThai] || '')}
            ${taoTheSo('Phòng', hopDong.tenPhong || 'Chưa có')}
        </div>

        <div class="card">
            <h2 class="card__caption">Thông tin của tôi</h2>
            <p>email: ${escapeHtml(khachHang.email || '')}</p>
            <p>Điện thoại: ${escapeHtml(khachHang.dienThoai || '')}</p>
            <p>CCCD: ${escapeHtml(khachHang.soCCCD || '')}</p>
        </div>
        `;
        

        APP.ui.setManHinh('khachHang', 'khachHang_dashboard');
    },
    render: function()
    {
        let ndDiv = document.createElement('div');
        ndDiv.id = 'tab_khachHang_dashboard_danhSach';
        ndDiv.className = 'tab__noi-dung';
            let welcomeDiv = document.createElement('div');
            welcomeDiv.id = 'tab_khachHang_dashboard_welcome';
            welcomeDiv.className = 'card__caption';
        ndDiv.appendChild(welcomeDiv);

        $('#tab_khachHang_dashboard').appendChild(ndDiv);
    },
    show: function()
    {
        APP.ui.setManHinh('khachHang', 'khachHang_dashboard');
    },
    hide: function()
    {

    }
};