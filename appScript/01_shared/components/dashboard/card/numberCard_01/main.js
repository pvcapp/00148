const numberCard_01 = ({caption, subCaption, value}) =>
{
    /*
        CAPTION
        subcaption
        NUMBER
    */
    const card = document.createElement('div');
    card.className = 'card';
        const captionDiv = document.createElement('div');
        captionDiv.className = 'numberCard_01__caption';
        captionDiv.innerHTML = caption;
    card.appendChild(captionDiv);

        if (subCaption !=='')
        {
            const subCaptionDiv = document.createElement('div');
            subCaptionDiv.className = 'numberCard_01__sub-caption';
            subCaptionDiv.innerHTML = subCaption;
            card.appendChild(subCaptionDiv);
        }

        const numberDiv = document.createElement('div');
        numberDiv.className = 'card__content';
            const numberSpan = document.createElement('div');
            numberSpan.className = 'numberCard_01__number';
            numberSpan.innerHTML = value;
        numberDiv.appendChild(numberSpan);
    card.appendChild(numberDiv);
    return card;
}