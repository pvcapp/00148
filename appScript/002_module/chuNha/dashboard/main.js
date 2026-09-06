function chuNha_buildDashboard(tongQuan) 
    {
        return `
            <h1 class="card__caption">Trang chủ</h1>

            <div class="luoi-tong-quan">
                ${taoTheSo('Tổng số khu nhà', tongQuan.tongSoKhuNha || 0)}
                ${taoTheSo('Tổng số phòng', tongQuan.tongSoPhong || tongQuan.tongPhong || 0)}
                ${taoTheSo('Số phòng đang thuê', tongQuan.soPhongDangThue || tongQuan.dangThue || 0)}
                ${taoTheSo('Số phòng trống', tongQuan.soPhongTrong || tongQuan.phongTrong || 0)}
                ${taoTheSo('Tổng số khách', tongQuan.tongSoKhach || tongQuan.tongKhach || 0)}
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
