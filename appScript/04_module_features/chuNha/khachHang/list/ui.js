APP.features.chuNha.quanLyKhachHang.list.ui = 
{
    init: function()
    {
        const tabHeader = document.createElement('div');
        tabHeader.className = 'tab__header';
        tabHeader.innerHTML = `
            <div style="display: flex; flex-wrap: nowrap;">
                <div class="card__caption hide-on-mobile" style="width:200px;">
                    DS khách hàng
                </div>
                <select class="sidebar__button" style="margin-left:12px;" id="chuNha_khachHang_filterButton" onchange="APP.features.chuNha.quanLyKhachHang.ui.list.showDangThue=this.value; APP.features.chuNha.quanLyKhachHang.ui.list.render();">
                    <option value="0" selected>Khách hàng chưa thuê</option>
                    <option value="1">Khách hàng đã thuê</option>
                    <option value="2">Tất cả</option>
                </select>
            </div>

            <div class="sidebar__button" style="width: 170px;font-size: 14px;" onclick="APP.features.chuNha.quanLyKhachHang.addNew.show();">
                ${new PVCImage("https://pvcapp.github.io/00148/img/new.svg", 'auto', '16px', 'margin-right:6px;').render()}
                Khách hàng mới
            </div>`;
        APP.view.ui.addTab('chuNha', 'quanLyKhachHang', 'list', tabHeader);
        
        const tab_main = document.createElement('div');
        tab_main.id = 'chuNha_quanLyKhachHang_list_main';
        tab_main.className = 'tab__main';
        tab_main.appendChild(loadingBar());
        APP.view.ui.addElementToTab('chuNha', 'quanLyKhachHang', 'list', tab_main);

        APP.features.chuNha.quanLyKhachHang.detail.ui.xacMinh.init();
    },
    render: function()
    {
        let html = `
                <table class="${APP.features.chuNha.quanLyKhachHang.list.style.tableStyle} hide-on-mobile">
                    <thead class="${APP.features.chuNha.quanLyKhachHang.list.style.tableStyle}__header">
                        <tr>
                            <th>Họ tên</th>
                            <th>Email</th>
                            <th>Điện thoại</th>
                            <th>Trạng thái</th>
                            <th>Xác minh</th>
                            <th>Cho thuê phòng</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        html += APP.cache.danhSachKhachHang.data
            .filter(function(dong) {
                return String(dong.active) === '1';
            })
            .map(function(dong) {
                let d = '<tr class="' + APP.features.chuNha.quanLyKhachHang.list.style.tableStyle + '__row" onclick="APP.features.chuNha.quanLyKhachHang.update.show('
                    + "'" + dong.idKhachHang + "'" 
                    + ')">';
                d += '<td>' + dong.hoVaTen + '</td>';
                d += '<td>' + dong.email + '</td>';
                d += '<td>' + dong.dienThoai + '</td>';
                
                
                let hopDong = APP.cache.danhSachHopDong.data.find(function(hd)
                {
                    return hd.khachHang_idKhachHang == dong.idKhachHang;
                });

                let thue = '';
                if (hopDong)
                {
                    thue = hopDongActive(hopDong) ? 'Đang thuê' : 'Chưa thuê';
                }
                else
                {
                    thue = 'Chưa thuê';
                }
                
                
                d += '<td>' + thue + '</td>';
                
                let xacMinh = new PVCImage("https://pvcapp.github.io/00148/img/checked.svg", 'auto', '16px', 'margin-right:6px;').render() + 'Đã xác minh';
                let dongXacMinh = APP.cache.danhSachKhachHang_xacMinh.data.find(function(dxm){
                    return dxm.idKhachHang == dong.idKhachHang
                });

                if (dongXacMinh && dongXacMinh.xacMinh == '')
                {
                    xacMinh = `
                        <div class="sidebar__button" style="width: 170px;font-size: 14px;" 
                            onclick="event.stopPropagation();APP.features.chuNha.quanLyKhachHang.detail.control.xacMinh.show('${dong.idKhachHang}');">                        
                            Xác minh
                        </div>
                    `;
                }
                d += '<td>' + xacMinh + '</td>';

                d += '<td>';
                    d += '<div class="button button__selected" '
                        + 'onclick="event.stopPropagation(); chuNha_danhSachKhachHang_choThue();">';
                        d += new PVCImage('https://pvcapp.github.io/00148/img/rent_white.svg', '16px', 'auto', 'margin-right:10px;').render();
                        d += 'Cho thuê';
                    d += '</div>';
                d += '</td>';
                d += '</tr>';
                return d;
            })
            .join('');
            
            
        html += `</tbody>
                </table>


            <div style="display: flex; flex-direction:column; gap:10px" class="hide-on-pc">
                    ${APP.cache.danhSachKhachHang.data
                    .filter(function(dong) {
                        return String(dong.active) === '1';
                    })
                    .map(function(dong) {
                        let html2 = '';
                        html2 +=  `
                            <div class="card" onclick="APP.features.chuNha.quanLyKhachHang.update.show('${dong.idKhachHang}');">
                                <div class="card__caption">
                                    ${escapeHtml(dong.hoVaTen || '')}                                    
                                </div>
                                ${escapeHtml(dong.dienThoai || '')}<br>
                                ${escapeHtml(dong.dienChi || '')}<br>
                                ${escapeHtml(dong.email || '')}<br>`;

                                let hopDong = APP.cache.danhSachHopDong.data.find(function(hd)
                                {
                                    return hd.khachHang_idKhachHang == dong.idKhachHang;
                                });

                                let thue = '';
                                if (hopDong)
                                {
                                    thue = hopDongActive(hopDong) ? 'Đang thuê' : 'Chưa thuê';
                                }
                                else
                                {
                                    thue = 'Chưa thuê';
                                }
                                html2 += 'Trạng thái: ' + thue;

                                let xacMinh = new PVCImage("https://pvcapp.github.io/00148/img/checked.svg", 'auto', '16px', 'margin-right:6px;').render() + 'Đã xác minh';
                                let dongXacMinh = APP.cache.danhSachKhachHang_xacMinh.data.find(function(dxm){
                                    return dxm.idKhachHang == dong.idKhachHang
                                });
                                
                                if (dongXacMinh && dongXacMinh.xacMinh == '')
                                {
                                    xacMinh = `
                                        <div class="button button__selected" style="width: 170px;font-size: 14px;" 
                                            onclick="event.stopPropagation();APP.features.chuNha.quanLyKhachHang.detail.control.xacMinh.show('${dong.idKhachHang}');">                        
                                            Xác minh
                                        </div>
                                    `;
                                }
                                html2 += '<td>' + xacMinh + '</td>';

                                html2 += `
                                <center>
                                    <div class="button button__selected" style="width:160px;display: flex; flex-wrap: nowrap;"
                                        onclick="chuNha_danhSachKhachHang_choThue();">         
                                        ${new PVCImage('https://pvcapp.github.io/00148/img/rent_white.svg', '16px', 'auto', 'margin-right:10px;').render()}                           
                                        Cho thuê    
                                    </div>
                                </center>
                            </div>
                        `;
                        return html2;

                    })
                    .join('')
                    }
                </div>
        `;
        $('#chuNha_quanLyKhachHang_list_main').innerHTML = html;
        activeButton('sidebar_chuNha_quanLyKhachHang');
    }
};