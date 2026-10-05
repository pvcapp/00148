APP.features.chuNha.quanLyHopDong = APP.features.chuNha.quanLyHopDong || {};
APP.features.chuNha.quanLyHopDong.list = APP.features.chuNha.quanLyHopDong.list || {};
APP.features.chuNha.quanLyHopDong.list.control =
{
    init: function()
    {
        APP.features.chuNha.quanLyHopDong.list.ui.init();
    },
    render: function()
    {
        APP.features.chuNha.quanLyHopDong.list.ui.render();
    }
};
APP.features.chuNha.quanLyHopDong.control =
{
    init: function()
    {
        APP.features.chuNha.quanLyHopDong.list.control.init();
    },
    isActive: function(hopDong)
    {
        return Boolean(hopDong) && typeof hopDongActive === 'function' && hopDongActive(hopDong);
    }
};