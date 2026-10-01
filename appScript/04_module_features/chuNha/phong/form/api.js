APP.features.chuNha.quanLyPhong.form.api =
{
    create: function(data)
    {
        return new Promise((resolve, reject) =>
        {
            google.script.run
                .withSuccessHandler(resolve)
                .withFailureHandler(reject)
                .sv_themPhong(data, APP.user.token);
        });
    },
    update: function(idPhong, data)
    {
        return new Promise((resolve, reject) =>
        {
            google.script.run
                .withSuccessHandler(resolve)
                .withFailureHandler(reject)
                .sv_capNhatPhong(idPhong, data, APP.user.token);
        });
    },
    get: function(idPhong)
    {
        return new Promise((resolve, reject) =>
        {
            google.script.run
                .withSuccessHandler(resolve)
                .withFailureHandler(reject)
                .sv_layPhong(idPhong, APP.user.token);
        });
    },
    getAll: function()
    {
        return new Promise((resolve, reject) =>
        {
            google.script.run
                .withSuccessHandler(resolve)
                .withFailureHandler(reject)
                .sv_layDanhSachPhong(APP.user.token);
        });
    },
    getAllByKhuNha: function(idKhuNha)
    {
        return new Promise((resolve, reject) =>
        {
            google.script.run
                .withSuccessHandler(resolve)
                .withFailureHandler(reject)
                .sv_layDanhSachPhongTheoKhuNha(idKhuNha, APP.user.token);
        });
    },
    getAllByKhuNhaAndTang: function(idKhuNha, tang)
    {
        return new Promise((resolve, reject) =>
        {
            google.script.run
                .withSuccessHandler(resolve)
                .withFailureHandler(reject)
                .sv_layDanhSachPhongTheoKhuNhaVaTang(idKhuNha, tang, APP.user.token);
        });
    },
    getAllByKhuNhaAndTangAndTrangThai: function(idKhuNha, tang, trangThai)
    {
        return new Promise((resolve, reject) =>
        {
            google.script.run
                .withSuccessHandler(resolve)
                .withFailureHandler(reject)
                .sv_layDanhSachPhongTheoKhuNhaVaTangVaTrangThai(idKhuNha, tang, trangThai, APP.user.token);
        });
    },
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
