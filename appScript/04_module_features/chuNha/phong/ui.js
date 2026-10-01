APP.features.chuNha.quanLyPhong = 
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
        control: {}
    },
    detail:
    {
        style: 'detail_01',
        idPhong: '',
        ui: {},
        control: {}
    },
    form:
    {
        mode: 'addNew',
        style: 'form_01',
        idPhong: '',
        ui: {},
        control: {},
        api: {}
    }
};


APP.features.chuNha.quanLyPhong.ui = 
{
    init: function()
    {
        APP.features.chuNha.quanLyPhong.list.ui.init();
        APP.features.chuNha.quanLyPhong.form.ui.init();
    },
    render: function()
    {
        //render list
    }
};