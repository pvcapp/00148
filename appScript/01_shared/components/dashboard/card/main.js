const card = ({data , type = 'detailCard_01'}) =>
{
    switch(type)
    {
        case 'detailCard_01':
            return detailCard_01(data);
        case 'numberCard_01':
            return numberCard_01(data);
        default:
            return JSON.stringify(data);
    }
}

const card_container = (data, id ='') =>  //data: [{data: {}, type: 'detailCard_01'}, {data: {}, type: 'numberCard_01'}]
{
    let container = document.createElement('div');
    container.className = 'card__container';
    if (id) container.id = id;
    data.forEach((cardData) => {
        let cardElement = card(cardData);
        container.appendChild(cardElement);
    });
    return container;    
}