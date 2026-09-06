async function xoaKhuNha(idKhuNha, tenKhuNha)
{
    let cb = await canhBao('Bạn có chắc chắn muốn xóa khu nhà: ' + tenKhuNha, 'Xác nhận xóa khu nhà', 'okCancel');
    if (!cb) return;
    toast('Đang xóa khu nhà: ' + tenKhuNha);
    google.script.run
    .withSuccessHandler(function(ketQua) 
    {
        if (!ketQua.thanhCong) 
        {
            toast(ketQua.thongBao);
            return;
        }

        if (ketQua && ketQua.thanhCong) 
        {
            toast('Đã xóa khu nhà!');
            const khuNha = APP.data.khuNha.find(
                khu => String(khu.idKhuNha) === String(idKhuNha)
            );

            if (khuNha) 
            {
                khuNha.active = '0';
            }
            chuNha_showDanhSachKhuNha(APP.data.khuNha);
            capNhatTongQuanTuCache();
        }
    })
    .withFailureHandler(function(loi) 
    {   
        console.error(loi);
        alert('Có lỗi khi xóa khu nhà:\n' + loi.message);
    })
    .sv_xoaKhuNha(idKhuNha, tenKhuNha, APP.user.token);
}
