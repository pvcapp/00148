APP.footer.ui =
{
    render: function()
    {
        div({
            id: 'footer', 
            className: 'footer',
            parent: document.body
        });

        div({
            id: 'footer__menuMobile', 
            className: 'footer__menuMobile',
            parentId: 'footer'
        });
    }
};
