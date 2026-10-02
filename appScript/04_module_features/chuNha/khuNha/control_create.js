
function themMoiKhuNha_them()
{
    const duLieu = themMoiKhuNha_layDuLieu();
    google.script.run
        .withSuccessHandler(function(ketQua)
        {
            if (ketQua)
            {
                APP.cache.danhSachKhuNha = APP.cache.danhSachKhuNha || [];
                APP.cache.danhSachKhuNha.push(ketQua);
                chuNha_showDanhSachKhuNha(APP.cache.danhSachKhuNha);                
                //capNhatTongQuanTuCache();
                return;
            }

            toast('Không thể thêm khu nhà');
        })
        .withFailureHandler(function(loi)
        {
            alert('Có lỗi khi thêm khu nhà:\n' + loi.message);
        })
        .sv_themKhuNha(duLieu, APP.user.token);
}
