const formField_01 = ({ type = 'text',
    id='', value = '', placeholder = '', 
    caption = '', 
    required = false, readonly = false, hidden = false, 
    inputmode = '', maxlength = '' })  =>
{ 
    let className = 'form__field_01'; 
    if (hidden) className += ' hide'; 
    let rdHTML = `<div class="${className}">`; 
    if (caption !== '') rdHTML += `<label for="${id}">${caption}</label>`; 
    switch (type) 
    { 
        case 'text': 
        case 'number': 
        case 'email':
        case 'tel': 
            rdHTML += `<input type="${type}" id="${id}" value="${value}" placeholder="${placeholder}" ${required ? 'required' : ''} ${readonly ? 'readonly' : ''} ${inputmode ? `inputmode="${inputmode}"` : ''} ${maxlength ? `maxlength="${maxlength}"` : ''}>`; 
            break; 
        case 'textarea': 
            rdHTML += `<textarea id="${id}" placeholder="${placeholder}" ${required ? 'required' : ''}>${value}</textarea>`; 
            break; 
        case 'hidden': 
            return `<input type="hidden" id="${id}" value="${value}">`; 
        default: 
            rdHTML += `<input type="text" id="${id}" value="${value}" placeholder="${placeholder}">`; 
    } 
    rdHTML += '</div>';            
    return rdHTML; 
}