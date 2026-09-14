//Toàn bộ app phụ thuộc core
const APP = 
{
    id: '00148',
    publicUrl: 'https://pvcapp.github.io/00148',
    showIcon: true,
    mobileMode: window.innerWidth <= 981,

    ui: {},
    control: {},

    state: {},
    cache: {},
    api: {},
    
    //Các module chính trong layout:
    user: {},  //Quản lý hồ sơ và phiên
    header: {}, 
    menu: {}, //Chứa menu đẩy từ module tới
    view: {}, //Chứa nôi dung đẩy từ module tới
    footer: {},


    //Các module/nhóm module (trong trường hợp SPA buộc phải gói nhiều vai trò trong 1 trang) ghép vào:
    chuNha: {},
    khachHang: {},

};