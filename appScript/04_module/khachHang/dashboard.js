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
            <div class="tab" id="tab_khachHang_dashboard" style="display: none;">
                <div class="tab__noi-dung" id="tab_khachHang_dashboard_danhSach">
                </div>
            </div>

            let ndDiv = column({id: 'tab_khachHang_dashboard_danhSach', className: 'tab__noi-dung', 
                parentId: 'tab_khachHang_dashboard'});
                div({id: 'tab_khachHang_dashboard_welcome', className: 'card__caption', 
                    parent: ndDiv});                
                div({id: 'tab_khachHang_dashboard_total', className: 'tab__grid', 
                    parent: ndDiv});                
                div({id: 'tab_khachHang_dashboard_thongTinKhachHang', className: 'card', 
                    parent: ndDiv});
                div({id: 'tab_khachHang_dashboard_thongTinHopDong', className: 'card', 
                    parent: ndDiv});
        },
        startup: function()
        {
            APP.khachHang.dashboard.ui.init();
            //Thông tin nhanh hồ sơ khách hàng:
            $('#tab_khachHang_dashboard_welcome').innerText = `Xin chào ${APP.user.data.hoVaTen}`;            
            
            //Thông tin hồ sơ:
            //Đây là thông tin hồ sơ của bạn. Vui lòng bổ sung các thông tin còn thiếu để cập nhật hợp đồng sớm nhất. cảm ơn bạn!
            let khachHang = APP.data.danhSachKhachHang;
            $('#tab_khachHang_dashboard_thongTinKhachHang').innerHTML = `
                <div class="card">
                    <h2 class="card__caption">Thông tin hồ sơ</h2>
                    <p>email: ${escapeHtml(khachHang.email || '')}</p>
                    <p>Điện thoại: ${escapeHtml(khachHang.dienThoai || '')}</p>
                    <p>CCCD: ${escapeHtml(khachHang.soCCCD || '')}</p>
                </div>`;           


            //Thông tin nhanh hợp đồng
            danhSachHopDong = APP.data.danhSachHopDong;
            if (!danhSachHopDong || danhSachHopDong.length == 0)
            {
                $('#tab_khachHang_dashboard_thongTinHopDong').innerText = 'Bạn chưa thuê phòng nào';
            }
            else
            {
                $('#tab_khachHang_dashboard_thongTinHopDong').innerText = 'Tóm tắt các hợp đồng: các phòng đang thuê, ngày bắt đầu, ngày kết thúc (nếu có)';
                /* <div class="tab__grid">
                    ${totalCard_render('Trạng thái', trangThaiArray[khachHang.trangThai] || '')}
                    ${totalCard_render('Phòng', hopDong.tenPhong || 'Chưa có')}
                </div> */
            }

            APP.ui.setManHinh('khachHang', 'khachHang_dashboard');
        },
    },
    api:
    {

    }
};