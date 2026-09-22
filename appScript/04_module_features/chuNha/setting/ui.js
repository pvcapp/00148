APP.features.chuNha.setting = {ui: {}, control: {}, api: {}};
APP.features.chuNha.setting.ui = 
{
    list:
    {
        tableStyle: 'table_01',
        cardStyle: 'detailCard_01',
        init: function()
        {
            const tabHeader = document.createElement('div');
            tabHeader.className = 'tab__header';
            tabHeader.innerHTML = `<span class="card__caption">Đơn giá chi phí</span>`;
            APP.view.ui.addTab('chuNha', 'setting', 'list', tabHeader);    

            const tab_main = document.createElement('div');
            tab_main.id = 'chuNha_setting_list_main';
            tab_main.className = 'tab__main';
            tab_main.appendChild(loadingBar());
            APP.view.ui.addElementToTab('chuNha', 'setting', 'list', tab_main);     
        },
        render: function()
        {            
            const card_container_data = APP.cache.setting.data.map(item => ({
                data: 
                {
                    caption: item.tenCauHinh,
                    subCaption: item.moTa,
                    value: item.giaTri
                },
                type: 'numberCard_01'
            }));
            const settingHTML = card_container(card_container_data);
            APP.view.ui.addTab('chuaNha', 'setting', 'list', settingHTML);
        }
    },
    detail: 
    {

    },
    form: 
    {
        
    }
};