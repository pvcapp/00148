APP.features.chuNha.quanLyKhuNha = {ui: {}, control: {}, api: {}};
APP.features.chuNha.quanLyKhuNha.ui = 
{
    list:
    {
        tableStyle: 'table_01',
        cardStyle: 'detailCard_01',
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

                <div class="sidebar__button" style="width: 160px;" onclick="themMoiKhuNha_lamMoi();hide('tab_chuNha_khuNha_danhSach');show('themMoiKhuNha_form', 'grid');">
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
            $('#chuNha_quanLyKhuNha_list_main').innerHTML = 
            `<div class="card">
                <table class="${APP.features.chuNha.quanLyKhuNha.ui.list.tableStyle}" id="chuNha_danhSachKhuNha_table">
                    <thead class="${APP.features.chuNha.quanLyKhuNha.ui.list.tableStyle}_header">
                        <tr>
                            <th>STT</th>
                            <th>Tên khu nhà</th>
                            <th>Địa chỉ</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>`;
            

            let dataHtml = '';
            let trangThaiArray = {'dangHoatDong': 'Hoạt động', 'tamDung': 'Ngừng hoạt động'};
            let stt =0;
            for (let i =0; i< APP.cache.danhSachKhuNha.data.length; i++)
            {            
                let dong = APP.cache.danhSachKhuNha.data[i];
                if (dong.active == '1')
                {
                    stt++;
                    dataHtml += `
                        <tr class="${APP.features.chuNha.quanLyKhuNha.ui.list.tableStyle}__row"
                            onclick="khuNha_edit('${escapeHtml(dong.idKhuNha)}')">
                            <td>${stt}</td>
                            <td>${escapeHtml(dong.tenKhuNha || '')}</td>
                            <td>${escapeHtml(dong.diaChi || '')}</td>
                            <td>${escapeHtml(trangThaiArray[dong.trangThai] || '')}</td>
                            <td>
                                <div class="deleteButton"
                                    onclick="event.stopPropagation(); xoaKhuNha('${escapeHtml(dong.idKhuNha)}', '${escapeHtml(dong.tenKhuNha || '')}');">
                                    ${new PVCImage("https://pvcapp.github.io/00148/img/recycle.svg", 'auto', '16px', 'margin-right:6px;', '0.6').render()}
                                </div>
                            </td>
                        </tr>
                    `;
                }
            }

            const tbody = document.querySelector('#chuNha_danhSachKhuNha_table tbody');
            tbody.innerHTML = dataHtml;
        }
    },
    detail: 
    {

    },
    form: 
    {
        
    }
};