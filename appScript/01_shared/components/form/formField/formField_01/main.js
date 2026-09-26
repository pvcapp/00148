const formField_01 = ({ type = 'text',
    id='', value = '', placeholder = '', 
    caption = '', 
    required = false, readonly = false, hidden = false, 
    inputmode = '', maxlength = '', selectOptions = []})  =>
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
                    ip = `<input type="${type}" id="${id}" value="${value}" placeholder="${placeholder}" 
                        ${required ? 'required' : ''} ${readonly ? 'readonly' : ''} 
                        ${inputmode ? `inputmode="${inputmode}"` : `${type == 'number' || type == 'tel' ? ` inputmode="numeric"` : ""}`} 
                        ${maxlength ? `maxlength="${maxlength}"` : ''}>`;
                    break; 
                case 'textarea':
                    ip = `<textarea id="${id}" placeholder="${placeholder}" 
                        ${required ? 'required' : ''}>${value}</textarea>`; 
                    break; 
                case 'hidden':
                    ip = `<input type="hidden" id="${id}" value="${value}">`;
                    break;
                case 'dd/mm/yyyy':
                    ip = `<input type="text" id="${id}" value="${value}" placeholder="${placeholder}"
                        onclick="PVC_Fns_CN(this.id,'dd/mm/yyyy','${caption ? `Chọn ${caption}` : 'Chọn ngày tháng'}');">`;
                    break;
                case 'date':
                case 'month':
                    ip = `<input type="number" id="${id}" value="${value}" placeholder="${placeholder}"
                        style="width: 80px;" maxlength="2" inputmode="numeric">`;
                    break;
                case 'year':
                    ip = `<input type="number" id="${id}" value="${value}" placeholder="${placeholder}"
                        style="width: 160px;" maxlength="4" inputmode="numeric">`;
                    break;
                case 'select':
                    ip = `<select id="${id}" value="${value}">`;
                        if (selectOptions)
                        {
                            selectOptions.forEach(op =>function()
                            {
                                ip += `<option value="${op.value}">${op.text}</option>`;
                            });
                        }
                    ip += `</select>`;
                    break;
                default:
                    ip = `<input type="text" id="${id}" value="${value}" placeholder="${placeholder}">`; 
            };
    container.innerHTML = cap + ip;         
    return container; 
}