function canhBao_render()
{
    let container = document.createElement('div');
    container.className = 'thong-bao-popup__container';
    container.id = 'canhBaoPopup';
    container.innerHTML = 
        `<div class="thong-bao-popup__div-noi-dung">
            <div class="thong-bao-popup__div-noi-dung__caption">
                <img src="https://pvcapp.github.io/00148/appScript/img/infor.svg" style="height:15px;">      
                <div id="canhBaoPopup_caption" style="color:white;">
                Cập nhật thông tin ...
                </div>
            </div>
            <div id="canhBaoPopup_noiDungThongBao" class="thong-bao-popup__div-noi-dung__noi-dung-thong-bao">
                NỘI DUNG THÔNG BÁO
            </div>
            
            
            <div style="display:flex;justify-content:right;gap:0.7rem;padding:2px 8px 8px 0px;">      
                <div class="thong-bao-popup__button" id="canhBaoPopup_buttonOk"
                style="font-weight:bold;width:100px;">
                    Ok
                </div>  
                <div class="thong-bao-popup__button" id="canhBaoPopup_buttonCancel"
                style="color:var(--brand-text-secondary);width:100px;">
                    Bỏ qua
                </div>
                
                <div class="thong-bao-popup__button" id="canhBaoPopup_buttonOkOnly"
                style="width:100px;display:none">
                    Ok
                </div>  
            </div>  
        </div>`;
        return container;
}

document.appendChild(canhBao_render());

function canhBao(noiDung, caption="Thông báo", hinhThucXacThuc ="ok")
{
    //hình thức xác thực: "ok", "okCancel"
    return new Promise(resolve => {
        $('#canhBaoPopup_noiDungThongBao').innerHTML = noiDung;
        if (hinhThucXacThuc == "ok")
        {        
            $('#canhBaoPopup_buttonOk').style.display = "none";
            $('#canhBaoPopup_buttonCancel').style.display = "none";
            $('#canhBaoPopup_buttonOkOnly').style.display = "block";
        }
        else
        {
            $('#canhBaoPopup_buttonOk').style.display = "block";
            $('#canhBaoPopup_buttonCancel').style.display = "block";
            $('#canhBaoPopup_buttonOkOnly').style.display = "none";
        }
        $('#canhBaoPopup').style.display = "grid";

        function onOk()
        {
            cleanup();
            resolve(true);
        }

        function onCancel()
        {
            cleanup();
            resolve(false);
        }

        function cleanup()
        {
            $('#canhBaoPopup').style.display = "none";
            $('#canhBaoPopup_buttonCancel').removeEventListener('click',onCancel);
            $('#canhBaoPopup_buttonOk').removeEventListener('click',onOk);
            $('#canhBaoPopup_buttonOkOnly').removeEventListener('click',onOk);
        }

        $('#canhBaoPopup_buttonCancel').addEventListener('click',onCancel);
        $('#canhBaoPopup_buttonOk').addEventListener('click',onOk);
        $('#canhBaoPopup_buttonOkOnly').addEventListener('click',onOk); 
    });       
}


