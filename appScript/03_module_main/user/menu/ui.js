APP.user.sidebar =
{
    ui: {},
    control: {}
};


APP.user.sidebar.ui =
{
    render: function(parentId = '')
    {
        div({
            id: 'userMenu_divChe', 
            className: 'user__sidebar__divChe', 
            parentId: parentId
        });
        
        div({
            id: 'userMenu_humberger',
            html: `<img src="https://pvcapp.github.io/00148/img/user.svg" class="sidebar__icon-sidebar" style="height: 25px;cursor: pointer;">`,
            parentId: parentId
        });

        div({id: 'userMenu', className: 'user__sidebar', parentId: parentId});
        div({id: 'user_hoVaTen', className: 'sidebar__button user__sidebar__button', 
            html: '--', style: 'font-weight:bold; margin-top:10px;',
            parentId: 'userMenu'});
        div({id: 'userMenu_changePassword', className: 'sidebar__button user__sidebar__button', text: 'Đổi mật khẩu',
            parentId: 'userMenu'});
        div({id: 'userMenu_dangXuat', className: 'sidebar__button user__sidebar__button', text: 'Đăng xuất',
            parentId: 'userMenu'});
    },
    showing: false,
    show: function()
    {
        show('userMenu', 'flex');
        show('userMenu_divChe');
        APP.user.sidebar.ui.showing = true;   
        if (APP.config.mobileMode) APP.sidebar.ui.hide();             
    },
    hide: function()
    {
        hide('userMenu_divChe');
        hide('userMenu');
        APP.user.sidebar.ui.showing = false;
    },
    toggle: function()
    {
        if (APP.user.sidebar.ui.showing)
        {
            APP.user.sidebar.ui.hide();
        }
        else
        {
            APP.user.sidebar.ui.show();
        }
    }
};