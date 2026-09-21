//Toàn bộ app phụ thuộc core
const APP = 
{
    config: {},
    ui: {},
    control: {},

    state: {
        moduleHienTai:
        {
            vaiTro: 'no',
            module: 'home',
            type: 'list'
        }
    },
    cache: {},
    data: {}, //meta data column raw + virtual column (meta data cho render view). module1Name: {}, module2Name: {}
    api: {},
    
    //Các module chính trong layout:
    user: {},  //Quản lý hồ sơ và phiên
    header: {},
    actionbar: {},
    sidebar: {}, //Chứa sidebar đẩy từ module tới
    view: {}, //Chứa nôi dung đẩy từ module tới
    footer: {},


    //Các module/nhóm module (trong trường hợp SPA buộc phải gói nhiều vai trò trong 1 trang) ghép vào:
    features: {}
};