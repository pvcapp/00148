APP.sidebar.ui = 
{
    render: function()
    {
        div({
            id: 'main',
            className: 'main',
            parent: document.body
        });

        div({
            id: 'sidebar_hamburger', 
            className: 'sidebar__hamburger', 
            parentId: 'header'
        });        
        
        div({
            id: 'sidebar_divChe',
            className: 'sidebar__divChe',
            parent: document.body,
            onclick: el => {
                APP.ui.sidebar.hide();
            }
        });

        div({
            id: 'sidebar', 
            className: 'sidebar', 
            parentId: 'main'
        });

        div({
            id: 'sidebarGrid', 
            className: 'sidebar__grid', 
            parentId: 'sidebar'
        });
    },
    showing: !APP.config.mobileMode,
    show: function()
    {
        APP.sidebar.ui.showing = true;
        show('sidebar_divChe');
        show('sidebar');
        
        APP.user.menu.ui.hide();
    },
    hide: function()
    {
        APP.sidebar.ui.showing = false;
        hide('sidebar');
        hide('sidebar_divChe');
    },
    hideIfMobile: function()
    {
        if (APP.config.mobileMode) 
        {
            APP.sidebar.ui.hide();
        }
    },
    toggle: function()
    {            
        APP.config.mobileMode = true;
        if (APP.sidebar.ui.showing)
        {          
            APP.sidebar.ui.hide();
        }
        else
        {
            APP.sidebar.ui.show();
        }
    },
    setSelectedButton(button)
    {
        document
            .querySelectorAll('#sidebarGrid .sidebar__button')
            .forEach(function(bt)
            {
                bt.classList.remove('sidebar__button__selected');
            });

        button.classList.add('sidebar__button__selected');
    },
    clear: function()
    {
        hide('buttonChoThuePhong');
        $('#sidebarGrid').innerHTML = '';
    }
};