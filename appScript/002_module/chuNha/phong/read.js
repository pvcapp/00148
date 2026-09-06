    function chuNha_showDanhSachPhong(danhSach)
    {
        $('#danhSachPhong_div').innerHTML = `
            <div style="width: 100%;display: flex; flex-wrap: nowrap; justify-content: space-between; gap: 0.6rem;">
                <span class="card__caption">Danh sách phòng</span>
                <div class="menu__button" style="width: 160px;" onclick="themMoiPhong_lamMoi();hide('danhSachPhong_div');show('themMoiPhong_form', 'grid');">Phòng mới</div>
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
        let trangThaiArray = {'Trong': 'Trống', 'DangThue': 'Đang thuê', 
                    'DangSuaChua': 'Đang sửa chữa', 'DangBaoTri': 'Đang bảo trì', 
                    'NgungHoatDong': 'Ngừng hoạt động'};
        
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
                    <tr>
                        <td>${escapeHtml(dong.tenPhong || '')}</td>
                        <td>${escapeHtml(tenKhuNha || '')}</td>
                        <td>${escapeHtml(dong.tang || '')}</td>
                        <td>${escapeHtml(String(dong.dienTich || ''))}</td>
                        <td>${formatMoney(dong.giaPhong)}</td>                                   
                        <td>${escapeHtml(trangThaiArray[dong.trangThai] || '')}</td>
                        <td>
                            <div class="button" onclick="phong_edit('${escapeHtml(dong.idPhong)}')">Sửa</div>
                            <div class="deleteButton" onclick="xoaPhong('${escapeHtml(dong.idPhong)}')">x</div>
                        </td>
                    </tr>
                `;
                        
            }
        }

        const tbody = document.querySelector('#chuNha_danhSachPhong_table tbody');
        tbody.innerHTML = dataHtml;
    }
