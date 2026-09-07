function toast_render()
{
    let container = document.createElement('div');
    container.id = 'toast';
    container.className = 'toast__container';
    container.innerHTML = `
        <div style="position: relative;">
            <div class="toast__noiDung" id="toast__noiDung">    
            </div>
        </div>
    `;
    return container;
}

document.appendChild(toast_render());
document.getElementById('toast').addEventListener('click', function(){hideToast()});

var hideToastTimeout = setTimeout(function(){}, 0);
function toast(noiDung = "", thoiGian = 5000, status = 'infor')
{
    let t = $('#toast');
    t.className = 'toast__container';
    t.classList.add('toast-' + status);

    $('#toast__noiDung').innerHTML = noiDung;
    $('#toast').style.display = "block";
    clearTimeout(hideToastTimeout);
    hideToastTimeout = setTimeout
    (
        function()
        {
            t.style.display = "none";
        }, thoiGian
    );
}

function hideToast()
{
    clearTimeout(hideToastTimeout);
    $('#toast').style.display = "none";
}



