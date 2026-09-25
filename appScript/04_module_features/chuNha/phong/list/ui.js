APP.features.chuNha.quanLyPhong.list.ui =
{
    init: function()
    {
        const tabHeader = document.createElement('div');
        tabHeader.className = 'tab__header';
        tabHeader.innerHTML = `
            <span class="card__caption">Danh sách phòng</span>
            <div class="sidebar__button" style="width: 160px;" onclick="themMoiPhong_lamMoi();hide('tab_chuNha_phong_danhSach');show('themMoiPhong_form', 'grid');">
                ${new PVCImage("https://pvcapp.github.io/00148/img/new.svg", 'auto', '16px', 'margin-right:6px;').render()}
                Phòng mới
            </div>`;
        APP.view.ui.addTab('chuNha', 'quanLyPhong', 'list', tabHeader);

        const tab_main = document.createElement('div');
        tab_main.id = 'chuNha_quanLyPhong_list_main';
        tab_main.className = 'tab__main';
        tab_main.appendChild(loadingBar());
        APP.view.ui.addElementToTab('chuNha', 'quanLyPhong', 'list', tab_main);            
    },
    render: function()
    {
        $('#chuNha_quanLyPhong_list_main').innerHTML = 
        `<table class="${APP.features.chuNha.quanLyPhong.ui.list.tableStyle}" id="chuNha_danhSachPhong_table">
                <thead class="${APP.features.chuNha.quanLyPhong.ui.list.tableStyle}__header">
                    <tr>
                        <th>Phòng</th>
                        <th>Khu nhà</th>
                        <th>Tầng</th>
                        <th>Diện tích</th>
                        <th>Giá phòng</th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>`;
        

        let dataHtml = '';
        let stt =0;
        let trangThaiArray = {'dangHoatDong': 'Đang hoạt động', 'tamDung': 'Tạm dừng hoạt động'};
        
        for(let i=0; i<APP.cache.danhSachPhong.data.length; i++)
        {  
            let dong = APP.cache.danhSachPhong.data[i];
            if (dong.active == '1')
            {
                stt ++;                
                let tenKhuNha = '';
                APP.cache.danhSachKhuNha.data.forEach(function(khuNha)
                {
                    if (khuNha.idKhuNha === dong.idKhuNha) 
                    {
                        tenKhuNha = khuNha.tenKhuNha;
                        return false; // thoát khỏi vòng lặp
                    }
                });

                
                dataHtml += `
                    <tr class="${APP.features.chuNha.quanLyPhong.ui.list.tableStyle}__row"
                        onclick="chuNha_editPhong('${escapeHtml(dong.idPhong)}')">
                        <td>${escapeHtml(dong.tenPhong || '')}</td>
                        <td>${escapeHtml(tenKhuNha || '')}</td>
                        <td>${escapeHtml(dong.tang || '')}</td>
                        <td>${escapeHtml(String(dong.dienTich || ''))}</td>
                        <td>${formatMoney(dong.giaNiemYet)}</td>                                   
                        <td>${escapeHtml(trangThaiArray[dong.trangThai] || '')}</td>
                        <td>
                            <div class="deleteButton imageButton" onclick="event.stopPropagation();chuNha_xoaPhong('${escapeHtml(dong.idPhong)}')">
                                ${new PVCImage("https://pvcapp.github.io/00148/img/recycle.svg", 'auto', '16px', 'margin-right:6px;', '0.6').render()}
                            </div>
                        </td>
                    </tr>
                `;
                        
            }
        }

        const tbody = document.querySelector('#chuNha_danhSachPhong_table tbody');
        tbody.innerHTML = dataHtml;
    }
};