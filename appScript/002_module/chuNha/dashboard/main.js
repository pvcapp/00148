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
                APP.data.tongQuan = tongQuan || {};
                $('#tab_chuNha_dashboard_danhSach').innerHTML = chuNha_buildDashboard(APP.data.tongQuan);                
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
