APP.features.chuNha.dashboard = APP.features.chuNha.dashboard || {};
APP.features.chuNha.dashboard.list = APP.features.chuNha.dashboard.list || {};

APP.features.chuNha.dashboard.data =  
{
    tongSoKhuNha: {
        caption: 'Tổng số khu nhà',
        value: '0',
        subCaption: 'Tổng số khu/toà nhà quản lý',
        loaded: false
    },
    tongSoPhong: {
        caption: 'Tổng số phòng',
        value: '0',
        subCaption: '',
        loaded: false
    },
    soPhongDangThue: {
        caption: 'Số phòng đang thuê',
        value: '0',
        subCaption: '',
        loaded: false
    },
    soPhongTrong: {
        caption: 'Số phòng trống',
        value: '0',
        subCaption: '',
        loaded: false
    },
    tongSoKhach: {
        caption: 'Tổng số khách',
        value: '0',
        subCaption: 'Tổng số khách đang thuê',
        loaded: false
    }
};

/* 
APP.cache.serverCache = {
        schema: [
            { name: 'id', type: 'text' },
            { name: 'hoVaTen', type: 'text' },
            { name: 'tuoi', type: 'number' }
        ],
        data: [

        {
            caption: 'Tổng số khu nhà',
            tenBien: 'tongSoKhuNha',
            value: '0',
            subCaption: 'Tổng số khu/toà nhà quản lý'
        }, ..... (không chỉ bao gồm dashboard cache)
    }
*/
APP.features.chuNha.dashboard.list.ui =
{
    init: function()
    {
        this.render();
    },
    render: function()
    {
        APP.view.ui.removeTab('chuNha', 'dashboard', 'list');
        if (!APP.cache.serverCache || Object.keys(APP.cache.serverCache).length === 0) {}
        else
        {
            Object.entries(APP.features.chuNha.dashboard.data).forEach(function([tenBien, item]) 
            {
                for (let j = 0; j < APP.cache.serverCache.data.length; j++)
                {
                    if (tenBien === APP.cache.serverCache.data[j].tenBien)
                    {
                        item.value = APP.cache.serverCache.data[j].value;
                        item.loaded = true;
                        break;
                    }
                }
            });
        }

        const cardContainerData = Object.values(APP.features.chuNha.dashboard.data).map(function(item)
        {
            return {
                data: {
                    caption: item.caption,
                    value: item.value,
                    subCaption: item.subCaption,
                    loaded: item.loaded
                },
                type: 'numberCard_02'
            };
        });
        APP.view.ui.addTab('chuNha', 'dashboard', 'list', card_container(cardContainerData));
        activeButton('sidebar_chuNha_dashboard');
    },
    show: function()
    {
        APP.view.ui.showTab('chuNha', 'dashboard', 'list');
    }
};
