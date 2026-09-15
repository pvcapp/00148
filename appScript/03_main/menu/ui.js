APP.menu.ui = 
{
    showing: !APP.config.mobileMode,
    show: function()
    {
        APP.menu.ui.showing = true;
        show('menu_divChe');
        show('menuDiv');
        
        APP.user.ui.menu.hide();
    },
    hide: function()
    {
        APP.menu.ui.showing = false;
        hide('menuDiv');
        hide('menu_divChe');
    },
    hideIfMobile: function()
    {
        if (APP.config.mobileMode) 
        {
            APP.menu.ui.hide();
        }
    },
    toggle: function()
    {            
        APP.config.mobileMode = true;
        if (APP.menu.ui.showing)
        {          
            APP.menu.ui.hide();
        }
        else
        {
            APP.menu.ui.show();
        }
    },
    setSelectedButton(button)
    {
        document
            .querySelectorAll('#menuGrid .menu__button')
            .forEach(function(bt)
            {
                bt.classList.remove('menu__button__selected');
            });

        button.classList.add('menu__button__selected');
    },
    clear: function()
    {
        hide('buttonChoThuePhong');
        $('#menuGrid').innerHTML = '';
    }
};