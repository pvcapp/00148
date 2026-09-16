//Toàn bộ app phụ thuộc core
const APP = 
{
    config: {},
    layout:
    {
        header: {},
        main:
        {
            sidebar: {},
            view: {}
        },
        footer: {}
    },
    ui: {},
    control: {},

    state: {},
    cache: {},
    api: {},
    
    //Các module chính trong layout:
    layout: {},
    user: {},  //Quản lý hồ sơ và phiên
    header: {}, 
    sidebar: {}, //Chứa sidebar đẩy từ module tới
    view: {}, //Chứa nôi dung đẩy từ module tới
    footer: {},


    //Các module/nhóm module (trong trường hợp SPA buộc phải gói nhiều vai trò trong 1 trang) ghép vào:
    chuNha: {},
    khachHang: {},

};