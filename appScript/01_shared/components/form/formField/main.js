const formField = ({ style= 'formField_01', type = 'text',
    id='', value = '', placeholder = '', 
    caption = '', 
    required = false, readonly = false, hidden = false, 
    inputmode = '', maxlength = '' } = {}) =>
{
    switch (style)
    {
        case 'formField_01':
            return formField_01({ type,
            id, value, placeholder, 
            caption, 
            required, readonly, hidden, 
            inputmode, maxlength});
        default:
            return formField_01({ type,
            id, value, placeholder, 
            caption, 
            required, readonly, hidden, 
            inputmode, maxlength});
    };
};