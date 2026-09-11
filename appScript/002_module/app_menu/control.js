APP.ui.menu = 
{        
    showing: !APP.mobileMode,
    show: function()
    {
        APP.ui.menu.showing = true;
        show('menu_divChe');
        show('menuDiv');
        
        APP.user.menu.hide();
    },
    hide: function()
    {
        APP.ui.menu.showing = false;
        hide('menuDiv');
        hide('menu_divChe');
    },
    hideIfMobile: function()
    {
        if (APP.mobileMode) 
        {
            APP.ui.menu.hide();
        }
    },
    toggle: function()
    {            
        APP.mobileMode = true;
        if (APP.ui.menu.showing)
        {          
            APP.ui.menu.hide();
        }
        else
        {
            APP.ui.menu.show();
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