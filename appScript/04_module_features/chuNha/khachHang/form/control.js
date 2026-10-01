APP.features.chuNha.quanLyKhachHang.form.control =
{    
    init: function()
    {
        APP.features.chuNha.quanLyKhachHang.form.ui.init();
    },
    showAddNew: function()
    {
        APP.features.chuNha.quanLyKhachHang.form.ui.render('addNew', '');
        APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan.ui.show();
    },
    showAddNew_detail: function()
    {
        APP.features.chuNha.quanLyKhachHang.form.thongTinChiTiet.ui.show();
    },
    getData: function()
    {
        return {
            idKhachHang: APP.features.chuNha.quanLyKhachHang.form.idKhachHang,
            hoVaTen: $('#formKhachHang_input_hoVaTen').value,
            soCCCD: $('#formKhachHang_input_soCCCD').value,
            dienThoai: $('#formKhachHang_input_dienThoai').value,
            gioiTinh: $('#formKhachHang_input_gioiTinh').value,
            ngaySinh: $('#formKhachHang_input_ngaySinh').value,
            thangSinh: $('#formKhachHang_input_thangSinh').value,
            namSinh: $('#formKhachHang_input_namSinh').value,
            email: $('#formKhachHang_input_email').value,
            diaChiThuongTru: $('#formKhachHang_input_diaChiThuongTru').value,
            ngheNghiep: $('#formKhachHang_input_ngheNghiep').value,
            anhKhach: $('#formKhachHang_input_anhKhach').value,
            anhCCCDMatTruoc: $('#formKhachHang_input_anhCCCDMatTruoc').value,
            anhCCCDMatSau: $('#formKhachHang_input_anhCCCDMatSau').value,
            ghiChu: $('#formKhachHang_input_ghiChu').value,
            xacMinh: $('#formKhachHang_input_xacMinh').value,
            active: $('#formKhachHang_input_active').value
        };
    },
    checkData: function()
    {
        duLieu = APP.features.chuNha.quanLyKhachHang.form.control.getData();
        if (!duLieu.hoVaTen) {
            toast('Vui lòng nhập họ và tên');
            return false;
        }

        if (!/^\d{12}$/.test(duLieu.soCCCD)) {
            toast('Số CCCD phải gồm đúng 12 chữ số');
            return false;
        }

        if (
            duLieu.dienThoai &&
            !/^(0|\+84)\d{9}$/.test(duLieu.dienThoai)
        ) {
            toast('Số điện thoại không hợp lệ');
            return false;
        }

        if (
            duLieu.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(duLieu.email)
        ) {
            toast('Email không hợp lệ');
            return false;
        }

        return true;
    },
    reset: function()
    {        
        APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan.control.reset();
        APP.features.chuNha.quanLyKhachHang.form.thongTinChiTiet.control.reset();
    },
    submit: async function()
    {
        APP.features.chuNha.quanLyKhachHang.form.thongTinChiTiet.control.submit();
    }
};


APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan.control =
{
    init: function()
    {
        APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan.ui.init();
        APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan.control.bindEvent();
    },
    bindEvent: function()
    {
        $('#formKhachHang_input_dienThoai').addEventListener('keyup', function()
        {
            APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan.control.kiemTraTonTai('dienThoai');
        });

        $('#formKhachHang_input_soCCCD').addEventListener('keyup', function()
        {
            APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan.control.kiemTraTonTai('cccd');
        });
    },
    reset: function()
    {
        resetForm('chuNha_quanLyKhachHang_form_thongTinCoBan_tab');
    },
    kiemTraTonTai: async function(field)
    {
        if (field == 'cccd')
        {
            const cccd = $('#formKhachHang_input_soCCCD').value;
            if (cccd.length == 12)
            {
                let kh = APP.cache.danhSachKhachHang.data.find(kh =>
                {  
                    return kh.soCCCD == cccd;
                });

                if (kh) 
                {
                    await canhBao('CCCD đã tồn tại', 'Thêm khách hàng');
                    return false;
                }
            }
        }

        if (field == 'cccd')
        {
            const dienThoai = $('#formKhachHang_input_dienThoai').value;
            if (dienThoai.length == 10)
            {
                let kh = APP.cache.danhSachKhachHang.data.find(kh =>
                {  
                    return kh.dienThoai == dienThoai;
                });

                if (kh)
                {
                    await canhBao('Điện thoại đã tồn tại', 'Thêm khách hàng');
                    return false;
                }
            }
        }
    },
    dataInputOk: async function()
    {
        const hoVaTen = $('#formKhachHang_input_hoVaTen').value;
        const dienThoai = $('#formKhachHang_input_dienThoai').value;
        const cccd = $('#formKhachHang_input_soCCCD').value;
        
        if (hoVaTen == '' || dienThoai == '' || cccd == '')
        {
            let tb = await canhBao('Vui lòng nhập đầy đủ thông tin', 'Thêm khách hàng');
            return false;
        }
        else if (dienThoai.length !== 10)
        {
            let tb = await canhBao('Vui lòng kiểm tra số điện thoại', 'Thêm khách hàng');
            return false;
        }
        else if (cccd.length !== 12)
        {
            let tb = await canhBao('Vui lòng kiểm tra số CCCD', 'Thêm khách hàng');
            return false;
        }

        return true;
    },
    submit: async function()
    {
        const checkInput = await APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan.control.dataInputOk();
        if (!checkInput)
        {
            return;
        }
        $('#formKhachHang_input_hoVaTen_text').innerText = $('#formKhachHang_input_hoVaTen').value;
        $('#formKhachHang_input_dienThoai_text').innerText = $('#formKhachHang_input_dienThoai').value;
        $('#formKhachHang_input_soCCCD_text').innerText = $('#formKhachHang_input_soCCCD').value;
        
        APP.features.chuNha.quanLyKhachHang.form.thongTinChiTiet.ui.show();
    },
    abort: function()
    {
        APP.features.chuNha.quanLyKhachHang.form.thongTinChiTiet.control.reset();
        APP.view.ui.showTab('chuNha', 'quanLyKhachHang', 'list');
    }
};






APP.features.chuNha.quanLyKhachHang.form.thongTinChiTiet.control =
{
    init: function()
    {
        APP.features.chuNha.quanLyKhachHang.form.thongTinChiTiet.ui.init();
        APP.features.chuNha.quanLyKhachHang.form.thongTinChiTiet.control.bindEvent();
    },
    bindEvent: function()
    {
        /*
        $('#formKhachHang_input_dienThoai').addEventListener('keyup', function()
        {
            APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan.control.kiemTraTonTai('dienThoai');
        });

        $('#formKhachHang_input_soCCCD').addEventListener('keyup', function()
        {
            APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan.control.kiemTraTonTai('cccd');
        });*/
    },
    reset: function()
    {
        resetForm('chuNha_quanLyKhachHang_form_thongTinChiTiet_tab');
        $('#formKhachHang_input_hoVaTen_text').innerText = '';
        $('#formKhachHang_input_dienThoai_text').innerText = '';
        $('#formKhachHang_input_soCCCD_text').innerText = '';
    },
    kiemTraTonTai: async function(field)
    {
        /*
        if (field == 'cccd')
        {
            const cccd = $('#formKhachHang_input_soCCCD').value;
            if (cccd.length == 12)
            {
                let kh = APP.cache.danhSachKhachHang.data.find(kh =>
                {  
                    return kh.soCCCD == cccd;
                });

                if (kh) 
                {
                    await canhBao('CCCD đã tồn tại', 'Thêm khách hàng');
                    return false;
                }
            }
        }

        if (field == 'cccd')
        {
            const dienThoai = $('#formKhachHang_input_dienThoai').value;
            if (dienThoai.length == 10)
            {
                let kh = APP.cache.danhSachKhachHang.data.find(kh =>
                {  
                    return kh.dienThoai == dienThoai;
                });

                if (kh)
                {
                    await canhBao('Điện thoại đã tồn tại', 'Thêm khách hàng');
                    return false;
                }
            }
        }*/
    },
    dataInputOk: async function()
    {
        const hoVaTen = $('#formKhachHang_input_hoVaTen').value;
        const dienThoai = $('#formKhachHang_input_dienThoai').value;
        const cccd = $('#formKhachHang_input_soCCCD').value;
        
        if (hoVaTen == '' || dienThoai == '' || cccd == '')
        {
            let tb = await canhBao('Vui lòng nhập đầy đủ thông tin', 'Thêm khách hàng');
            return false;
        }
        else if (dienThoai.length !== 10)
        {
            let tb = await canhBao('Vui lòng kiểm tra số điện thoại', 'Thêm khách hàng');
            return false;
        }
        else if (cccd.length !== 12)
        {
            let tb = await canhBao('Vui lòng kiểm tra số CCCD', 'Thêm khách hàng');
            return false;
        }

        return true;
    },
    submit: async function()
    {
        if (!APP.features.chuNha.quanLyKhachHang.form.thongTinChiTiet.control.dataInputOk())
        {
            return;
        }

        if (APP.features.chuNha.quanLyKhachHang.form.mode == 'addNew')
        {
            try
            {
                inactiveButton('chuNha_khachHang_saveButton');
                $('#chuNha_khachHang_saveButton').innerText = 'Đang thêm..';
                toast('Đang thêm khách hàng..');

                const khachHangMoi = await APP.features.chuNha.quanLyKhachHang.form.api.create();

                activeButton('chuNha_khachHang_saveButton');
                $('#chuNha_khachHang_saveButton').innerText = 'Thêm khách hàng';
                if (khachHangMoi && khachHangMoi.thanhCong) 
                {
                    toast('Thêm khách hàng thành công: ' + khachHangMoi.data.hoVaTen);
                    APP.cache.danhSachKhachHang.data.push(khachHangMoi.data);
                    APP.cache.tongQuan = khachHangMoi.cache;
                    APP.features.chuNha.dashboard.ui.render();
                    APP.features.chuNha.quanLyKhachHang.form.thongTinChiTiet.control.reset();
                    APP.features.chuNha.quanLyKhachHang.list.ui.render();
                    APP.view.ui.showTab('chuNha', 'quanLyKhachHang', 'list');
                    return;
                }           
            }
            catch (error)
            {
                console.error(error);
                canhBao('Không thể thêm khách hàng', 'Lỗi');
            }            
        }
        else
        {
            const data = APP.features.chuNha.quanLyKhachHang.form.control.getData();
            //console.log(JSON.stringify(data));
            if (!data.idKhachHang)
            {
                canhBao('Không thấy id Khách hàng cần cập nhật', 'Lỗi kỹ thuật');
                return;
            }

            if (!APP.features.chuNha.quanLyKhachHang.form.control.checkData()) return;
            inactiveButton('chuNha_khachHang_updateButton');
            $('#chuNha_khachHang_updateButton').innerText = 'Đang lưu..';
            toast('Đang cập nhật thông tin..');

            try
            {
                let kh = await APP.features.chuNha.quanLyKhachHang.form.api.update(data);
                activeButton('chuNha_khachHang_updateButton');
                $('#chuNha_khachHang_updateButton').innerText = 'Lưu thay đổi';
                const viTri = (APP.cache.danhSachKhachHang.data || []).findIndex(function(khach)
                {
                    return String(khach.idKhachHang) === String(APP.features.chuNha.quanLyKhachHang.form.idKhachHang);
                });

                if (viTri !== -1)
                {
                    APP.cache.danhSachKhachHang.data[viTri] = kh;
                }
                
                APP.features.chuNha.quanLyKhachHang.list.ui.render();
                APP.features.chuNha.quanLyKhachHang.list.ui.show();
                capNhatTongQuanTuCache();
                toast('Đã cập nhật Khách hàng', 1500);
            }
            catch (error)
            {
                console.error(error);
                canhBao('Không thể cập nhật khách hàng', 'Lỗi');
            }            
        }
    },
    abort: function()
    {
        APP.features.chuNha.quanLyKhachHang.form.thongTinChiTiet.control.reset();
        if (APP.features.chuNha.quanLyKhachHang.form.mode == 'addNew')
        {
            APP.view.ui.showTab('chuNha', 'quanLyKhachHang', 'list');
        }
        else
        {
            APP.view.ui.showTab('chuNha', 'quanLyKhachHang', 'form_thongTinCoBan');
        }
    }
};