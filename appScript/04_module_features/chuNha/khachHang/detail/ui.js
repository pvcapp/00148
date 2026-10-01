APP.features.chuNha.quanLyKhachHang.detail.ui = 
{        
    style: 'detail_01',
    init: function()
    {
        const tabHeader = document.createElement('div');
        tabHeader.className = 'tab__header';
        tabHeader.innerHTML = `
            <div style="display:flex; flex-wrap:nowrap; align-items:center;">
                <div id="chuNha_quanLyKhachHang_detail_caption"
                    class="card__caption hide-on-mobile" style="width:200px;">
                    Thông tin khách hàng
                </div>
            </div>`;

        APP.view.ui.addTab('chuNha','quanLyKhachHang','detail',tabHeader);

        const tabMain = document.createElement('div');
        tabMain.id = 'chuNha_quanLyKhachHang_detail_main';        
        tabMain.className = 'tab__main';

        const cardThongTinCoBan = div({
            className: 'card',
            parent: tabMain,
            style: `
                max-width:650px;
                padding:var(--padding-xl);
                display:flex;
                gap:12px;
                flex-direction:column;
            `
        });

        cardThongTinCoBan.innerHTML = `
            <div class="card__caption">
                Thông tin cơ bản
            </div>

            <div class="detail__row" style="display:flex; flex-wrap:wrap; align-items:baseline; gap:4px;">
                <div class="detail__label">Họ và tên: </div>
                <div id="formKhachHang_detail_hoVaTen" class="detail__value"></div>
            </div>

            <div class="detail__row" style="display:flex; flex-wrap:wrap; align-items:baseline; gap:4px;">
                <div class="detail__label">Số điện thoại: </div>
                <div id="formKhachHang_detail_dienThoai" class="detail__value"></div>
            </div>

            <div class="detail__row" style="display:flex; flex-wrap:wrap; align-items:baseline; gap:4px;">
                <div class="detail__label">Số CCCD: </div>
                <div id="formKhachHang_detail_soCCCD" class="detail__value"></div>
            </div>

            <div class="detail__row" style="display:flex; flex-wrap:wrap; align-items:baseline; gap:4px;">
                <div class="detail__label">Giới tính: </div>
                <div id="formKhachHang_detail_gioiTinh" class="detail__value"></div>
            </div>

            <div class="detail__row" style="display:flex; flex-wrap:wrap; align-items:baseline; gap:4px;">
                <div class="detail__label">Ngày sinh: </div>
                <div id="formKhachHang_detail_ngaySinh" class="detail__value"></div>
            </div>
        `;

        const cardLienHe = div({
            className: 'card',
            parent: tabMain,
            style: `
                max-width:650px;
                padding:var(--padding-xl);
                display:flex;
                gap:12px;
                flex-direction:column;
            `
        });

        cardLienHe.innerHTML = `
            <div class="card__caption">
                Thông tin liên hệ
            </div>

            <div class="detail__row" style="display:flex; flex-wrap:wrap; align-items:baseline; gap:4px;">
                <div class="detail__label">Email: </div>
                <div id="formKhachHang_detail_email" class="detail__value"></div>
            </div>

            <div class="detail__row" style="display:flex; flex-wrap:wrap; align-items:baseline; gap:4px;">
                <div class="detail__label">Địa chỉ thường trú: </div>
                <div id="formKhachHang_detail_diaChiThuongTru" class="detail__value"></div>
            </div>

            <div class="detail__row" style="display:flex; flex-wrap:wrap; align-items:baseline; gap:4px;">
                <div class="detail__label">Nghề nghiệp: </div>
                <div id="formKhachHang_detail_ngheNghiep" class="detail__value"></div>
            </div>
        `;


        const cardGiayTo = div({
            className: 'card',
            parent: tabMain,
            style: `
                max-width:650px;
                padding:var(--padding-xl);
                display: none;
                gap:16px;
                flex-direction:column;
            `
        });

        cardGiayTo.innerHTML = `
            <div class="card__caption">
                Hình ảnh / giấy tờ
            </div>

            <div class="detail__imageGroup">

                <div class="detail__imageItem">
                    <div class="detail__label">
                        Ảnh khách hàng
                    </div>

                    <img
                        id="formKhachHang_input_anhKhach"
                        class="detail__image"
                    >
                </div>

                <div class="detail__imageItem">
                    <div class="detail__label">
                        CCCD mặt trước
                    </div>

                    <img
                        id="formKhachHang_input_anhCCCDMatTruoc"
                        class="detail__image"
                    >
                </div>

                <div class="detail__imageItem">
                    <div class="detail__label">
                        CCCD mặt sau
                    </div>

                    <img
                        id="formKhachHang_input_anhCCCDMatSau"
                        class="detail__image"
                    >
                </div>

            </div>
        `;


        const cardThongTinKhac = div({
            className: 'card',
            parent: tabMain,
            style: `
                max-width:650px;
                padding:var(--padding-xl);
                display:flex;
                gap:12px;
                flex-direction:column;
            `
        });

        cardThongTinKhac.innerHTML = `
            <div class="card__caption">
                Thông tin khác
            </div>

            <div class="detail__row" style="display:flex; flex-wrap:wrap; align-items:baseline; gap:4px;">
                <div class="detail__label">Xác minh</div>
                <div id="formKhachHang_detail_xacMinh" class="detail__value"></div>
            </div>

            <div class="detail__row" style="display:flex; flex-wrap:wrap; align-items:baseline; gap:4px;">
                <div class="detail__label">Trạng thái</div>
                <div id="formKhachHang_detail_active" class="detail__value"></div>
            </div>

            <div class="detail__row" style="display:flex; flex-wrap:wrap; align-items:baseline; gap:4px;">
                <div class="detail__label">Ghi chú</div>
                <div id="formKhachHang_detail_ghiChu" class="detail__value"></div>
            </div>
        `;


        const footer = div({
            className: 'form__footer',
            parent: tabMain
        });

        footer.appendChild(
            button({
                id: 'chuNha_khachHang_editButton',
                text: 'Chỉnh sửa',
                onclick: () => APP.features.chuNha.quanLyKhachHang.detail.control.edit()
            })
        );

        footer.appendChild(
            button({
                text: 'Quay lại',
                onclick: () => APP.view.ui.showTab('chuNha','quanLyKhachHang','list')
            })
        );

        APP.view.ui.addElementToTab('chuNha','quanLyKhachHang','detail',tabMain);
        APP.features.chuNha.quanLyKhachHang.detail.xacMinh.ui.init();
    },
    render: function()
    {
        const idKhachHang = APP.features.chuNha.quanLyKhachHang.detail.idKhachHang;
        const khachHang = (APP.cache.danhSachKhachHang.data || []).find(function(khach)
        {
            return String(khach.idKhachHang) === String(idKhachHang);
        });

        if (!khachHang)
        {
            toast('Không tìm thấy khách hàng');
            return;
        }

        $('#formKhachHang_detail_hoVaTen').textContent = khachHang.hoVaTen || '';
        $('#formKhachHang_detail_dienThoai').textContent = khachHang.dienThoai || '';
        $('#formKhachHang_detail_soCCCD').textContent = khachHang.soCCCD || '';
        $('#formKhachHang_detail_gioiTinh').textContent = khachHang.gioiTinh || '';
        $('#formKhachHang_detail_ngaySinh').textContent = [
            khachHang.ngaySinh,
            khachHang.thangSinh,
            khachHang.namSinh
        ].filter(function(value)
        {
            return value !== undefined && value !== null && value !== '';
        }).join('/');

        $('#formKhachHang_detail_email').textContent = khachHang.email || '';
        $('#formKhachHang_detail_diaChiThuongTru').textContent = khachHang.diaChiThuongTru || '';
        $('#formKhachHang_detail_ngheNghiep').textContent = khachHang.ngheNghiep || '';
        $('#formKhachHang_detail_xacMinh').textContent = khachHang.xacMinh || '';
        $('#formKhachHang_detail_active').textContent = khachHang.active || '';
        $('#formKhachHang_detail_ghiChu').textContent = khachHang.ghiChu || '';

        $('#formKhachHang_input_anhKhach').src = khachHang.anhKhach || '';
        $('#formKhachHang_input_anhCCCDMatTruoc').src = khachHang.anhCCCDMatTruoc || '';
        $('#formKhachHang_input_anhCCCDMatSau').src = khachHang.anhCCCDMatSau || '';
    }
};


/*
tabHeader.appendChild(button({
                type: 'iconOnlyButton',
                iconSrc: 'https://pvcapp.github.io/00148/img/recycle.svg',
                onclick: () => APP.chuNha.quanLyKhachHang.control.delete(APP.chuNha.quanLyKhachHang.form.idKhachHang, $('#formKhachHang_input_hoVaTen').value)
                }));
                */



APP.features.chuNha.quanLyKhachHang.detail.xacMinh.ui =
{
    init: function()
    {
        const popup = div({
            id: 'formKhachHang_xacMinhThongTin_popup',
            className: 'xac-minh-khach-hang__popup',
            parent: document.body
        });
        popup.classList.add('hide');
        popup.innerHTML = `
            <center>
                <div class="card" style="max-width: 400px;background: white;margin-top: 24px;;">
                    <div class="card__caption" id="formKhachHang_input_caption" style="grid-column:span 2;">
                        KHÁCH HÀNG ĐÃ GỬI YÊU CẦU CẬP NHẬT THÔNG TIN MỚI:
                    </div>
                    <div class="card" style="max-width:400px; padding:var(--padding-xl); display:flex; gap:12px; flex-direction:column;text-align: left;">
                        <div class="form__field" id="formKhachHang_xacMinhThongTin_hoVaTen">- Họ và tên: </div>
                        <div class="form__field" id="formKhachHang_xacMinhThongTin_dienThoai">- Điện thoại: </div>
                        <div class="form__field" id="formKhachHang_xacMinhThongTin_soCCCD">- Số CCCD: </div>
                        <div class="form__field" id="formKhachHang_xacMinhThongTin_ngayThangNamSinh">- Ngày sinh: </div>
                        <div class="form__field" id="formKhachHang_xacMinhThongTin_gioiTinh">- Giới tính: </div> 
                        <div class="form__field" id="formKhachHang_xacMinhThongTin_email">- Email: </div>
                        <div class="form__field" id="formKhachHang_xacMinhThongTin_diaChiThuongTru">- Địa chỉ: </div>
                        <div class="form__field" id="formKhachHang_xacMinhThongTin_ngheNghiep">- Nghề nghiệp: </div>
                        <!--
                        <div class="form__field" id="formKhachHang_xacMinhThongTin_anhKhach"></div>
                        <div class="form__field" id="formKhachHang_xacMinhThongTin_anhCCCDMatTruoc"></div>
                        <div class="form__field" id="formKhachHang_xacMinhThongTin_anhCCCDMatSau"></div>-->
                        <div class="form__field" id="formKhachHang_xacMinhThongTin_ghiChu">- Ghi chú: </div>               
                    </div>


                    <div class="form__footer" style="margin-top:12px;">                
                        <div id="chuNha_khachHang_updateButton" class="button"
                            onclick="APP.features.chuNha.quanLyKhachHang.detail.xacMinh.control.ok();">
                            Chấp nhận
                        </div>  

                        <div class="button" id="chuNha_khachHang_update_reset" 
                            onclick="APP.features.chuNha.quanLyKhachHang.detail.xacMinh.control.notOk();">
                            Không chấp nhận
                        </div>

                        <div class="button" 
                            onclick="APP.features.chuNha.quanLyKhachHang.detail.xacMinh.control.hide();">
                            Bỏ qua
                        </div>
                    </div>
                </div>
            </center>
        `;
    },
    render: function()
    {
        let idKhachHang = APP.features.chuNha.quanLyKhachHang.detail.idKhachHang;
        let phieuXacMinh = APP.cache.danhSachKhachHang_xacMinh.data.find(
            function(kh)
            {
                return kh.idKhachHang == idKhachHang;
            }
        );

        if (!phieuXacMinh)
        {
            canhBao('show Bảng thông tin xác minhh bị lỗi: không thấy phiếu');
            return;
        }                

        $('#formKhachHang_xacMinhThongTin_hoVaTen').innerText = 'Họ và tên: ' + phieuXacMinh.hoVaTen;
        $('#formKhachHang_xacMinhThongTin_dienThoai').innerText = 'Điện thoại: ' + phieuXacMinh.dienThoai;
        $('#formKhachHang_xacMinhThongTin_soCCCD').innerText = 'Số CCCD: ' + phieuXacMinh.soCCCD;
        $('#formKhachHang_xacMinhThongTin_ngayThangNamSinh').innerText = 'Ngày sinh: ' + phieuXacMinh.ngaySinh + '/' + phieuXacMinh.thangSinh + '/' + phieuXacMinh.namSinh;
        $('#formKhachHang_xacMinhThongTin_gioiTinh').innerText = 'Giới tính: ' + phieuXacMinh.gioiTinh; 
        $('#formKhachHang_xacMinhThongTin_email').innerText = 'Email: ' + phieuXacMinh.email;
        $('#formKhachHang_xacMinhThongTin_diaChiThuongTru').innerText = 'Địa chỉ: ' + phieuXacMinh.diaChiThuongTru;
        $('#formKhachHang_xacMinhThongTin_ngheNghiep').innerText = 'Nghề nghiệp: ' + phieuXacMinh.ngheNghiep;     
        $('#formKhachHang_xacMinhThongTin_ghiChu').innerText = 'Ghi chú: ' + phieuXacMinh.ghiChu;
    },
    show: function()
    {
        show('formKhachHang_xacMinhThongTin_popup');
    },
    hide: function()
    {
        hide('formKhachHang_xacMinhThongTin_popup');
    }
};