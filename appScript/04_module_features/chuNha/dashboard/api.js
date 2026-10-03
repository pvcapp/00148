APP.features.chuNha.dashboard = APP.features.chuNha.dashboard || {};
APP.features.chuNha.dashboard.list = APP.features.chuNha.dashboard.list || {};
APP.features.chuNha.dashboard.list.api =
{
	get: function()
	{
		return new Promise(function(resolve, reject)
		{
			google.script.run
				.withSuccessHandler(resolve)
				.withFailureHandler(reject)
				.sv_chuNha_getDashboardData(APP.user.token);
		});
	},
	update: function(rows)
	{
		return new Promise(function(resolve, reject)
		{
			google.script.run
				.withSuccessHandler(resolve)
				.withFailureHandler(reject)
				.sv_chuNha_updateDashboardData(rows, APP.user.token);
		});
	}
};
