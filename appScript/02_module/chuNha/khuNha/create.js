function themKhu(duLieu, token) 
{
    sv_user_kiemTraQuyen_(['chuNha'], token);

    if (!duLieu || !duLieu.tenKhuNha) {
        throw new Error('Thieu ten khu');
    }

    const idKhuNha = taoId_('KT');
    const ngay = new Date();
    const duLieuMoi = {
        idKhuNha: idKhuNha,
        maKhuNha: idKhuNha,
        tenKhuNha: duLieu.tenKhuNha,
        diaChi: duLieu.diaChi || '',
        moTa: duLieu.moTa || '',
        trangThai: duLieu.trangThai || 'active',
        ngayTao: ngay,
        ngayCapNhat: ngay
    };

    sv_updateRow_('03_KhuNha', duLieuMoi);

    if ((duLieu.trangThai || 'active') !== 'inactive') {
        congCacheTongQuan_('tongSoKhuNha', 1);
    }

    sv_createLog('them', 'KhuTro', idKhuNha, 'Them khu: ' + duLieu.tenKhuNha);

    return duLieuMoi;
}
