const loadingText = ({id = '', text = '', type='loadingText_01'} = {}) => 
{
    if (text == '') text = 'Đang xử lý';
    switch (type)
    {
        case 'loadingText_01':
            return loadingText_01({id: id, text: text});
        default:
            return loadingText_01({id: id, text: text});
    };
}
