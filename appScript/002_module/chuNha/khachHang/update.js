
APP.ui.chuNha.quanLyKhachHang.update = 
{
    idKhachHang: '',
    loadData: function(duLieu)
    {
        $('#themMoiKhachHang_idKhachHang').value = duLieu.idKhachHang || '';
        $('#themMoiKhachHang_hoVaTen').value = duLieu.hoVaTen || '';
        $('#themMoiKhachHang_soCCCD').value = duLieu.soCCCD || '';

        $('#themMoiKhachHang_ngaySinh').value = duLieu.ngaySinh || '';
        $('#themMoiKhachHang_thangSinh').value = duLieu.thangSinh || '';
        $('#themMoiKhachHang_namSinh').value = duLieu.namSinh || '';
    
        $('#themMoiKhachHang_gioiTinh').value = duLieu.gioiTinh || '';
        $('#themMoiKhachHang_dienThoai').value = duLieu.dienThoai || '';
        $('#themMoiKhachHang_email').value = duLieu.email || '';

        $('#themMoiKhachHang_diaChiThuongTru').value = duLieu.diaChiThuongTru || '';
        $('#themMoiKhachHang_ngheNghiep').value = duLieu.ngheNghiep || '';

        $('#themMoiKhachHang_anhKhach').value = duLieu.anhKhach || '';
        $('#themMoiKhachHang_anhCCCDMatTruoc').value = duLieu.anhCCCDMatTruoc || '';
        $('#themMoiKhachHang_anhCCCDMatSau').value = duLieu.anhCCCDMatSau || '';

        $('#themMoiKhachHang_ghiChu').value = duLieu.ghiChu || '';
        $('#themMoiKhachHang_active').value = '1';
    },
    readData: function()
    {
        return {
            idKhachHang: $('#themMoiKhachHang_idKhachHang').value || '',
            hoVaTen: $('#themMoiKhachHang_hoVaTen').value || '',
            soCCCD: $('#themMoiKhachHang_soCCCD').value || '',

            ngaySinh: $('#themMoiKhachHang_ngaySinh').value || '',
            thangSinh: $('#themMoiKhachHang_thangSinh').value || '',
            namSinh: $('#themMoiKhachHang_namSinh').value || '',

            gioiTinh: $('#themMoiKhachHang_gioiTinh').value || '',
            dienThoai: $('#themMoiKhachHang_dienThoai').value || '',
            email: $('#themMoiKhachHang_email').value || '',

            diaChiThuongTru: $('#themMoiKhachHang_diaChiThuongTru').value || '',
            ngheNghiep: $('#themMoiKhachHang_ngheNghiep').value || '',

            anhKhach: $('#themMoiKhachHang_anhKhach').value || '',
            anhCCCDMatTruoc: $('#themMoiKhachHang_anhCCCDMatTruoc').value || '',
            anhCCCDMatSau: $('#themMoiKhachHang_anhCCCDMatSau').value || '',  

            ghiChu: $('#themMoiKhachHang_ghiChu').value || '',
            active: '1'
        };
    },
    show: function(idKhachHang)
    {
        const khachHang = APP.data.danhSachKhachHang.find(function(khach) 
        {
            return String(khach.idKhachHang) === String(idKhachHang);
        });

        if (!khachHang)
        {
            toast('Không tìm thấy khách hàng');
            return;
        }

        APP.ui.chuNha.quanLyKhachHang.update.loadData(khachHang);
        APP.ui.chuNha.quanLyKhachHang.update.idKhachHang = khachHang.idKhachHang;

        $('#themMoiKhachHang_caption').innerText = 'CẬP NHẬT THÔNG TIN';
        show('chuNha_khachHang_updateButton');
        show('chuNha_khachHang_update_reset');

        hide('chuNha_khachHang_saveButton');
        hide('chuNha_khachHang_addNew_reset');
    
        show('formKhachHang_deleteButton');        

        hide('tab_chuNha_khachHang_danhSach'); 
        show('themMoiKhachHang_form', 'grid');
    },
    hide: function()
    {
        show('tab_chuNha_khachHang_danhSach'); 
        hide('themMoiKhachHang_form', 'grid');
    },
    submit: async function()
    {
        const data = APP.ui.chuNha.quanLyKhachHang.update.readData();
        if (!data.idKhachHang) 
        {
            canhBao('Lỗi kỹ thuật' , 'Không thấy id Khách hàng cần cập nhật');
            return;
        }

        if (!APP.ui.chuNha.quanLyKhachHang.addNew.checkData(data)) return;

        inactiveButton('chuNha_khachHang_updateButton');
        $('#chuNha_khachHang_updateButton').innerText = 'Đang lưu..';
        toast('Đang cập nhật thông tin..');
        google.script.run
            .withSuccessHandler(function(kh)
            {
                activeButton('chuNha_khachHang_updateButton');
                $('#chuNha_khachHang_updateButton').innerText = 'Lưu thay đổi';
                const viTri = (APP.data.danhSachKhachHang || []).findIndex(function(khach)
                {
                    return String(khach.idKhachHang) === String(data.idKhachHang);
                });

                if (viTri !== -1)
                {
                    APP.data.danhSachKhachHang[viTri] = kh;
                }
                
                APP.ui.chuNha.quanLyKhachHang.danhSach.render();

                APP.ui.chuNha.quanLyKhachHang.update.hide();
                APP.ui.chuNha.quanLyKhachHang.danhSach.show();
                capNhatTongQuanTuCache();
                toast('Đã cập nhật Khách hàng', 1500);
            })
            .withFailureHandler(function(loi)
            {
                activeButton('chuNha_khachHang_updateButton');
                $('#chuNha_khachHang_updateButton').innerText = 'Lưu thay đổi';
                alert('Có lỗi khi cập nhật Khách hàng:\n' + loi.message);
            })
            .sv_capNhatKhachHang(APP.ui.chuNha.quanLyKhachHang.update.idKhachHang, data, APP.user.token);
    },
    reset: function()
    {
        APP.ui.chuNha.quanLyKhachHang.update.show(APP.ui.chuNha.quanLyKhachHang.update.idKhachHang);
    },
    abort: function()
    {
        APP.ui.chuNha.quanLyKhachHang.addNew.reset();
        APP.ui.chuNha.quanLyKhachHang.update.hide();
    },
    xacMinh:
    {
        show: function (idKhachHang)
        {
            //Load thong tin can xac minh:
            let phieuXacMinh = APP.data.danhSachKhachHang_xacMinh.find(
                function(kh)
                {
                    kh.idKhachHang == idKhachHang;
                }
            );
            console.log("PHIEU XAC MINH: " + JSON.stringify(phieuXacMinh));
            if (!phieuXacMinh) 
            {
                canhBao('show Bảng thông tin xác minhh bị lỗi: không thấy phiếu');
                return;
            } 
            
            $('#formKhachHang_xacMinhThongTin_hoVaTen').innerText = 'Họ và tên: ' + phieuXacMinh.hoVaTen      ;
            $('#formKhachHang_xacMinhThongTin_dienThoai').innerText = 'Điện thoại: ' + phieuXacMinh.dienThoai      ;
            $('#formKhachHang_xacMinhThongTin_soCCCD').innerText = 'Số CCCD: ' + phieuXacMinh.soCCCD      ;
            $('#formKhachHang_xacMinhThongTin_ngayThangNamSinh').innerText = 'Ngày sinh: ' + phieuXacMinh.ngayThangNamSinh      ;
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
            const khachHang = APP.data.danhSachKhachHang_xacMinh.find(function(khach) 
            {
                return String(khach.idKhachHang) === String(idKhachHang);
            });

            if (!khachHang)
            {
                toast('Không tìm thấy khách hàng');
                return;
            }

            APP.ui.chuNha.quanLyKhachHang.update.loadData(khachHang);
            APP.ui.chuNha.quanLyKhachHang.update.idKhachHang = khachHang.idKhachHang;

            //Cập nhật tình trạng xác minh và render lại danh sách
            const idXoa = APP.data.danhSachKhachHang_xacMinh.findIndex(
                khach => String(khach.idKhachHang) === String(idKhachHang)
            );
            if (idXoa !== -1) 
            {
                APP.data.danhSachKhachHang_xacMinh.splice(idXoa, 1);
            }

            //update thông tin khách hàng            
            APP.ui.chuNha.quanLyKhachHang.update.submit();
            //Xóa phiếu chờ xác minh
            google.script.run
                .withSuccessHandler(function(kh)
                {                
                    toast('Đã xác minh thông tin Khách hàng', 1500);
                })
                .withFailureHandler(function(loi)
                {
                    alert('Có lỗi khi cập nhật Khách hàng:\n' + loi.message);
                })
                .sv_capNhatKhachHang_xacMinh_xoaDong(idKhachHang, APP.user.token);
            
        },
        notOk: function(idKhachHang) 
        {
            google.script.run
                .withSuccessHandler(function(kh)
                {                
                    toast('Đã TỪ CHỐI thông tin Khách hàng', 1500);
                })
                .withFailureHandler(function(loi)
                {
                    alert('Có lỗi khi cập nhật Khách hàng:\n' + loi.message);
                })
                .sv_capNhatKhachHang_xacMinh_notOk(idKhachHang, APP.user.token);
        }
    }
}