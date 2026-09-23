APP.view =
{
    ui: {},
    control: {}
};

APP.view.ui = 
{
    init: function()
    {
        div({
            id: 'view',
            className: 'view',
            parentId: 'main'
        });
        
        //APP.view.ui.addTab('home', 'startupScreen', 'loading', loadingBar());
        APP.view.ui.showLoading();
    },
    showLoading: function()
    {
        APP.view.ui.showTab('home', 'startupScreen', 'loading');
    },
    addTab: function(vaiTro, module, type, el, override = 0)
    {
        let id  = vaiTro + '_' + module + '_' + type + '_tab';
        if ($('#' + id))
        {
            console.log('APP.view.ui.addTab: tab id: ' + id + ' đã tồn tại. Chế dộ ghi đè: ' + override);            
            if (override == 0) return;
            var existingTab = $('#' + id);
            existingTab.innerHTML = '';
            existingTab.appendChild(el);
            return;
        }

        const tab = document.createElement('div');
        tab.className = 'view__tab';
        tab.classList.add('hide');
        tab.id = id;
        tab.appendChild(el);
        $('#view').appendChild(tab);
    },
    addElementToTab: function(vaiTro, module, type, el)
    {
        let id  = vaiTro + '_' + module + '_' + type + '_tab';
        if ($('#' + id))
        {
            $('#' + id).appendChild(el);
        }
        else
        {
            APP.view.ui.addTab(vaiTro, module, type, el);
        }
    },
    hasTab: function(vaiTro, module, type)
    {
        const id = vaiTro + '_' + module + '_' + type + '_tab';
        return document.getElementById(id) !== null;
    },
    showTab: function(vaiTro, module, type)
    {
        const tabId = vaiTro + '_' + module + '_' + type + '_tab';
        const tabs = document.querySelectorAll('#view > .view__tab');

        tabs.forEach(function(tab)
        {
            tab.style.display = 'none';
        });

        const tab = $('#' + tabId);
        if (!tab)
        {
            console.log('APP.view.ui: Màn hình này chưa có hoặc chưa sẵn sàng: ' + tabId);
            toast('APP.view.ui: Màn hình này chưa có hoặc chưa sẵn sàng');
            return;
        }
        tab.style.display = '';
        tab.classList.remove('hide');
    },
    clear: function()
    {
        $('#view').innerHTML = '';
    }
};
