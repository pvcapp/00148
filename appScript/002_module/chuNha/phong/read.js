    function chuNha_showDanhSachPhong(danhSach)
    {
        $('#tab_chuNha_phong_danhSach').innerHTML = `
            <div style="width: 100%;display: flex; flex-wrap: nowrap; justify-content: space-between; gap: 0.6rem;">
                <span class="card__caption">Danh sách phòng</span>
                <div class="menu__button" style="width: 160px;" onclick="themMoiPhong_lamMoi();hide('tab_chuNha_phong_danhSach');show('themMoiPhong_form', 'grid');">Phòng mới</div>
            </div>
            <div class="card">
                <table class="bang" id="chuNha_danhSachPhong_table">
                    <thead>
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
        
        for(let i=0; i<danhSach.length; i++)
        {  
            let dong = danhSach[i];
            if (dong.active == '1')
            {
                stt ++;                
                let tenKhuNha = '';
                APP.data.khuNha.forEach(function(khuNha)
                {
                    if (khuNha.idKhuNha === dong.idKhuNha) 
                    {
                        tenKhuNha = khuNha.tenKhuNha;
                        return false; // thoát khỏi vòng lặp
                    }
                });

                
                dataHtml += `
                    <tr onclick="chuNha_editPhong('${escapeHtml(dong.idPhong)}')">
                        <td>${escapeHtml(dong.tenPhong || '')}</td>
                        <td>${escapeHtml(tenKhuNha || '')}</td>
                        <td>${escapeHtml(dong.tang || '')}</td>
                        <td>${escapeHtml(String(dong.dienTich || ''))}</td>
                        <td>${formatMoney(dong.giaNiemYet)}</td>                                   
                        <td>${escapeHtml(trangThaiArray[dong.trangThai] || '')}</td>
                        <td>
                            <div class="deleteButton" onclick="event.stopPropagation();chuNha_xoaPhong('${escapeHtml(dong.idPhong)}')">
                                ${new PVCImage("https://pvcapp.github.io/00148/img/recycle.svg", 'auto', '16px', 'margin-right:6px;').render()}
                            </div>
                        </td>
                    </tr>
                `;
                        
            }
        }

        const tbody = document.querySelector('#chuNha_danhSachPhong_table tbody');
        tbody.innerHTML = dataHtml;
    }