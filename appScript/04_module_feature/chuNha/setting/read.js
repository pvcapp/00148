    function chuNha_showSetting(data)
    {
        $('#tab_chuNha_setting_danhSach').innerHTML = `
            <h2 class="card__caption">Cài đặt giá cước</h2>
            <div style="padding:12px;display: flex; flex-direction: column;gap:12px;">
                <div class="card" style="padding: var(--padding-lg)">
                    <div class="card__caption">Đơn giá điện</div>
                    Đơn vị: đ/kwh
                    <div class="card__number">
                        ${formatMoney(data[0].giaTri)}
                    </div>
                </div>

                <div class="card" style="padding: var(--padding-lg)">
                    <div class="card__caption">Đơn giá nước</div>
                    Đơn vị: đ/m<sup>3</sup>
                    <div class="card__number">
                        ${formatMoney(data[1].giaTri)}
                    </div>
                </div>

                <div class="card" style="padding: var(--padding-lg)">
                    <div class="card__caption">Phí internet</div>
                    Đơn vị: đ/tháng
                    <div class="card__number">
                        ${formatMoney(data[2].giaTri)}
                    </div>
                </div>
            </div>
        `;       

    }
    