APP.features.chuNha.dashboard = {ui: {}, control: {}};

APP.features.chuNha.dashboard.control = 
{ 
    init: function()
    {
        APP.features.chuNha.dashboard.ui.init();
    }    
}

APP.features.chuNha.dashboard.ui = 
{   
    init: function()
    {
        const card_container_data = APP.cache.tongQuan.map(item => ({
            data: item,
            type: 'numberCard_01'
        }));
        const darhboard_part1 = card_container(card_container_data, id ='chuNha_dashboard_tab_container');
        APP.view.ui.addTab('chuNha', 'dashboard', 'list', darhboard_part1);
    }
};


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
