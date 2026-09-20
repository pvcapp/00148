const numberCard_01 = ({caption, subCaption, value}) =>
{
    const card = document.createElement('div');
    card.className = 'card';
        const captionDiv = document.createElement('div');
        captionDiv.className = 'card__sub-caption';
        captionDiv.innerHTML = caption;
    card.appendChild(captionDiv);

        if (subCaption !=='')
        {
            const subCaptionDiv = document.createElement('div');
            subCaptionDiv.className = 'card__caption';
            subCaptionDiv.innerHTML = subCaption;
            card.appendChild(subCaptionDiv);
        }

        const numberDiv = document.createElement('div');
        numberDiv.className = 'card__content';
            const numberSpan = document.createElement('div');
            numberSpan.className = 'number-card__value';
            numberSpan.innerHTML = value;
        numberDiv.appendChild(numberSpan);
    card.appendChild(numberDiv);
    return card;
}