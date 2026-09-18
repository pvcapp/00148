APP.data.danhSachKhachHang = {
    columnList: [
        {
            name: 'idKhachHang', caption: 'Mã khách hàng',
            type: { type: 'text', options: {} }, key: 1,
            formula: '', initialValue: null,
            show: 0, editable: 0, require: 0, search: 1
        },
        {
            name: 'hoVaTen', caption: 'Họ và tên',
            type: { type: 'text', options: {} }, key: 0,
            formula: '', initialValue: '',
            show: 1, editable: 1, require: 1, search: 1
        },
        {
            name: 'soCCCD', caption: 'Số CCCD',
            type: { type: 'text', options: {} }, key: 0,
            formula: '', initialValue: '',
            show: 1, editable: 1, require: 1, search: 1
        },
        {
            name: 'ngaySinh', caption: 'Ngày sinh',
            type: { type: 'number', options: { min: 1, max: 31 } }, key: 0,
            formula: '', initialValue: '',
            show: 1, editable: 1, require: 0, search: 0
        },
        {
            name: 'thangSinh', caption: 'Tháng sinh',
            type: { type: 'number', options: { min: 1, max: 12 } }, key: 0,
            formula: '', initialValue: '',
            show: 1, editable: 1, require: 0, search: 0
        },
        {
            name: 'namSinh', caption: 'Năm sinh',
            type: { type: 'number', options: {} }, key: 0,
            formula: '', initialValue: '',
            show: 1, editable: 1, require: 0, search: 0
        },
        {
            name: 'gioiTinh', caption: 'Giới tính',
            type: { type: 'select', options: { values: ['Nam', 'Nữ', 'Khác'] } }, key: 0,
            formula: '', initialValue: '',
            show: 1, editable: 1, require: 0, search: 1
        },
        {
            name: 'dienThoai', caption: 'Điện thoại',
            type: { type: 'tel', options: {} }, key: 0,
            formula: '', initialValue: '',
            show: 1, editable: 1, require: 0, search: 1
        },
        {
            name: 'email', caption: 'Email',
            type: { type: 'email', options: {} }, key: 0,
            formula: '', initialValue: '',
            show: 1, editable: 1, require: 0, search: 1
        },
        {
            name: 'diaChiThuongTru', caption: 'Địa chỉ thường trú',
            type: { type: 'textarea', options: {} }, key: 0,
            formula: '', initialValue: '',
            show: 1, editable: 1, require: 0, search: 1
        },
        {
            name: 'ngheNghiep', caption: 'Nghề nghiệp',
            type: { type: 'text', options: {} }, key: 0,
            formula: '', initialValue: '',
            show: 1, editable: 1, require: 0, search: 1
        },
        {
            name: 'anhKhach', caption: 'Ảnh khách hàng',
            type: { type: 'image', options: {} }, key: 0,
            formula: '', initialValue: '',
            show: 0, editable: 1, require: 0, search: 0
        },
        {
            name: 'anhCCCDMatTruoc', caption: 'Ảnh CCCD mặt trước',
            type: { type: 'image', options: {} }, key: 0,
            formula: '', initialValue: '',
            show: 0, editable: 1, require: 0, search: 0
        },
        {
            name: 'anhCCCDMatSau', caption: 'Ảnh CCCD mặt sau',
            type: { type: 'image', options: {} }, key: 0,
            formula: '', initialValue: '',
            show: 0, editable: 1, require: 0, search: 0
        },
        {
            name: 'ghiChu', caption: 'Ghi chú',
            type: { type: 'textarea', options: {} }, key: 0,
            formula: '', initialValue: '',
            show: 1, editable: 1, require: 0, search: 1
        },
        {
            name: 'active', caption: 'Đang hoạt động',
            type: { type: 'boolean', options: {} }, key: 0,
            formula: '', initialValue: '1',
            show: 0, editable: 0, require: 1, search: 0
        },
        {
            name: 'dangThue', caption: 'Trạng thái thuê',
            type: { type: 'boolean', options: {} }, key: 0,
            formula: '', initialValue: '0',
            show: 1, editable: 0, require: 0, search: 1
        }
    ],
    data: APP.cache.danhSachKhachHang
};
