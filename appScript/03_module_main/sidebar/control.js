APP.sidebar.control = 
{
    init: function()
    {
        APP.sidebar.ui.init();
    },
    setSelectedButton(buttonId)
    {
        document
            .querySelectorAll('#sidebarGrid .sidebar__button')
            .forEach(function(bt)
            {
                bt.classList.remove('sidebar__button__selected');
            });
        
        activeButton(buttonId);
        $('#' + buttonId).classList.add('sidebar__button__selected');
    }
}