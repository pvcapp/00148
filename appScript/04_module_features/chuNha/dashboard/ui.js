APP.features.chuNha.dashboard = APP.features.chuNha.dashboard || {};
APP.features.chuNha.dashboard.list = APP.features.chuNha.dashboard.list || {};

APP.features.chuNha.dashboard.data =  [
    {
        caption: 'Tổng số khu nhà',
        tenBien: 'tongSoKhuNha',
        value: '0',
        subCaption: 'Tổng số khu/toà nhà quản lý',
        loaded: false
    },
    {
        caption: 'Tổng số phòng',
        tenBien: 'tongSoPhong',
        value: '0',
        subCaption: '',
        loaded: false
    },
    {
        caption: 'Số phòng đang thuê',
        tenBien: 'soPhongDangThue',
        value: '0',
        subCaption: '',
        loaded: false
    },
    {
        caption: 'Số phòng trống',
        tenBien: 'soPhongTrong',
        value: '0',
        subCaption: '',
        loaded: false
    },
    {
        caption: 'Tổng số khách',
        tenBien: 'tongSoKhach',
        value: '0',
        subCaption: 'Tổng số khách đang thuê',
        loaded: false
    }
];

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
            for (let i = 0; i < APP.features.chuNha.dashboard.data.length; i++)
            {
                for (let j = 0; j < APP.cache.serverCache.data.length; j++)
                {
                    if (APP.features.chuNha.dashboard.data[i].tenBien === APP.cache.serverCache.data[j].tenBien)
                    {
                        APP.features.chuNha.dashboard.data[i].value = APP.cache.serverCache.data[j].value;
                        APP.features.chuNha.dashboard.data[i].loaded = true;
                        break;
                    }
                }
            }
        }


        const cardContainerData = APP.features.chuNha.dashboard.data.map(function(row)
        {
            return {
                data: {
                    caption: row.caption,
                    value: row.value,
                    subCaption: row.subCaption,
                    loaded: row.loaded
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
