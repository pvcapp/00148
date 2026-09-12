function form_renderField({type = 'text', id, value = '', placeholder = '', caption = ''})
{
    let rdHTML = '<div class="form__field">';
        if (caption !== '') 
        {
            rdHTML += <label>${caption}</label>;
        }

        switch (type)
        {
            case 'text':
            case 'number':
                rdHTML += `<input type="${type}" id="${id}" value="${value}" placeholder="${placeholder}">`;
                break;
            case 'textarea':
                rdHTML += `<textarea id="${id}" placeholder="${placeholder}">${value}</textarea>`;
                break;
            default:
                rdHTML += `<input type="text" id="${id}" value="${value}" placeholder="${placeholder}">`;

        }
    rdHTML += '</div>';
    return rdHTML;
}