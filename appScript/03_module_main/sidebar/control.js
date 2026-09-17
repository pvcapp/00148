APP.sidebar.control = 
{
    init: function()
    {
        APP.sidebar.ui.init();
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
    }
}