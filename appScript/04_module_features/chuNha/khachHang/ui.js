APP.features.chuNha.quanLyKhachHang = 
{
    ui:{}, control: {}, api: {},
    list:
    {
        style:
        {
            tableStyle: 'table_01',
            cardStyle: 'detailCard_01'
        },
        ui: {},
        control: {},
        api: {}
    },
    detail:
    {
        style: 'detail_01',
        ui: {},
        control: {},
        api: {}
    },
    form:
    {
        style: 'form_01',
        ui: {},
        control: {},
        api: {}
    }
};


APP.features.chuNha.quanLyKhachHang.ui = 
{
    init: function()
    {
        APP.features.chuNha.quanLyKhachHang.list.ui.init();
        APP.features.chuNha.quanLyKhachHang.detail.ui.init();
        //APP.features.chuNha.quanLyKhachHang.form.ui.init();
    }
};