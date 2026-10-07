APP.features.chuNha.quanLyHopDong.api =
{
	create: function(data)
	{
		return new Promise((resolve, reject) =>
		{
			google.script.run
				.withSuccessHandler(resolve)
				.withFailureHandler(reject)
				.sv_themHopDong(data, APP.user.token);
		});
	}
};
