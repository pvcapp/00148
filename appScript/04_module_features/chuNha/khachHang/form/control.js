APP.features.chuNha.quanLyKhachHang.form.control =
{    
    init: function()
    {
        APP.features.chuNha.quanLyKhachHang.form.ui.init();
    },
    showAddNew: function()
    {
        APP.features.chuNha.quanLyKhachHang.form.mode = 'addNew';
        APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan.ui.show();
    },
    showAddNew_detail: function()
    {
        APP.features.chuNha.quanLyKhachHang.form.thongTinChiTiet.ui.show();
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
        resetForm('chuNha_quanLyKhachHang_form_thongTinChiTiet_tab');
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
        if (!APP.features.chuNha.quanLyKhachHang.form.thongTinCoBan.control.dataInputOk())
        {
            return;
        }
        const idKhachHang = APP.features.chuNha.quanLyKhachHang.form.idKhachHang;
        APP.features.chuNha.quanLyKhachHang.form.thongTinChiTiet.ui.render(idKhachHang);
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
        //render
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
    loadData: function(idKhachHang)
    {
        const kh = APP.cache.danhSachKhachHang.data.find(
            khach => khach.idKhachHang == idKhachHang
        );

        if (!kh)
        {
            console.log('Load data: Không tìm thấy khách hàng có ID "' + idKhachHang + '"');
            return false;
        }        

        $('#formKhachHang_input_gioiTinh').value = kh.gioiTinh ?? '';
        $('#formKhachHang_input_email').value = kh.email ?? '';
        $('#formKhachHang_input_diaChiThuongTru').value = kh.diaChiThuongTru ?? '';
        $('#formKhachHang_input_ngheNghiep').value = kh.ngheNghiep ?? '';

        $('#formKhachHang_input_ghiChu').value = kh.ghiChu ?? '';
        $('#formKhachHang_input_xacMinh').value = kh.xacMinh ?? '';
        $('#formKhachHang_input_active').value = kh.active ?? '';

        // ảnh xử lý riêng nếu cần

        return true;
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
                const result = await APP.features.chuNha.quanLyKhachHang.form.api.create();

                // xử lý sau khi thêm thành công
                console.log(result);                
            }
            catch (error)
            {
                console.error(error);
                canhBao('Không thể thêm khách hàng', 'Lỗi');
            }            
        }
        else
        {
            try
            {
                const result = await APP.features.chuNha.quanLyKhachHang.form.api.update();

                // xử lý sau khi thêm thành công
                console.log(result);
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