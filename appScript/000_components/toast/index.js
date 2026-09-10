function toast_render()
{
    let container = document.createElement('div');
    container.id = 'toast';
    container.className = 'toast__container';

        let el = '<div style="position: relative;">';
        if (APP.showIcon)
        {
            el += '<image src="' + APP.publicUrl + '/img/favicon.png" style="position:absolute; top:-36px; left:-24px; height:36px;">';
        }
        el += `
                <div class="toast__noiDung" id="toast__noiDung">
                </div>
            </div>
        `;

    container.innerHTML = el;
    return container;
}

document.body.appendChild(toast_render());
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



