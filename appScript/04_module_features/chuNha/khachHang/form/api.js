APP.features.chuNha.quanLyKhachHang.form.api = 
{
    get: function ()
    {

    },
    create: function()
    {
        const data = APP.features.chuNha.quanLyKhachHang.form.control.getData();

        return new Promise((resolve, reject) =>
        {
            google.script.run
                .withSuccessHandler(resolve)
                .withFailureHandler(reject)
                .sv_chuNha_addNewKhachHang(data, APP.user.token);
        });
    },
    update: function()
    {

    }    
};