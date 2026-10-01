APP.features.chuNha.quanLyKhachHang.form.api = 
{
    get: function ()
    {

    },
    create: function()
    {
        
        const data = APP.features.chuNha.quanLyKhachHang.form.control.getData();
        console.log(JSON.stringify(data));
        return new Promise((resolve, reject) =>
        {
            google.script.run
                .withSuccessHandler(resolve)
                .withFailureHandler(reject)
                .sv_chuNha_quanLyKhachHang_addNew(data, APP.user.token);
        });
    },
    update: async function(data)
    {
        try
        {
            const kh = await new Promise((resolve, reject) =>
            {
                google.script.run
                    .withSuccessHandler(resolve)
                    .withFailureHandler(reject)
                    .sv_capNhatKhachHang(
                        APP.features.chuNha.quanLyKhachHang.form.idKhachHang,
                        data,
                        APP.user.token
                    );
            });

            console.log('Khách hàng sau khi cập nhật:', kh);

            return kh;
        }
        catch (loi)
        {
            alert('Có lỗi khi cập nhật Khách hàng:\n' + loi.message);
        }
        finally
        {
            activeButton('chuNha_khachHang_updateButton');
            $('#chuNha_khachHang_updateButton').innerText = 'Lưu thay đổi';
        }
    }
};