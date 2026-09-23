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
        control: {}
    },
    detail:
    {
        style: 'detail_01',
        idKhachHang: '',
        ui: {},
        control: {},
        xacMinh: {ui: {}, control: {}}
    },
    form:
    {
        mode: 'new',
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
        
    },
    render: function()
    {
        //Chỉ render list:
        APP.features.chuNha.quanLyKhachHang.list.ui.render();
    }
};