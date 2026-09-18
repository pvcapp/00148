var detailCard_01_sampleData = {
    caption: 'Card',
    subCaption: 'Sub caption',
    content: ['Content goes here...', 'More content...']
};

const detailCard_01 = (data = detailCard_01_sampleData) =>
{
    let detailCard = document.createElement('div');
    detailCard.className = 'card';
    detailCard.innerHTML = `
        <h1 class="card__caption">${data.caption}</h1>
        <p class="card__sub-caption">${data.subCaption}</p>
    `;
    let content = document.createElement('div');
    content.className = 'card__content';
    
    data.content.forEach((item) => {
        let p = document.createElement('p');
        p.textContent = item;
        content.appendChild(p);
    });

    detailCard.appendChild(content);
    return detailCard;
}