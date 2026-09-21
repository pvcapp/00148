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
    },
    addTab: function(vaiTro, module, type, el)
    {
        const tab = document.createElement('div');
        tab.id  = 
        tab.className = 'view__tab';
        tab.appendChild(el);
        $('#view').appendChild(tab);
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
        if (!tab) {toast('APP.view.ui: Màn hình này chưa có hoặc chưa sẵn sàng');
            return;}
        tab.style.display = '';
    }
};
