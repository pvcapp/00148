APP.user.menu =
{
    ui: {},
    control: {}
};


APP.user.menu.ui =
{
    render: function(parentId = '')
    {
        div({
            id: 'userMenu_divChe', 
            className: 'user__menu__divChe', 
            parentId: parentId
        });
        
        div({
            id: 'userMenu_humberger',
            html: `<img src="https://pvcapp.github.io/00148/img/user.svg" class="menu__icon-menu" style="height: 25px;cursor: pointer;">`,
            parentId: parentId
        });

        div({id: 'userMenu', className: 'user__menu', parentId: parentId});
        div({id: 'user_hoVaTen', className: 'menu__button user__menu__button', 
            html: '--', style: 'font-weight:bold; margin-top:10px;',
            parentId: 'userMenu'});
        div({id: 'userMenu_changePassword', className: 'menu__button user__menu__button', text: 'Đổi mật khẩu',
            parentId: 'userMenu'});
        div({id: 'userMenu_dangXuat', className: 'menu__button user__menu__button', text: 'Đăng xuất',
            parentId: 'userMenu'});
    },
    showing: false,
    show: function()
    {
        show('userMenu', 'flex');
        show('userMenu_divChe');
        APP.user.menu.ui.showing = true;   
        if (APP.config.mobileMode) APP.menu.ui.hide();             
    },
    hide: function()
    {
        hide('userMenu_divChe');
        hide('userMenu');
        APP.user.menu.ui.showing = false;
    },
    toggle: function()
    {
        if (APP.user.menu.ui.showing)
        {
            APP.user.menu.ui.hide();
        }
        else
        {
            APP.user.menu.ui.show();
        }
    }
};