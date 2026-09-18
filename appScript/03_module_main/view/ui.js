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
    showTab: function(moduleName, type)
    {
        const allTab = document.querySelectorAll('.tab_container');
        //hide all .view_content_container
        show(viewId);
    }
};
