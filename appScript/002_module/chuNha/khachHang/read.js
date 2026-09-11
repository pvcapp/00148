APP.ui.chuNha.quanLyKhachHang.danhSach = 
{
    showDangThue: 0,
    startup: function()
    {
        $('#tab_chuNha_khachHang_danhSach_header').innerHTML = 
            `<div style="width: 100%;display: flex; flex-wrap: nowrap; justify-content: space-between; gap: 0.6rem;">
                <div style="display: flex; flex-wrap: nowrap;">
                    <div class="card__caption">
                        DS khách hàng
                    </div>
                    <select class="menu__button" style="margin-left:12px;" id="chuNha_khachHang_filterButton" onchange="APP.ui.chuNha.quanLyKhachHang.danhSach.showDangThue=this.value; APP.ui.chuNha.quanLyKhachHang.danhSach.render();">
                        <option value="0" selected>Khách hàng chưa thuê</option>
                        <option value="1">Khách hàng đã thuê</option>
                        <option value="2">Tất cả</option>
                    </select>
                </div>

                <div class="menu__button" style="width: 170px;font-size: 14px;" onclick="APP.ui.chuNha.quanLyKhachHang.addNew.show();">
                    ${new PVCImage("https://pvcapp.github.io/00148/img/new.svg", 'auto', '16px', 'margin-right:6px;').render()}
                    Khách hàng mới
                </div>
            </div>`;
        
    },
    render: function()
    {
        let html = `
            <div class="card">

                <table class="bang hide-on-mobile">
                    <thead>
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

        let dangThue = APP.ui.chuNha.quanLyKhachHang.danhSach.showDangThue;
        html += APP.data.danhSachKhachHang
            .filter(function(dong) {
                return String(dong.active) === '1';
            })
            .map(function(dong) {
                let d = '<tr onclick="APP.ui.chuNha.quanLyKhachHang.update.show('
                    + "'" + dong.idKhachHang + "'" 
                    + ')">';
                d += '<td>' + dong.hoVaTen + '</td>';
                d += '<td>' + dong.email + '</td>';
                d += '<td>' + dong.dienThoai + '</td>';
                let thue = String(dong.dangThue) === '0'  ? 'Chưa thuê' : 'Đang thuê';
                d += '<td>' + thue + '</td>';
                
                let xacMinh = new PVCImage("https://pvcapp.github.io/00148/img/checked.svg", 'auto', '16px', 'margin-right:6px;').render() + 'Đã xác minh';
                console.log(JSON.stringify(APP.data.danhSachKhachHang_xacMinh));
                let dongXacMinh = APP.data.danhSachKhachHang_xacMinh.find(function(dxm){
                    return dxm.idKhachHang == dong.idKhachHang
                });

                if (dongXacMinh && dongXacMinh.xacMinh == '')
                {
                    xacMinh = `
                        <div class="menu__button" style="width: 170px;font-size: 14px;" 
                            onclick="event.stopPropagation();APP.ui.chuNha.quanLyKhachHang.update.xacMinh.show('${dong.idKhachHang}');">                        
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
                        ${APP.data.danhSachKhachHang
                        .filter(function(dong) {
                            return String(dong.active) === '1';
                        })
                        .map(function(dong) {
                            let html2 = '';
                            html2 +=  `
                                <div class="card" onclick="APP.ui.chuNha.quanLyKhachHang.update.show('${dong.idKhachHang}');">
                                    <div class="card__caption">
                                        ${escapeHtml(dong.hoVaTen || '')}                                    
                                    </div>
                                    ${escapeHtml(dong.dienThoai || '')}<br>
                                    ${escapeHtml(dong.dienChi || '')}<br>
                                    ${escapeHtml(dong.email || '')}`;
                                    
                                    let xacMinh = new PVCImage("https://pvcapp.github.io/00148/img/checked.svg", 'auto', '16px', 'margin-right:6px;').render() + 'Đã xác minh';
                                    let dongXacMinh = APP.data.danhSachKhachHang_xacMinh.find(function(dxm){
                                        return dxm.idKhachHang == dong.idKhachHang
                                    });
                                    
                                    if (dongXacMinh && dongXacMinh.xacMinh == '')
                                    {
                                        xacMinh = `
                                            <div class="menu__button" style="width: 170px;font-size: 14px;" 
                                                onclick="event.stopPropagation();chuNha_khachHang_xacMinh('${dong.userName}');">                        
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
            </div>
        `;
        $('#tab_chuNha_khachHang_danhSach_body').innerHTML = html;
        activeButton('menu_chuNha_khachHang');
    },
    show: function()
    {
        show('tab_chuNha_khachHang_danhSach');
    },
    hide: function()
    {
        hide('tab_chuNha_khachHang_danhSach');
    }
}



