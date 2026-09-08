    function chuNha_showDanhSachKhuNha(danhSach) 
    {
        if (!danhSach.length) {
            $('#tab_chuNha_khuNha_danhSach').innerHTML = '<div class="chu-phu">Chưa có khu nhà.</div>';
            return;
        }

        $('#tab_chuNha_khuNha_danhSach').innerHTML = `            
                <div style="width: 100%;display: flex; flex-wrap: nowrap; justify-content: space-between; gap: 0.6rem;">
                    <span class="card__caption">Danh sách khu/tòa nhà</span>
                    <div class="menu__button" style="width: 160px;" onclick="themMoiKhuNha_lamMoi();hide('tab_chuNha_khuNha_danhSach');show('themMoiKhuNha_form', 'grid');">Khu nhà mới</div>
                </div>
                <div class="card">
                    <table class="bang" id="chuNha_danhSachKhuNha_table">
                        <thead>
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
                </div>
        `;

        let dataHtml = '';
        let trangThaiArray = {'dangHoatDong': 'Hoạt động', 'tamDung': 'Ngừng hoạt động'};
        let stt =0;
        for (let i =0; i< danhSach.length; i++)
        {            
            let dong = danhSach[i];
            if (dong.active == '1')
            {
                stt++;
                dataHtml += `
                    <tr onclick="khuNha_edit('${escapeHtml(dong.idKhuNha)}')">
                        <td>${stt}</td>
                        <td>${escapeHtml(dong.tenKhuNha || '')}</td>
                        <td>${escapeHtml(dong.diaChi || '')}</td>
                        <td>${escapeHtml(trangThaiArray[dong.trangThai] || '')}</td>
                        <td>
                            <div class="deleteButton"
                                onclick="event.stopPropagation(); xoaKhuNha('${escapeHtml(dong.idKhuNha)}', '${escapeHtml(dong.tenKhuNha || '')}');">
                                ${new PVCImage("https://pvcapp.github.io/00148/img/recycle.svg", 'auto', '16px', 'margin-right:6px;').render()}
                            </div>
                        </td>
                    </tr>
                `;
            }
        }

        const tbody = document.querySelector('#chuNha_danhSachKhuNha_table tbody');
        tbody.innerHTML = dataHtml;
    }
