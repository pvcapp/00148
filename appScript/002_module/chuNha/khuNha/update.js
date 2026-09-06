function khuNha_edit(idKhuNha)
{
    const khu =
        (APP.data.khuNha || []).find(function(khu)
        {
            return String(khu.idKhuNha) === String(idKhuNha);
        });

    if (!khu)
    {
        toast('Không tìm thấy khu nhà');
        return;
    }

    khuNha_edit_loadForm(khu);
}



function khuNha_edit_loadForm(duLieu)
{
    if (!duLieu)
    {
        toast('Không tìm thấy dữ liệu khu nhà');
        return;
    }

    $('#khuNha_edit_id').value = duLieu.id || '';
    $('#khuNha_edit_idKhuNha').value = duLieu.idKhuNha || '';
    $('#khuNha_edit_tenKhuNha').value = duLieu.tenKhuNha || '';
    $('#khuNha_edit_diaChi').value = duLieu.diaChi || '';
    $('#khuNha_edit_moTa').value = duLieu.moTa || '';
    $('#khuNha_edit_trangThai').value = duLieu.trangThai || 'dangHoatDong';
    $('#khuNha_edit_ngayTao').value = khuNha_edit_doiNgayGio(duLieu.ngayTao);
    $('#khuNha_edit_ngayCapNhat').value = khuNha_edit_doiNgayGio(duLieu.ngayCapNhat);
    hide('khuNha_danhSach_div');
    show('khuNha_edit_form', 'grid');
}


function khuNha_edit_doiNgayGio(duLieu)
{
    if (!duLieu)
    {
        return '';
    }

    const ngay = new Date(duLieu);
    if (isNaN(ngay.getTime()))
    {
        return '';
    }

    return (
        ngay.getFullYear() + '-' +
        String(ngay.getMonth() + 1).padStart(2, '0') + '-'+
        String(ngay.getDate()).padStart(2, '0') + 'T' +  
        String(ngay.getHours()).padStart(2, '0') + ':' +
        String(ngay.getMinutes()).padStart(2, '0')
    );
}


/*
 * Lấy dữ liệu từ form
 */
function khuNha_edit_layDuLieu()
{
    return {

        id:
            document.getElementById(
                'khuNha_edit_id'
            ).value.trim(),

        idKhuNha:
            document.getElementById(
                'khuNha_edit_idKhuNha'
            ).value.trim(),

        tenKhuNha:
            document.getElementById(
                'khuNha_edit_tenKhuNha'
            ).value.trim(),

        diaChi:
            document.getElementById(
                'khuNha_edit_diaChi'
            ).value.trim(),

        moTa:
            document.getElementById(
                'khuNha_edit_moTa'
            ).value.trim(),

        trangThai:
            document.getElementById(
                'khuNha_edit_trangThai'
            ).value,

        ngayTao:
            document.getElementById(
                'khuNha_edit_ngayTao'
            ).value,

        ngayCapNhat:
            document.getElementById(
                'khuNha_edit_ngayCapNhat'
            ).value

    };
}


/*
 * Kiểm tra dữ liệu
 */
function khuNha_edit_kiemTra(duLieu)
{
    if (!duLieu.id)
    {
        toast('Không xác định được khu nhà');
        return false;
    }


    if (!duLieu.tenKhuNha)
    {
        toast('Vui lòng nhập tên khu');
        return false;
    }


    if (!duLieu.diaChi)
    {
        toast('Vui lòng nhập địa chỉ');
        return false;
    }


    if (!duLieu.trangThai)
    {
        toast('Vui lòng chọn trạng thái khu nhà');
        return false;
    }


    return true;
}


/*
 * Lưu thay đổi
 */
function khuNha_edit_luu()
{
    const duLieu =
        khuNha_edit_layDuLieu();


    if (!khuNha_edit_kiemTra(duLieu))
    {
        return;
    }



    inactiveButton('chuNha_newKhuNha_saveButton');
    $('#chuNha_newKhuNha_saveButton').innerText = 'Đang lưu..';


    google.script.run

        .withSuccessHandler(
            function(ketQua)
            {
                activeButton('chuNha_newKhuNha_saveButton');
                $('#chuNha_newKhuNha_saveButton').innerText = 'Lưu thay đổi';


                if (
                    ketQua &&
                    ketQua.thanhCong
                )
                {
                    toast(
                        ketQua.thongBao ||
                        'Cập nhật khu nhà thành công'
                    );


                    khuNha_edit_boQua();

                    /*
                     * Nếu API trả lại dữ liệu khu
                     * đã cập nhật thì cập nhật APP.data.khu
                     */
                    if (
                        ketQua.duLieu &&
                        APP.data &&
                        Array.isArray(
                            APP.data.khu
                        )
                    )
                    {
                        const viTri =
                            APP.data.khuNha.findIndex(
                                function(dong)
                                {
                                    return String(
                                        dong.id
                                    ) === String(
                                        duLieu.id
                                    );
                                }
                            );


                        if (viTri !== -1)
                        {
                            APP.data.khu[viTri] =
                                ketQua.duLieu;
                        }
                    }
                }
                else
                {
                    alert(
                        ketQua &&
                        ketQua.thongBao
                            ? ketQua.thongBao
                            : 'Không thể cập nhật khu nhà'
                    );
                }
            }
        )

        .withFailureHandler(
            function(loi)
            {
                activeButton('chuNha_newKhuNha_saveButton');
                $('#chuNha_newKhuNha_saveButton').innerText = 'Lưu thay đổi';


                console.error(loi);


                alert(
                    'Có lỗi khi cập nhật khu nhà:\n' +
                    loi.message
                );
            }
        )

        .capNhatKhuNha(duLieu);
}


/*
 * Làm mới form
 *
 * Không tạo dữ liệu mới.
 * Chỉ lấy lại dữ liệu hiện tại của khu nhà.
 */
function khuNha_edit_lamMoi()
{
    const id =
        document.getElementById(
            'khuNha_edit_id'
        ).value.trim();


    if (!id)
    {
        return;
    }


    if (
        !APP.data ||
        !Array.isArray(APP.data.khuNha)
    )
    {
        return;
    }


    const duLieu =
        APP.data.khuNha.find(
            function(dong)
            {
                return String(
                    dong.id
                ) === String(id);
            }
        );


    if (duLieu)
    {
        khuNha_edit_loadForm(
            duLieu
        );
    }
}


/*
 * Bỏ qua chỉnh sửa
 */
function khuNha_edit_boQua()
{
    khuNha_edit_lamMoi();

    hide('khuNha_edit_form');

    show(
        'khuNha_danhSach_div'
    );
}
