const formField_01 = ({ type = 'text',
    id='', value = '', placeholder = '', 
    caption = '', 
    required = false, readonly = false, hidden = false, 
    inputmode = '', maxlength = '' })  =>
{ 
    let className = 'form__field_01'; 
        if (hidden) className += ' hide';
    const container = div({className: className});
        let cap = ``;
            if (caption !== '') cap = `<label for="${id}">${caption}</label>`;
        let ip = ``;
            switch (type) 
            { 
                case 'text': 
                case 'number': 
                case 'email':
                case 'tel':
                    ip = `<input type="${type}" id="${id}" value="${value}" placeholder="${placeholder}" ${required ? 'required' : ''} ${readonly ? 'readonly' : ''} ${inputmode ? `inputmode="${inputmode}"` : ''} ${maxlength ? `maxlength="${maxlength}"` : ''}>`; 
                    break; 
                case 'textarea':
                    ip = `<textarea id="${id}" placeholder="${placeholder}" ${required ? 'required' : ''}>${value}</textarea>`; 
                    break; 
                case 'hidden':
                    ip = `<input type="hidden" id="${id}" value="${value}">`;
                    break;
                default:
                    ip = `<input type="text" id="${id}" value="${value}" placeholder="${placeholder}">`; 
            };
    container.innerHTML = cap + ip;         
    return container; 
}