APP.features.chuNha.quanLyKhachHang.detail.ui = 
{        
    style: 'detail_01',
    init: function()
    {
        
        APP.features.chuNha.quanLyKhachHang.detail.xacMinh.ui.init();
    },
    render: function()
    {
        
    }
};




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
    }
};