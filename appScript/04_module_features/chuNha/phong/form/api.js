APP.features.chuNha.quanLyPhong.form.api =
{
    delete: function(idPhong)
    {
        return new Promise((resolve, reject) =>
        {
            google.script.run
                .withSuccessHandler(resolve)
                .withFailureHandler(reject)
                .xoaPhong(idPhong, APP.user.token);
        });
    }
};
