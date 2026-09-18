const numberCard_01 = ({caption, subCaption, value}) =>
{
    return `
        <div class="card">
            <h1 class="card__caption">${caption}</h1>
            <p class="card__sub-caption">${subCaption}</p>
            <div class="card__content">
                <p class="number-card__value">${value}</p>
            </div>
        </div>
    `;
}