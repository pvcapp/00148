const { Application } = require("winjs");

APP.features.chuNha.quanLyKhachHang = 
{
    ui:
    {
        list: {
            type: 'table', 
            style: 'table_01',
            columns: { //custorm display of column for this view, and add virtual column

            },
            actions: {}
        },
        detail: {
            type: 'detail',
            style: 'detail_01',
            columns: {}          
        },
        form: {
            type: 'form',
            style: 'form_01',
            columns: {}
        }
    },
    control: 
    {
        list: 
        {
        },
        detail: 
        {        
        },
        form: 
        {
            
        }
    },
    api: 
    {
        get: function ()
        {

        },
        create: function()
        {

        },
        update: function()
        {

        }
    }
};