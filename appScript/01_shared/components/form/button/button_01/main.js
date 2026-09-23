const button_01 = ({
    id = '',
    iconSrc = '',
    text = '',
    onclick = null,
    onColor = false
} = {}) =>
{
    const button = document.createElement('div');
    button.className = 'button_01';

    if (onColor) button.classList.add('on-color-background');
    if (id !== '') button.id = id;

    if (iconSrc !== '')
    {
        const icon = document.createElement('img');
        icon.src = iconSrc;
        icon.className = 'button_01__icon';
        button.appendChild(icon);
    }

    if (text !== '')
    {
        const textElement = document.createElement('span');
        textElement.className = 'button_01__text';
        textElement.textContent = text;
        button.appendChild(textElement);
    }

    if (onclick) button.onclick = onclick;
    return button;
};



/*
    const button = button_01({
        id: 'btnThem',
        iconSrc: 'img/add.svg',
        text: 'Khách hàng mới',
        onColor: true
    });
*/
