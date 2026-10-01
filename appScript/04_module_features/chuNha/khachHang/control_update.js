
APP.features.chuNha.quanLyKhachHang.update = 
{
    idKhachHang: '',
    submit: async function()
    {
        const data = APP.features.chuNha.quanLyKhachHang.update.readData();
        if (!data.idKhachHang) 
        {
            canhBao('Lỗi kỹ thuật' , 'Không thấy id Khách hàng cần cập nhật');
            return;
        }

        if (!APP.features.chuNha.quanLyKhachHang.addNew.checkData(data)) return;

        inactiveButton('chuNha_khachHang_updateButton');
        $('#chuNha_khachHang_updateButton').innerText = 'Đang lưu..';
        toast('Đang cập nhật thông tin..');
        google.script.run
            .withSuccessHandler(function(kh)
            {
                activeButton('chuNha_khachHang_updateButton');
                $('#chuNha_khachHang_updateButton').innerText = 'Lưu thay đổi';
                const viTri = (APP.cache.danhSachKhachHang || []).findIndex(function(khach)
                {
                    return String(khach.idKhachHang) === String(data.idKhachHang);
                });

                if (viTri !== -1)
                {
                    APP.cache.danhSachKhachHang[viTri] = kh;
                }
                
                APP.features.chuNha.quanLyKhachHang.list.render();

                APP.features.chuNha.quanLyKhachHang.update.hide();
                APP.features.chuNha.quanLyKhachHang.list.show();
                capNhatTongQuanTuCache();
                toast('Đã cập nhật Khách hàng', 1500);
            })
            .withFailureHandler(function(loi)
            {
                activeButton('chuNha_khachHang_updateButton');
                $('#chuNha_khachHang_updateButton').innerText = 'Lưu thay đổi';
                alert('Có lỗi khi cập nhật Khách hàng:\n' + loi.message);
            })
            .sv_capNhatKhachHang(APP.features.chuNha.quanLyKhachHang.update.idKhachHang, data, APP.user.token);
    },
    reset: function()
    {
        APP.features.chuNha.quanLyKhachHang.update.show(APP.features.chuNha.quanLyKhachHang.update.idKhachHang);
    },
    abort: function()
    {
        APP.features.chuNha.quanLyKhachHang.addNew.reset();
        APP.features.chuNha.quanLyKhachHang.update.hide();
    },
    xacMinh:
    {
        show: function (idKhachHang)
        {
            //Load thong tin can xac minh:
            let phieuXacMinh = APP.cache.danhSachKhachHang_xacMinh.data.find(
                function(kh)
                {
                    return kh.idKhachHang == idKhachHang;
                }
            );

            if (!phieuXacMinh)
            {
                canhBao('show Bảng thông tin xác minhh bị lỗi: không thấy phiếu');
                return;
            } 
            APP.features.chuNha.quanLyKhachHang.update.idKhachHang = idKhachHang;

            $('#formKhachHang_xacMinhThongTin_hoVaTen').innerText = 'Họ và tên: ' + phieuXacMinh.hoVaTen      ;
            $('#formKhachHang_xacMinhThongTin_dienThoai').innerText = 'Điện thoại: ' + phieuXacMinh.dienThoai      ;
            $('#formKhachHang_xacMinhThongTin_soCCCD').innerText = 'Số CCCD: ' + phieuXacMinh.soCCCD      ;
            $('#formKhachHang_xacMinhThongTin_ngayThangNamSinh').innerText = 'Ngày sinh: ' + phieuXacMinh.ngaySinh + '/' + phieuXacMinh.thangSinh + '/' + phieuXacMinh.namSinh;
            $('#formKhachHang_xacMinhThongTin_gioiTinh').innerText = 'Giới tính: ' + phieuXacMinh.gioiTinh      ; 
            $('#formKhachHang_xacMinhThongTin_email').innerText = 'Email: ' + phieuXacMinh.email      ;
            $('#formKhachHang_xacMinhThongTin_diaChiThuongTru').innerText = 'Địa chỉ: ' + phieuXacMinh.diaChiThuongTru      ;
            $('#formKhachHang_xacMinhThongTin_ngheNghiep').innerText = 'Nghề nghiệp: ' + phieuXacMinh.ngheNghiep      ;           
            $('#formKhachHang_xacMinhThongTin_ghiChu').innerText = 'Ghi chú: ' + phieuXacMinh.ghiChu      ;


            show('formKhachHang_xacMinhThongTin_popup');
        },
        hide: function ()
        {
            hide('formKhachHang_xacMinhThongTin_popup');
        },
        ok: function(idKhachHang) 
        {
            const khachHang = APP.cache.danhSachKhachHang_xacMinh.data.find(function(khach) 
            {
                return String(khach.idKhachHang) === String(idKhachHang);
            });

            APP.cache.danhSachKhachHang_xacMinh.data.forEach(e => {
                console.log(idKhachHang);
                console.log(e.idKhachHang);
                console.log('String(khach.idKhachHang) === String(idKhachHang): ' + String(e.idKhachHang) === String(idKhachHang));
            });

            if (!khachHang)
            {
                toast('Không tìm thấy phiếu yêu cầu xác minh');
                return;
            }

            APP.features.chuNha.quanLyKhachHang.update.loadData(khachHang);
            APP.features.chuNha.quanLyKhachHang.update.idKhachHang = khachHang.idKhachHang;

            //Cập nhật tình trạng xác minh và render lại danh sách
            const idXoa = APP.cache.danhSachKhachHang_xacMinh.data.findIndex(
                khach => String(khach.idKhachHang) === String(idKhachHang)
            );
            if (idXoa !== -1) 
            {
                APP.cache.danhSachKhachHang_xacMinh.splice(idXoa, 1);
            }

            //update thông tin khách hàng            
            APP.features.chuNha.quanLyKhachHang.update.submit();
            //Xóa phiếu chờ xác minh
            google.script.run
                .withSuccessHandler(function(kh)
                {                
                    toast('Đã xác minh thông tin Khách hàng', 1500);
                    APP.features.chuNha.quanLyKhachHang.update.xacMinh.hide();
                })
                .withFailureHandler(function(loi)
                {
                    alert('Có lỗi khi cập nhật Khách hàng:\n' + loi.message);
                })
                .sv_capNhatKhachHang_xacMinh_xoaDong(idKhachHang, APP.user.token);
            
        },
        notOk: function(idKhachHang) 
        {
            toast('Đang từ chối duyệt..');
            google.script.run
                .withSuccessHandler(function(kh)
                {                
                    toast('Đã Từ chối thông tin Khách hàng', 1500);
                    const idPhieu = APP.cache.danhSachKhachHang_xacMinh.data.findIndex(
                        khach => String(khach.idKhachHang) === String(idKhachHang)
                    );

                    if (idPhieu !== -1) 
                    {
                        APP.cache.danhSachKhachHang_xacMinh[idPhieu].xacMinh = '0';
                    }

                    APP.features.chuNha.quanLyKhachHang.list.render();

                    APP.features.chuNha.quanLyKhachHang.update.hide();
                    APP.features.chuNha.quanLyKhachHang.list.show();
                    APP.features.chuNha.quanLyKhachHang.update.xacMinh.hide();
                })
                .withFailureHandler(function(loi)
                {
                    alert('Có lỗi khi từ chối duyệt:\n' + loi.message);
                })
                .sv_capNhatKhachHang_xacMinh_notOk(idKhachHang, APP.user.token);
        }
    }
}