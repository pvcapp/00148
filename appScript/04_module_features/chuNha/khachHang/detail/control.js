APP.features.chuNha.quanLyKhachHang.detail.control =
{
    idKhachHang: '',
    init: function()
    {
        APP.features.chuNha.quanLyKhachHang.ui.detail.xacMinh.init();
    },
    xacMinh:
    {
        show: function (idKhachHang)
        {
            console.log('control detail.xacminh.show. idKhachHang: ' + idKhachHang);
            APP.features.chuNha.quanLyKhachHang.control.detail.idKhachHang = idKhachHang;
            APP.features.chuNha.quanLyKhachHang.ui.detail.xacMinh.render();
            show('formKhachHang_xacMinhThongTin_popup');
        },
        hide: function ()
        {
            hide('formKhachHang_xacMinhThongTin_popup');
        },
        ok: function() 
        {
            let idKhachHang = APP.features.chuNha.quanLyKhachHang.control.detail.idKhachHang;
            const khachHang = APP.cache.danhSachKhachHang_xacMinh.find(function(khach) 
            {
                return String(khach.idKhachHang) === String(idKhachHang);
            });

            APP.cache.danhSachKhachHang_xacMinh.forEach(e => {
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
            const idXoa = APP.cache.danhSachKhachHang_xacMinh.findIndex(
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
        notOk: function() 
        {
            let idKhachHang = APP.features.chuNha.quanLyKhachHang.control.detail.idKhachHang;
            toast('Đang từ chối duyệt..');
            google.script.run
                .withSuccessHandler(function(kh)
                {                
                    toast('Đã Từ chối thông tin Khách hàng', 1500);
                    const idPhieu = APP.cache.danhSachKhachHang_xacMinh.findIndex(
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
};