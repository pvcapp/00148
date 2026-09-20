APP.features.chuNha.dashboard = 
{
    render: function()
    {
        const card_container_data = APP.cache.tongQuan.map(item => ({
            data: item,
            type: 'numberCard_01'
        }));
        const darhboard_part1 = card_container(card_container_data, id ='chuNha_dashboard_tab_container');
        //Sau này dùng chung APP.view.control.renderTab(); cho dashboard và các loại khác. Id đặt theo chuẩn để show hide
        $('#view').appendChild(darhboard_part1);
    }
};


function chuNha_buildDashboard(tongQuan) 
{
    return `
        <h1 class="card__caption">Trang chủ</h1>

        <div class="tab__grid">
            ${totalCard_render('Tổng số khu nhà', tongQuan.tongSoKhuNha || 0)}
            ${totalCard_render('Tổng số phòng', tongQuan.tongSoPhong || tongQuan.tongPhong || 0)}
            ${totalCard_render('Số phòng đang thuê', tongQuan.soPhongDangThue || tongQuan.dangThue || 0)}
            ${totalCard_render('Số phòng trống', tongQuan.soPhongTrong || tongQuan.phongTrong || 0)}
            ${totalCard_render('Tổng số khách', tongQuan.tongSoKhach || tongQuan.tongKhach || 0)}
        </div>
    `;
}

function capNhatTongQuanTuCache()
{
    google.script.run
        .withSuccessHandler(function(tongQuan)
        {
            APP.cache.tongQuan = tongQuan || {};
            $('#tab_chuNha_dashboard_danhSach').innerHTML = chuNha_buildDashboard(APP.cache.tongQuan);                
        })
        .withFailureHandler(function(loi)
        {
            console.error(loi);
        })
        .sv_chuNha_getDashboardData(APP.user.token);
}

function hienThiGiaoDienChuNha() 
{
    APP.ui.setManHinh('chuNha', 'chuNha_dashboard');
}
