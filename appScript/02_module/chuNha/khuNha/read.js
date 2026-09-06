    function chuNha_showDanhSachKhuNha(danhSach) 
    {
        if (!danhSach.length) {
            $('#danhSachKhuNha_div').innerHTML = '<div class="chu-phu">Chưa có khu nhà.</div>';
            return;
        }

        $('#danhSachKhuNha_div').innerHTML = `
            
                <div style="width: 100%;display: flex; flex-wrap: nowrap; justify-content: space-between; gap: 0.6rem;">
                    <span class="card__caption">Danh sách khu/tòa nhà</span>
                    <div class="menu__button" style="width: 160px;" onclick="themMoiKhuNha_lamMoi();hide('danhSachKhuNha_div');show('themMoiKhuNha_form', 'grid');">Khu nhà mới</div>
                </div>
                <div class="card">
                    <table class="bang">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên khu nhà</th>
                                <th>Địa chỉ</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${danhSach.map(function(dong, index)
                            {
                                let trangThaiArray = {'active': 'Hoạt động', 'inactive': 'Ngừng hoạt động'};
                                return `
                                    <tr ondblclick="khuNha_edit('${escapeHtml(dong.maKhuNha)}')">
                                        <td>${index + 1}</td>
                                        <td>${escapeHtml(dong.tenKhuNha || '')}</td>
                                        <td>${escapeHtml(dong.diaChi || '')}</td>
                                        <td>${escapeHtml(trangThaiArray[dong.trangThai] || '')}</td>
                                        <td>
                                            <div class="deleteButton"
                                                onclick="event.stopPropagation(); xoaKhuNha('${escapeHtml(dong.maKhuNha)}', '${escapeHtml(dong.tenKhuNha || '')}');">
                                                x
                                            </div>
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
        `;
    }
