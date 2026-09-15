const $ = (selector) =>
{
    if (selector.startsWith('#'))
    {
        return document.getElementById(selector.slice(1));
    }
    return document.querySelector(selector);
}

const hide = (id) => 
{
    let el = $('#' + id);
    if (!el)
    {
        alert('Hàm hide: không tìm thấy element id: ' + id); 
        return;
    }

    if (!el.dataset.display)
    {
        let dsp = getComputedStyle(el).display;
        if (dsp !== "none"){el.dataset.display = dsp;}
    }
    el.style.display = 'none';
}



const show = (id, stl = "block") =>
{
    let el = $('#' + id);
    if (!el)
    {
        alert('Hàm show: không tìm thấy element id: ' + id);
        return;
    }

    el.classList.remove('hide');

    if (el.dataset.display)
    {      
        if (el.dataset.display == "none")
        {
            el.style.display = stl;
        }
        else
        {
            el.style.display = el.dataset.display;
        }
    }
    else
    {
        el.style.display = stl;
    }
}

const toggle = (id) =>
{
    console.log('toggle ' + id);
    let el = $('#' + id);
    if (!el)
    {
        alert('Hàm toggle display: không tìm thấy element id: ' + id);
        return;
    }
    const isHidden = el.classList.contains('hide') || getComputedStyle(el).display === 'none';
    if (isHidden) 
    {
        show(id);    
    } 
    else 
    {
        hide(id);
    }
}


const div = ({id = '', className = '', text = '', html = '', parent = null, parentId = null,...attrs} = {}) =>
{    
    const el = document.createElement('div');
    if (id) el.id = id;
    if (className) el.className = className;
    if (text) el.innerText = text;
    if (html) el.innerHTML = html;

    for (const [key, value] of Object.entries(attrs)) 
    {
        if (value == null) continue;
        if (key.startsWith('on') && typeof value === 'function') 
        {
            const eventName = key.substring(2);
            el.addEventListener(eventName, event => {
                if (eventName === 'keydown' || eventName === 'keyup' || eventName === 'keypress' ||
                    eventName === 'wheel' || 
                    eventName === 'dragstart' || eventName === 'dragover' || eventName === 'drop'
                ) 
                {
                    value(event, event.currentTarget);
                }
                else {
                    value(event.currentTarget);
                }
            });

        }
        else 
        {
            el.setAttribute(key, value);
        }
    }

    if (parent) parent.appendChild(el);
    if (parentId) $('#' + parentId).appendChild(el);
    return el;

    /* Example:
        div({
            id: 'input_123',
            onkeydown: (event, el) => {
                if (event.key === 'Enter') xuLy(el.id);
            },
            onclick: el => {
                khachHang_edit(el.id);
            }
        }); 
    */
}

    
