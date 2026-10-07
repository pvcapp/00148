APP.features.chuNha.quanLyHopDong = APP.features.chuNha.quanLyHopDong || {};
APP.features.chuNha.quanLyHopDong.list = APP.features.chuNha.quanLyHopDong.list || {};
APP.features.chuNha.quanLyHopDong.list.ui =
{
    selectedCustomerId: '',
    selectedRoomId: '',
    customerSearch: '',
    roomSearch: '',
    fields: [
        ['idHopDong', 'Mã hợp đồng'],
        ['khachHang_hoVaTen', 'Khách thuê'],
        ['phong_tenPhong', 'Phòng'],
        ['ngayBatDau', 'Ngày bắt đầu'],
        ['ngayKetThuc', 'Ngày kết thúc'],
        ['trangThai', 'Trạng thái']
    ],
    init: function()
    {
        const tabHeader = document.createElement('div');
        tabHeader.className = 'tab__header';
        tabHeader.innerHTML = '<span class="card__caption">Ghép khách hàng và phòng thuê</span>';
        APP.view.ui.addTab('chuNha', 'quanLyHopDong', 'list', tabHeader);

        const main = document.createElement('div');
        main.id = 'chuNha_quanLyHopDong_list_main';
        main.className = 'tab__main';
        APP.view.ui.addElementToTab('chuNha', 'quanLyHopDong', 'list', main);
        this.installStyles();
        this.render();
    },
    installStyles: function()
    {
        if ($('#chuNha_hopDong_builder_styles')) return;
        const style = document.createElement('style');
        style.id = 'chuNha_hopDong_builder_styles';
        style.textContent = `
            .hopdong-builder { --hd-line:#d8dfdc; --hd-muted:#65736d; --hd-ink:#1c2b25; --hd-accent:#19745a; color:var(--hd-ink); }
            .hopdong-builder__intro { display:flex; justify-content:space-between; align-items:baseline; gap:12px; margin:0 0 14px; }
            .hopdong-builder__intro p { margin:0; color:var(--hd-muted); }
            .hopdong-builder__columns { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:18px; align-items:start; }
            .hopdong-builder__section { min-width:0; border:1px solid var(--hd-line); border-radius:6px; background:#fff; overflow:hidden; }
            .hopdong-builder__section-head { padding:14px 16px 10px; border-bottom:1px solid var(--hd-line); }
            .hopdong-builder__section-head h2, .hopdong-builder__dates h2 { margin:0 0 10px; font-size:17px; }
            .hopdong-builder__search { width:100%; min-height:40px; box-sizing:border-box; border:1px solid #aebbb5; border-radius:4px; padding:8px 10px; font:inherit; }
            .hopdong-builder__count { display:block; margin-top:7px; color:var(--hd-muted); font-size:13px; }
            .hopdong-builder__table-wrap { overflow:auto; max-height:390px; }
            #chuNha_hopDong_customer_list, #chuNha_hopDong_room_list { height:390px; box-sizing:border-box; overflow-y:scroll; overflow-x:hidden; }
            .hopdong-builder__table-wrap { max-height:none; overflow-x:auto; overflow-y:visible; }
            .hopdong-builder__table { width:100%; border-collapse:collapse; text-align:left; }
            .hopdong-builder__table th, .hopdong-builder__table td { padding:10px 12px; border-bottom:1px solid #e8edeb; vertical-align:top; }
            .hopdong-builder__table th { position:sticky; top:0; background:#f4f7f5; font-size:12px; color:var(--hd-muted); }
            .hopdong-builder__pick { width:100%; padding:0; border:0; background:none; color:inherit; text-align:left; font:inherit; cursor:pointer; }
            .hopdong-builder__pick:hover strong, .hopdong-builder__pick:focus-visible strong { color:var(--hd-accent); text-decoration:underline; }
            .hopdong-builder__secondary { display:block; margin-top:3px; color:var(--hd-muted); font-size:13px; }
            .hopdong-builder__status { white-space:nowrap; font-size:13px; }
            .hopdong-builder__empty { padding:18px 12px; color:var(--hd-muted); }
            .hopdong-builder__detail { padding:16px; }
            .hopdong-builder__detail-top { display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:12px; }
            .hopdong-builder__detail-top h3 { margin:0; font-size:18px; }
            .hopdong-builder__change { border:1px solid var(--hd-line); border-radius:4px; padding:7px 10px; background:#fff; color:var(--hd-ink); font:inherit; cursor:pointer; }
            .hopdong-builder__facts { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:0 18px; margin:0; }
            .hopdong-builder__facts div { padding:9px 0; border-top:1px solid #e8edeb; min-width:0; }
            .hopdong-builder__facts dt { color:var(--hd-muted); font-size:12px; }
            .hopdong-builder__facts dd { margin:4px 0 0; overflow-wrap:anywhere; }
            .hopdong-builder__dates { margin-top:18px; padding:16px; border-top:2px solid var(--hd-line); background:#f7f9f8; }
            .hopdong-builder__date-fields { display:grid; grid-template-columns:repeat(2,minmax(0,260px)); gap:14px; }
            .hopdong-builder__date-fields label { display:block; margin-bottom:6px; font-size:13px; }
            .hopdong-builder__date-fields input { width:100%; min-height:40px; box-sizing:border-box; padding:7px 9px; border:1px solid #aebbb5; border-radius:4px; font:inherit; }
            .hopdong-builder__validation { min-height:20px; margin:10px 0 0; color:#a1372d; font-size:13px; }
            @media (max-width:760px) {
                .hopdong-builder__columns { grid-template-columns:1fr; gap:12px; }
                #chuNha_hopDong_customer_list, #chuNha_hopDong_room_list { height:300px; }
                .hopdong-builder__facts { grid-template-columns:1fr; }
                .hopdong-builder__date-fields { grid-template-columns:1fr; }
                .hopdong-builder__intro { align-items:flex-start; flex-direction:column; }
            }
        `;
        document.head.appendChild(style);
    },
    asList: function(value)
    {
        if (Array.isArray(value)) return value;
        if (value && Array.isArray(value.data)) return value.data;
        return [];
    },
    getCustomers: function()
    {
        return this.asList(APP.cache.danhSachKhachHang).filter(function(customer)
        {
            return String(customer.active) === '1';
        });
    },
    getRooms: function()
    {
        return this.asList(APP.cache.danhSachPhong).filter(function(room)
        {
            return String(room.active) === '1';
        });
    },
    getContracts: function()
    {
        return this.asList(APP.cache.danhSachHopDong);
    },
    getNeighborhoods: function()
    {
        return this.asList(APP.cache.danhSachKhuNha);
    },
    getSettings: function()
    {
        return this.asList(APP.cache.setting);
    },
    isRented: function(type, id)
    {
        const field = type === 'customer' ? 'khachHang_idKhachHang' : 'phong_idPhong';
        return this.getContracts().some((contract) =>
        {
            return String(contract[field]) === String(id) && APP.features.chuNha.quanLyHopDong.control.isActive(contract);
        });
    },
    matchesCustomer: function(customer, rawQuery)
    {
        const query = String(rawQuery || '').trim();
        if (!query) return true;
        if (/^[\d\s()+.-]+$/.test(query))
        {
            const digits = query.replace(/\D/g, '');
            if (digits.length >= 7 && digits.length <= 10 && String(customer.dienThoai || '').replace(/\D/g, '').startsWith(digits)) return true;
            if (digits.length >= 10 && digits.length <= 12 && String(customer.soCCCD || '').replace(/\D/g, '').startsWith(digits)) return true;
            return false;
        }
        return typeof ATrongB === 'function' && ATrongB(query, customer.hoVaTen || '');
    },
    matchesRoom: function(room, rawQuery)
    {
        const query = String(rawQuery || '').trim();
        if (!query) return true;
        return typeof ATrongB === 'function' && ATrongB(query, room.tenPhong || '');
    },
    getFilteredCustomers: function()
    {
        return this.getCustomers().filter((customer) => this.matchesCustomer(customer, this.customerSearch)).sort((a, b) =>
        {
            const rentedOrder = Number(this.isRented('customer', a.idKhachHang)) - Number(this.isRented('customer', b.idKhachHang));
            return rentedOrder || String(a.hoVaTen || '').localeCompare(String(b.hoVaTen || ''), 'vi');
        });
    },
    getFilteredRooms: function()
    {
        return this.getRooms().filter((room) => this.matchesRoom(room, this.roomSearch)).sort((a, b) =>
        {
            const rentedOrder = Number(this.isRented('room', a.idPhong)) - Number(this.isRented('room', b.idPhong));
            if (rentedOrder) return rentedOrder;
            const neighborhoodA = this.getNeighborhoodName(a.idKhuNha);
            const neighborhoodB = this.getNeighborhoodName(b.idKhuNha);
            return neighborhoodA.localeCompare(neighborhoodB, 'vi') || String(a.tenPhong || '').localeCompare(String(b.tenPhong || ''), 'vi');
        });
    },
    getNeighborhoodName: function(idKhuNha)
    {
        const neighborhood = this.getNeighborhoods().find(function(item)
        {
            return String(item.idKhuNha) === String(idKhuNha);
        });
        return neighborhood ? String(neighborhood.tenKhuNha || '') : '';
    },
    initMarkup: function()
    {
        return `
            <div class="hopdong-builder">
                <div class="hopdong-builder__intro"><p>Chọn khách hàng và phòng để xem thông tin ghép thuê.</p></div>
                <div class="hopdong-builder__columns">
                    <section class="hopdong-builder__section" aria-labelledby="chuNha_hopDong_customer_heading">
                        <div class="hopdong-builder__section-head">
                            <h2 id="chuNha_hopDong_customer_heading">Khách hàng</h2>
                            <input class="hopdong-builder__search" id="chuNha_hopDong_customer_search" type="search" autocomplete="off" placeholder="Họ tên, CCCD hoặc số điện thoại" aria-label="Tìm khách hàng">
                            <span class="hopdong-builder__count" id="chuNha_hopDong_customer_count"></span>
                        </div>
                        <div id="chuNha_hopDong_customer_list"></div>
                        <div class="hopdong-builder__detail" id="chuNha_hopDong_customer_detail" hidden></div>
                    </section>
                    <section class="hopdong-builder__section" aria-labelledby="chuNha_hopDong_room_heading">
                        <div class="hopdong-builder__section-head">
                            <h2 id="chuNha_hopDong_room_heading">Phòng thuê</h2>
                            <input class="hopdong-builder__search" id="chuNha_hopDong_room_search" type="search" autocomplete="off" placeholder="Tìm theo tên phòng" aria-label="Tìm phòng">
                            <span class="hopdong-builder__count" id="chuNha_hopDong_room_count"></span>
                        </div>
                        <div id="chuNha_hopDong_room_list"></div>
                        <div class="hopdong-builder__detail" id="chuNha_hopDong_room_detail" hidden></div>
                    </section>
                </div>
                <section class="hopdong-builder__dates" aria-labelledby="chuNha_hopDong_dates_heading">
                    <h2 id="chuNha_hopDong_dates_heading">Thời hạn hợp đồng</h2>
                    <div class="hopdong-builder__date-fields">
                        <div><label for="chuNha_hopDong_start_date">Ngày bắt đầu thuê</label><input id="chuNha_hopDong_start_date" type="date"></div>
                        <div><label for="chuNha_hopDong_end_date">Ngày kết thúc</label><input id="chuNha_hopDong_end_date" type="date"></div>
                    </div>
                    <p class="hopdong-builder__validation" id="chuNha_hopDong_date_validation" aria-live="polite"></p>
                </section>
            </div>`;
    },
    render: function()
    {
        const main = $('#chuNha_quanLyHopDong_list_main');
        if (!main) return;
        main.innerHTML = this.initMarkup();
        $('#chuNha_hopDong_customer_search').value = this.customerSearch;
        $('#chuNha_hopDong_room_search').value = this.roomSearch;
        $('#chuNha_hopDong_customer_search').addEventListener('input', () =>
        {
            this.customerSearch = $('#chuNha_hopDong_customer_search').value;
            this.renderCustomerRows();
        });
        $('#chuNha_hopDong_room_search').addEventListener('input', () =>
        {
            this.roomSearch = $('#chuNha_hopDong_room_search').value;
            this.renderRoomRows();
        });
        $('#chuNha_hopDong_customer_list').addEventListener('click', (event) =>
        {
            const button = event.target.closest('[data-customer-id]');
            if (button) this.selectCustomer(button.dataset.customerId);
        });
        $('#chuNha_hopDong_room_list').addEventListener('click', (event) =>
        {
            const button = event.target.closest('[data-room-id]');
            if (button) this.selectRoom(button.dataset.roomId);
        });
        $('#chuNha_hopDong_start_date').addEventListener('change', () => this.validateDates());
        $('#chuNha_hopDong_end_date').addEventListener('change', () => this.validateDates());
        this.renderCustomerRows();
        this.renderRoomRows();
        this.renderCustomerDetail();
        this.renderRoomDetail();
    },
    renderCustomerRows: function()
    {
        const customers = this.getFilteredCustomers();
        $('#chuNha_hopDong_customer_count').textContent = `${customers.length} khách hàng`;
        $('#chuNha_hopDong_customer_list').innerHTML = customers.length ? `
            <div class="hopdong-builder__table-wrap"><table class="hopdong-builder__table">
                <tbody>${customers.map((customer) => `
                    <tr><td><button class="hopdong-builder__pick" type="button" data-customer-id="${escapeHtml(customer.idKhachHang)}">
                        <strong>${escapeHtml(customer.hoVaTen || '')}</strong>
                        <span class="hopdong-builder__secondary">${escapeHtml(customer.dienThoai || '')}</span>
                    </button></td><td class="hopdong-builder__status">${this.isRented('customer', customer.idKhachHang) ? 'Đang thuê' : 'Chưa thuê'}</td></tr>
                `).join('')}</tbody>
            </table></div>` : '<p class="hopdong-builder__empty">Không tìm thấy khách hàng phù hợp.</p>';
    },
    renderRoomRows: function()
    {
        const rooms = this.getFilteredRooms();
        $('#chuNha_hopDong_room_count').textContent = `${rooms.length} phòng`;
        $('#chuNha_hopDong_room_list').innerHTML = rooms.length ? `
            <div class="hopdong-builder__table-wrap"><table class="hopdong-builder__table">
                <tbody>${rooms.map((room) => `
                    <tr><td><button class="hopdong-builder__pick" type="button" data-room-id="${escapeHtml(room.idPhong)}"><strong>${escapeHtml(room.tenPhong || '')}</strong></button></td>
                    <td>${escapeHtml(this.getNeighborhoodName(room.idKhuNha))}</td>
                    <td class="hopdong-builder__status">${this.isRented('room', room.idPhong) ? 'Đang cho thuê' : 'Đang trống'}</td></tr>
                `).join('')}</tbody>
            </table></div>` : '<p class="hopdong-builder__empty">Không tìm thấy phòng phù hợp.</p>';
    },
    renderFacts: function(facts)
    {
        return `<dl class="hopdong-builder__facts">${facts.map((fact) => `
            <div><dt>${escapeHtml(fact[0])}</dt><dd>${escapeHtml(fact[1] || '-')}</dd></div>
        `).join('')}</dl>`;
    },
    renderCustomerDetail: function()
    {
        const list = $('#chuNha_hopDong_customer_list');
        const detail = $('#chuNha_hopDong_customer_detail');
        if (!list || !detail) return;
        const customer = this.getCustomers().find((item) => String(item.idKhachHang) === String(this.selectedCustomerId));
        $('#chuNha_hopDong_customer_search').hidden = Boolean(customer);
        $('#chuNha_hopDong_customer_count').hidden = Boolean(customer);
        list.hidden = Boolean(customer);
        detail.hidden = !customer;
        if (!customer) return;
        detail.innerHTML = `
            <div class="hopdong-builder__detail-top"><h3>${escapeHtml(customer.hoVaTen || 'Khách hàng')}</h3><button class="hopdong-builder__change" type="button" data-change-customer>Đổi khách</button></div>
            ${this.renderFacts([
                ['Số điện thoại', customer.dienThoai],
                ['Số CCCD', customer.soCCCD],
                ['Email', customer.email],
                ['Địa chỉ thường trú', customer.diaChiThuongTru]
            ])}`;
        detail.querySelector('[data-change-customer]').addEventListener('click', () =>
        {
            this.selectedCustomerId = '';
            this.renderCustomerDetail();
        });
    },
    renderRoomDetail: function()
    {
        const list = $('#chuNha_hopDong_room_list');
        const detail = $('#chuNha_hopDong_room_detail');
        if (!list || !detail) return;
        const room = this.getRooms().find((item) => String(item.idPhong) === String(this.selectedRoomId));
        $('#chuNha_hopDong_room_search').hidden = Boolean(room);
        $('#chuNha_hopDong_room_count').hidden = Boolean(room);
        list.hidden = Boolean(room);
        detail.hidden = !room;
        if (!room) return;
        const settings = this.getSettings();
        const rate = (index) => settings[index] && settings[index].giaTri !== '' ? formatMoney(settings[index].giaTri) : 'Chưa cài đặt';
        detail.innerHTML = `
            <div class="hopdong-builder__detail-top"><h3>${escapeHtml(room.tenPhong || 'Phòng')}</h3><button class="hopdong-builder__change" type="button" data-change-room>Đổi phòng</button></div>
            ${this.renderFacts([
                ['Khu nhà', this.getNeighborhoodName(room.idKhuNha)],
                ['Tên phòng', room.tenPhong],
                ['Tình trạng thuê', this.isRented('room', room.idPhong) ? 'Đang cho thuê' : 'Đang trống'],
                ['Giá điện', `${rate(0)} / kWh`],
                ['Giá nước', `${rate(1)} / m³`],
                ['Phí mạng', `${rate(2)} / tháng`]
            ])}`;
        detail.querySelector('[data-change-room]').addEventListener('click', () =>
        {
            this.selectedRoomId = '';
            this.renderRoomDetail();
        });
    },
    selectCustomer: function(id)
    {
        this.selectedCustomerId = String(id);
        this.renderCustomerDetail();
    },
    selectRoom: function(id)
    {
        this.selectedRoomId = String(id);
        this.renderRoomDetail();
    },
    validateDates: function()
    {
        const start = $('#chuNha_hopDong_start_date').value;
        const end = $('#chuNha_hopDong_end_date').value;
        const message = start && end && end < start ? 'Ngày kết thúc phải từ ngày bắt đầu trở đi.' : '';
        $('#chuNha_hopDong_date_validation').textContent = message;
        $('#chuNha_hopDong_end_date').setCustomValidity(message);
        return !message;
    },
    show: function()
    {
        APP.view.ui.showTab('chuNha', 'quanLyHopDong', 'list');
    }
};APP.features.chuNha.quanLyHopDong = APP.features.chuNha.quanLyHopDong || {};
APP.features.chuNha.quanLyHopDong.list = APP.features.chuNha.quanLyHopDong.list || {};
//STT, Khu nhà, phòng, khách thuê/chưa thuê
APP.features.chuNha.quanLyHopDong.list.uiLegacy =
{
    expandedIndex: -1,
    fields: [
        ['idHopDong', 'Mã hợp đồng'],
        ['khuNha_idKhuNha', 'Mã khu nhà'],
        ['khuNha_tenKhuNha', 'Khu nhà'],
        ['khuNha_diaChi', 'Địa chỉ khu nhà'],
        ['phong_idPhong', 'Mã phòng'],
        ['phong_tenPhong', 'Phòng'],
        ['phong_dienTich', 'Diện tích phòng'],
        ['phong_moTaPhong', 'Mô tả phòng'],
        ['khachHang_idKhachHang', 'Mã khách hàng'],
        ['khachHang_hoVaTen', 'Khách thuê'],
        ['khachHang_dienThoai', 'Điện thoại'],
        ['khachHang_soCCCD', 'Số CCCD'],
        ['khachHang_diaChi', 'Địa chỉ khách hàng'],
        ['idMauHopDong', 'Mã mẫu hợp đồng'],
        ['soHopDong', 'Số hợp đồng'],
        ['ngayLap', 'Ngày lập'],
        ['thangLap', 'Tháng lập'],
        ['namLap', 'Năm lập'],
        ['ngayBatDau', 'Ngày bắt đầu'],
        ['thangBatDau', 'Tháng bắt đầu'],
        ['namBatDau', 'Năm bắt đầu'],
        ['ngayKetThuc', 'Ngày kết thúc'],
        ['thangKetThuc', 'Tháng kết thúc'],
        ['namKetThuc', 'Năm kết thúc'],
        ['tienPhong', 'Tiền phòng'],
        ['tienCoc', 'Tiền cọc'],
        ['chuKyThanhToan', 'Chu kỳ thanh toán'],
        ['ngayThanhToan', 'Ngày thanh toán'],
        ['trangThai', 'Trạng thái'],
        ['fileKhachHangKy', 'File khách hàng ký'],
        ['fileChuNhaKy', 'File chủ nhà ký'],
        ['tepBanCuoi', 'Tệp bản cuối'],
        ['ngayKhachTai', 'Ngày khách tải'],
        ['ngayPheDuyet', 'Ngày phê duyệt'],
        ['ngayChuNhaKy', 'Ngày chủ nhà ký'],
        ['thangChuNhaKy', 'Tháng chủ nhà ký'],
        ['namChuNhaKy', 'Năm chủ nhà ký'],
        ['nguoiPheDuyet', 'Người phê duyệt'],
        ['ghiChu', 'Ghi chú']
    ],
    init: function()
    {
        const tabHeader = document.createElement('div');
        tabHeader.className = 'tab__header';
        tabHeader.innerHTML = `
            <span class="card__caption">Phòng cho thuê</span>
            <div class="form__field_01">
                <label for="chuNha_quanLyHopDong_search">Tìm hợp đồng</label>
                <input id="chuNha_quanLyHopDong_search" type="search" oninput="APP.features.chuNha.quanLyHopDong.list.ui.filter()">
            </div>
            <div class="form__field_01">
                <label for="chuNha_quanLyHopDong_status">Trạng thái</label>
                <select id="chuNha_quanLyHopDong_status" onchange="APP.features.chuNha.quanLyHopDong.list.ui.filter()">
                    <option value="">Tất cả trạng thái</option>
                </select>
            </div>
            <span id="chuNha_quanLyHopDong_count"></span>`;
        APP.view.ui.addTab('chuNha', 'quanLyHopDong', 'list', tabHeader);

        const main = document.createElement('div');
        main.id = 'chuNha_quanLyHopDong_list_main';
        main.className = 'tab__main';
        APP.view.ui.addElementToTab('chuNha', 'quanLyHopDong', 'list', main);
        this.render();
    },
    getData: function()
    {
        const cache = APP.cache.danhSachHopDong;
        if (Array.isArray(cache)) return cache;
        return cache && Array.isArray(cache.data) ? cache.data : [];
    },
    render: function()
    {
        const data = this.getData();
        const select = $('#chuNha_quanLyHopDong_status');
        if (select)
        {
            const selected = select.value;
            const statuses = [...new Set(data.map(function(row)
            {
                return String(row.trangThai || '').trim();
            }).filter(Boolean))].sort(function(a, b)
            {
                return a.localeCompare(b, 'vi');
            });
            select.innerHTML = '<option value="">Tất cả trạng thái</option>' + statuses.map(function(status)
            {
                return `<option value="${escapeHtml(status)}">${escapeHtml(status)}</option>`;
            }).join('');
            select.value = statuses.includes(selected) ? selected : '';
        }
        this.filter();
    },
    filter: function()
    {
        const main = $('#chuNha_quanLyHopDong_list_main');
        if (!main) return;

        const search = String($('#chuNha_quanLyHopDong_search')?.value || '').trim().toLocaleLowerCase('vi');
        const status = String($('#chuNha_quanLyHopDong_status')?.value || '');
        const data = this.getData().map(function(record, index)
        {
            return {record: record, index: index};
        }).filter(function(item)
        {
            const matchesStatus = !status || String(item.record.trangThai || '') === status;
            const matchesSearch = !search || Object.values(item.record).some(function(value)
            {
                return String(value ?? '').toLocaleLowerCase('vi').includes(search);
            });
            return matchesStatus && matchesSearch;
        });

        const count = $('#chuNha_quanLyHopDong_count');
        if (count) count.textContent = `${data.length} / ${this.getData().length} hợp đồng`;
        if (!data.length)
        {
            main.innerHTML = '<p>Chưa có hợp đồng phù hợp.</p>';
            return;
        }

        main.innerHTML = `
            <table class="table_01" id="chuNha_danhSachHopDong_table">
                <thead class="table_01__header">
                    <tr>
                        <th>Số hợp đồng</th>
                        <th>Khách thuê</th>
                        <th>Điện thoại</th>
                        <th>Khu nhà / Phòng</th>
                        <th>Thời hạn thuê</th>
                        <th>Tiền phòng</th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>${data.map((item) => this.renderRow(item)).join('')}</tbody>
            </table>`;
    },
    renderRow: function(item)
    {
        const row = item.record;
        const index = item.index;
        const expanded = this.expandedIndex === index;
        const startDate = [row.ngayBatDau, row.thangBatDau, row.namBatDau].filter(Boolean).join('/');
        const endDate = [row.ngayKetThuc, row.thangKetThuc, row.namKetThuc].filter(Boolean).join('/');
        const dates = [startDate, endDate].filter(Boolean).join(' - ') || '-';
        const mainRow = `
            <tr class="table_01__row">
                <td>${escapeHtml(row.soHopDong || row.idHopDong || '')}</td>
                <td>${escapeHtml(row.khachHang_hoVaTen || '')}</td>
                <td>${escapeHtml(row.khachHang_dienThoai || '')}</td>
                <td>${escapeHtml([row.khuNha_tenKhuNha, row.phong_tenPhong].filter(Boolean).join(' / '))}</td>
                <td>${escapeHtml(dates)}</td>
                <td>${formatMoney(row.tienPhong)}</td>
                <td>${escapeHtml(row.trangThai || '')}</td>
                <td><button type="button" class="button_01" onclick="APP.features.chuNha.quanLyHopDong.list.ui.toggleDetails(${index})">${expanded ? 'Ẩn' : 'Chi tiết'}</button></td>
            </tr>`;
        if (!expanded) return mainRow;

        const details = this.fields.map(function(field)
        {
            return `<div><dt>${escapeHtml(field[1])}</dt><dd>${escapeHtml(row[field[0]] ?? '') || '-'}</dd></div>`;
        }).join('');
        return mainRow + `<tr class="table_01__row"><td colspan="8"><dl>${details}</dl></td></tr>`;
    },
    toggleDetails: function(index)
    {
        this.expandedIndex = this.expandedIndex === index ? -1 : index;
        this.filter();
    },
    show: function()
    {
        APP.view.ui.showTab('chuNha', 'quanLyHopDong', 'list');
    }
};