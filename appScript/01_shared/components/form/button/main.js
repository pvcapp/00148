const button = ({
    type = 'button_01',
    id = '',
    iconSrc = '',
    text = '',
    onclick = null,
    onColor = false
} = {}) =>
{
    switch (type)
    {
        case 'button_01':
            return button_01({
                id,
                iconSrc,
                text,
                onclick,
                onColor
            });

        case 'button_02':
            return button_02({
                id,
                iconSrc,
                text,
                onclick,
                onColor
            });
        case 'onlyIconButton':
        case 'onlyIconButton_01':
            return onlyIconButton_01({
                id,
                iconSrc,
                onclick
            });

        default:
            return button_01({
                id,
                iconSrc,
                text,
                onclick,
                onColor
            });
    }
};