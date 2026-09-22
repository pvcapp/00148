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
        let id  = vaiTro + '_' + module + '_' + type + '_tab';
        if ($('#' + id))
        {
            console.log('APP.view.ui.addTab: tab id: ' + id + ' đã tồn tại. Không nên ghi đè');
            return;
        }
        const tab = document.createElement('div');
        tab.className = 'view__tab';
        tab.classList.add('hide');
        tab.id = id;
        tab.appendChild(el);
        $('#view').appendChild(tab);
        if ($('#' + id))
        {
            console.log('APP.view.ui.addTab: tab id: ' + id );
        }
        else
        {
            console.log('APP.view.ui.addTab: chưa thành công: tab id: ' + id );
        }     
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
    }
};
