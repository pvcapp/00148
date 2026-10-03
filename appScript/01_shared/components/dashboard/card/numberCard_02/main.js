const numberCard_02 = ({caption, subCaption, value, loaded}) =>
{
    /*
        CAPTION
        subcaption
        Loading Image/NUMBER
    */
    const card = document.createElement('div');
    card.className = 'card';
        const captionDiv = document.createElement('div');
        captionDiv.className = 'numberCard_02__caption';
        captionDiv.innerHTML = caption;
    card.appendChild(captionDiv);

        if (subCaption !=='')
        {
            const subCaptionDiv = document.createElement('div');
            subCaptionDiv.className = 'numberCard_02__sub-caption';
            subCaptionDiv.innerHTML = subCaption;
            card.appendChild(subCaptionDiv);
        }

        const numberDiv = document.createElement('div');
        numberDiv.className = 'card__content';
            const numberSpan = document.createElement('div');
            if (loaded === false)
            {
                numberSpan.appendChild(loadingText_02({text: 'Đang tải..'}));
            }
            else
            {
                numberSpan.className = 'numberCard_02__number';
                numberSpan.innerHTML = value;
            }
        numberDiv.appendChild(numberSpan);
    card.appendChild(numberDiv);
    return card;
}