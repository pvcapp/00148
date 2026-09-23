const onlyIconButton_01 = ({
                id = '',
                iconSrc = '',
                onclick = null
            }) =>
{
    const icon = document.createElement('img');
    if (id !== '') icon.id = id;
    icon.src = iconSrc;
    icon.className = 'onlyIconButton_01';
    if (onclick) icon.onclick = onclick;
    return icon;
};