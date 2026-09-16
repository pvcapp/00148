APP.view.ui = 
{
    render: function()
    {
        div({
            id: 'view',
            className: 'view',
            parentId: 'main'
        });

        div({
            id: 'view__actionbar', 
            className: 'view__actionbar',
            parentId: 'view'
        });

        div({
            id: 'view__content', 
            className: 'view__content',
            parentId: 'view'
        });
    }
};
