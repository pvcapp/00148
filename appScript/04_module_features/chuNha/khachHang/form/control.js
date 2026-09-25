APP.features.chuNha.quanLyKhachHang.form.control =
{    
    init: function()
    {
        APP.features.chuNha.quanLyKhachHang.form.ui.init();
    },
    showAddNew: function()
    {
        APP.features.chuNha.quanLyKhachHang.form.mode = 'new';
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

        APP.features.chuNha.quanLyKhachHang.form.thongTinChiTiet.ui.render();
        APP.features.chuNha.quanLyKhachHang.form.thongTinChiTiet.ui.show();    
    },
    abort: function()
    {
        APP.features.chuNha.quanLyKhachHang.form.thongTinChiTiet.control.reset();
        APP.view.ui.showTab('chuNha', 'quanLyKhachHang', 'form_thongTinChiTiet');
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

        
    },
    abort: function()
    {
        APP.features.chuNha.quanLyKhachHang.form.thongTinChiTiet.control.reset();
        APP.view.ui.showTab('chuNha', 'quanLyKhachHang', 'list');
    }
};