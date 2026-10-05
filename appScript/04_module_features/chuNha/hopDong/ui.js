APP.features.chuNha.quanLyHopDong = APP.features.chuNha.quanLyHopDong || {};
APP.features.chuNha.quanLyHopDong.list = APP.features.chuNha.quanLyHopDong.list || {};
APP.features.chuNha.quanLyHopDong.list.ui =
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