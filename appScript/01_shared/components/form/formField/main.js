const formField = ({ style= 'formField_01', type = 'text',
    id='', value = '', placeholder = '', 
    caption = '', 
    required = false, readonly = false, hidden = false, 
    inputmode = '', maxlength = '', options = {} } = {}) =>
{
    switch (style)
    {
        case 'formField_01':
            return formField_01({ type,
            id, value, placeholder, 
            caption, 
            required, readonly, hidden, 
            inputmode, maxlength, options});
        default:
            return formField_01({ type,
            id, value, placeholder, 
            caption, 
            required, readonly, hidden, 
            inputmode, maxlength, options});
    };
};