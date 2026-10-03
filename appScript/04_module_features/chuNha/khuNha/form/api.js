APP.features.chuNha.quanLyKhuNha.form.api = 
{
	create: function(data)
	{
		return new Promise((resolve, reject) =>
		{
			google.script.run
				.withSuccessHandler(resolve)
				.withFailureHandler(reject)
				.sv_themKhuNha(data, APP.user.token);
		});
	},
	update: function(data)
	{
		return new Promise((resolve, reject) =>
		{
			google.script.run
				.withSuccessHandler(resolve)
				.withFailureHandler(reject)
				.sv_capNhatKhuNha(data, APP.user.token);
		});
	},
	delete: function(idKhuNha, tenKhuNha)
	{
		return new Promise((resolve, reject) =>
		{
			google.script.run
				.withSuccessHandler(resolve)
				.withFailureHandler(reject)
				.sv_xoaKhuNha(idKhuNha, tenKhuNha, APP.user.token);
		});
	}
};