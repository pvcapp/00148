APP.sidebar.ui = 
{
    showing: !APP.config.mobileMode,
    show: function()
    {
        APP.sidebar.ui.showing = true;
        show('sidebar_divChe');
        show('sidebarDiv');
        
        APP.user.sidebar.ui.hide();
    },
    hide: function()
    {
        APP.sidebar.ui.showing = false;
        hide('sidebarDiv');
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