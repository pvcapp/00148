APP.features.chuNha.quanLyKhuNha = 
{
    list: {tableStyle: 'table_01', cardStyle: 'detailCard_01',ui: {}, control: {}},
    form: {ui: {}, control: {}, api: {}},
    ui: {}, 
    control: {}, 
    api: {}
};

APP.features.chuNha.quanLyKhuNha.ui = 
{
    init: function()
    {
        APP.features.chuNha.quanLyKhuNha.list.ui.init();
        APP.features.chuNha.quanLyKhuNha.form.ui.init();
    },
    render: function()
    {
        APP.features.chuNha.quanLyKhuNha.list.ui.render();
    }
};