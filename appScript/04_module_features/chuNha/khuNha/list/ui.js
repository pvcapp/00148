APP.features.chuNha.quanLyKhuNha.list.ui = 
{
    init: function()
    {
        const tabHeader = document.createElement('div');
        tabHeader.className = 'tab__header';
        tabHeader.innerHTML = `
            <div style="display: flex; flex-wrap: nowrap;">
                <div class="card__caption">
                    Danh sách khu/tòa nhà
                </div>
            </div>

            <div class="sidebar__button" style="width: 160px;" onclick="APP.features.chuNha.quanLyKhuNha.form.control.show('addNew')">
                ${new PVCImage("https://pvcapp.github.io/00148/img/new.svg", 'auto', '16px', 'margin-right:6px;').render()}
                Khu nhà mới
            </div>`;
            APP.view.ui.addTab('chuNha', 'quanLyKhuNha', 'list', tabHeader);

            const tab_main = document.createElement('div');
            tab_main.id = 'chuNha_quanLyKhuNha_list_main';
            tab_main.className = 'tab__main';
            tab_main.appendChild(loadingBar());
            APP.view.ui.addElementToTab('chuNha', 'quanLyKhuNha', 'list', tab_main);            
    },
    render: function()
    {
        $('#chuNha_quanLyKhuNha_list_main').innerHTML = `
            <table class="${APP.features.chuNha.quanLyKhuNha.list.tableStyle}" id="chuNha_danhSachKhuNha_table">
                <thead class="${APP.features.chuNha.quanLyKhuNha.list.tableStyle}__header">
                    <tr>
                        <th>STT</th>
                        <th>Tên khu nhà</th>
                        <th>Địa chỉ</th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>`;
        

        let dataHtml = '';
        let trangThaiArray = {'dangHoatDong': 'Hoạt động', 'tamDung': 'Ngừng hoạt động'};
        let stt =0;
        const danhSachKhuNha = APP.cache.danhSachKhuNha && Array.isArray(APP.cache.danhSachKhuNha.data)
            ? APP.cache.danhSachKhuNha.data
            : [];
        for (let i =0; i< danhSachKhuNha.length; i++)
        {            
            let dong = danhSachKhuNha[i];
            if (dong.active == '1')
            {
                stt++;
                dataHtml += `
                    <tr class="${APP.features.chuNha.quanLyKhuNha.list.tableStyle}__row"
                        onclick="APP.features.chuNha.quanLyKhuNha.form.control.show('edit', '${escapeHtml(dong.idKhuNha)}')">
                        <td>${stt}</td>
                        <td>${escapeHtml(dong.tenKhuNha || '')}</td>
                        <td>${escapeHtml(dong.diaChi || '')}</td>
                        <td>${escapeHtml(trangThaiArray[dong.trangThai] || '')}</td>
                        <td>
                            <div class="deleteButton imageButton"
                                onclick="event.stopPropagation(); APP.features.chuNha.quanLyKhuNha.form.control.delete('${escapeHtml(dong.idKhuNha)}', '${escapeHtml(dong.tenKhuNha || '')}');">
                                ${new PVCImage("https://pvcapp.github.io/00148/img/recycle.svg", 'auto', '16px', 'margin-right:6px;', '0.6').render()}
                            </div>
                        </td>
                    </tr>
                `;
            }
        }

        const tbody = document.querySelector('#chuNha_danhSachKhuNha_table tbody');
        tbody.innerHTML = dataHtml;
    },
    show: function()
    {
        APP.view.ui.showTab('chuNha', 'quanLyKhuNha', 'list');
    }
};