APP.header.control =
{
    init: function()
    {
        div({
            id: 'header', 
            className: 'header',
            parent: document.body
        });

        $('#header').innerHTML = `<span class="hide-on-mobile">Phòng cho thuê</span>`;
    }
};