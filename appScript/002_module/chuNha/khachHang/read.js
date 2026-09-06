function chuNha_showDanhSachKhachHang(danhSach, dangThue = 0) 
{
    let html = `
        <div style="width: 100%;display: flex; flex-wrap: nowrap; justify-content: space-between; gap: 0.6rem;">

            <span class="card__caption">
                DS khách hàng
            </span>

            <div 
                class="menu__button" 
                style="width: 170px;font-size: 14px;" 
                onclick="hide('chuNha_danhSachKhachHang_div');show('themMoiKhachHang_form', 'grid');"
            >
                <img 
                    src="https://pvcapp.github.io/00148/img/new.svg" 
                    style="height:16px;margin-right:6px;"
                >

                Khách hàng mới
            </div>

        </div>
    `;


    html += `
        <div class="card">

            <table class="bang hide-on-mobile">

                <thead>

                    <tr>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Điện thoại</th>
                        <th>Trạng thái</th>
                        <th>Khóa chỉnh sửa</th>
                        <th>Thuê nhà</th>
                    </tr>

                </thead>

                <tbody>
    `;

                    
    html += danhSach
        .filter(function(dong) {
            return String(dong.active) === '1'
                && (
                    String(dong.dangThue) === '0'
                    || dangThue == 1
                );
        })
        .map(function(dong) {
            let d = '<tr ondblclick="khachHang_edit('
                + "'" + dong.idKhachHang + "'" 
                + ')">';
            d += '<td>' + dong.hoVaTen + '</td>';
            d += '<td>' + dong.email + '</td>';
            d += '<td>' + dong.dienThoai + '</td>';
            let thue = String(dong.dangThue) === '0'
                ? 'Chưa thuê'
                : 'Đang thuê';
            d += '<td>' + thue + '</td>';

            d += '<td></td>';
            d += '<td>';
                d += '<div class="button menu__button menu__button__selected" '
                    + 'onclick="event.stopPropagation(); chuNha_danhSachKhachHang_choThue();">';
                    d += 'Cho thuê';
                d += '</div>';
                d += '<div class="deleteButton hide" '
                    + 'onclick="event.stopPropagation(); xoaKhachHang('
                    + "'" + dong.idKhachHang + "', "
                    + "'" + dong.hoVaTen + "'"
                    + ');">';
                    d += 'x';
                d += '</div>';
            d += '</td>';
            d += '</tr>';
            return d;
        })
        .join('');
        
        
    html += `</tbody>
            </table>


            <div style="display: flex; flex-direction:column; gap:10px" class="hide-on-pc">
                    ${danhSach
                    .filter(function(dong) {
                        return String(dong.active) === '1'
                        && (String(dong.dangThue) === '0' || dangThue == 1);
                    })
                    .map(function(dong) {
                        return `
                            <div class="card">
                                <div class="card__caption">
                                    ${escapeHtml(dong.hoVaTen || '')}                                    
                                </div>
                                ${escapeHtml(dong.dienThoai || '')}<br>
                                ${escapeHtml(dong.dienChi || '')}<br>
                                ${escapeHtml(dong.email || '')}
                                <center>
                                    <div class="button menu__button menu__button__selected" style="width:120px;"
                                        onclick="chuNha_danhSachKhachHang_choThue();">                                    
                                        Cho thuê    
                                    </div>

                                    <div class="deleteButton" style="display:none;"
                                        onclick="event.stopPropagation(); xoaKhachHang('${escapeHtml(dong.idKhachHang)}', '${escapeHtml(dong.hoVaTen || '')}');">
                                        x
                                    </div>
                                </center>
                            </div>
                        `;

                    })
                    .join('')
                    }
                </div>



        </div>
    `;
    $('#chuNha_danhSachKhachHang_div').innerHTML = html;
}