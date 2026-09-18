const deskCard = (data, type = 'deskCard_01') => //data: {data: {}, type: 'deskCard_01'}
{
    switch(type)
    {
        case 'deskCard_01':
            return deskCard_01(data);
        default:
            return JSON.stringify(data);
    }
}

const desk_container = (data) => //data: [{data: {}, type: 'deskCard_01'}, {data: {}, type: 'deskCard_01'}]
{
    let desk = document.createElement('div');
    desk.className = 'desk__container';
    data.forEach((cardData) => {
        let cardElement = card(cardData);
        desk.appendChild(cardElement);
    });
    return desk;    
}