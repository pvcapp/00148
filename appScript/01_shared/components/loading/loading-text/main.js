const loadingText = ({id = '', text = '', type='loadingText_01'} = {}) => 
{
    switch (type)
    {
        case 'loadingText_01':
            return loadingText_01({id: id, text: text});
        default:
            return loadingText_01({id: id, text: text});
    };
}
