APP.features.chuNha.quanLyKhachHang.detail.control =
{
    idKhachHang: '',
    init: function()
    {
        APP.features.chuNha.quanLyKhachHang.detail.ui.init();
        
    }
};


APP.features.chuNha.quanLyKhachHang.detail.xacMinh.control =
{
    show: function (idKhachHang)
    {
        APP.features.chuNha.quanLyKhachHang.detail.idKhachHang = idKhachHang;
        APP.features.chuNha.quanLyKhachHang.detail.xacMinh.ui.render();
        show('formKhachHang_xacMinhThongTin_popup');
    },
    hide: function ()
    {
        hide('formKhachHang_xacMinhThongTin_popup');
    },
    ok: async function() 
    {
        let idKhachHang = APP.features.chuNha.quanLyKhachHang.control.detail.idKhachHang;
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
        try
        {
            await APP.features.chuNha.quanLyKhachHang.detail.api.xacMinh.xoaPhieu(idKhachHang);
            toast('Đã xác minh thông tin Khách hàng', 1500);
            APP.features.chuNha.quanLyKhachHang.detail.xacMinh.ui.hide();
        }
        catch (er)
        {
            canhBao('Có lỗi khi cập nhật Khách hàng:\n' + er.message);
        }
    },
    notOk: async function() 
    {
        let idKhachHang = APP.features.chuNha.quanLyKhachHang.control.detail.idKhachHang;
        toast('Đang từ chối duyệt..');
                
        try
        {
            await APP.features.chuNha.quanLyKhachHang.api.update.xacMinhNotOk(idKhachHang);
            toast('Đã Từ chối thông tin Khách hàng', 1500);
            // Cập nhật cache
            const index = APP.cache.danhSachKhachHang_xacMinh.data.findIndex(
                    khach => String(khach.idKhachHang) === String(idKhachHang)
            );

            if (index !== -1)
            {
                APP.cache.danhSachKhachHang_xacMinh.data[index].xacMinh = '0';
            }

            // Cập nhật danh sách
            APP.features.chuNha.quanLyKhachHang.list.ui.render();
            APP.features.chuNha.quanLyKhachHang.list.ui.show();
            APP.features.chuNha.quanLyKhachHang.detail.xacMinh.ui.hide();            
        }
        catch (loi)
        {
            canhBao('Có lỗi khi từ chối duyệt:\n' + loi.message, 'Duyệt thông tin');
        };
    }
};