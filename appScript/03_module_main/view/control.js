APP.view.control = 
{
    init: function()
    {
        APP.view.ui.init();
    },
    renderTab: function(moduleName, type = '', header  = {caption : '', actionbar : null})
    {
        if (type =='') type = 'table';
        const tab = document.createElement('div');
        tab.id = moduleName + '_' + type + '_tab_container';
        tab.className = 'tab_container';
            //render header: caption + actionbar
            //render content: table/form/.... 
            let tab_HeaderId = moduleName + '_' + type + '_tab_header';
            div({
                id: tab_HeaderId, 
                className: 'view__header',
                parent: tab
            });

                div({
                    id: moduleName + '_' + type + '_tab_header_caption', 
                    className: 'view__header__caption',
                    text: header.caption,
                    parentId: tab_HeaderId
                });

                if (header.actionbar)
                {
                    div({
                        id: moduleName + '_' + type + '_tab_header_actionbar', 
                        className: 'view__header__actionbar',
                        text: 'actionbar',
                        parentId: tab_HeaderId
                    });
                }


            switch (type)
            {
                case 'table':
                    tab.appendChild(table());
                    break;
                default:
                    break;
            }
                
        $('#view').appendChild(tab);
    }
}