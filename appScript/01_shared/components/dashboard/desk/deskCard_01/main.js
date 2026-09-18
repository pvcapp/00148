const deskCard_01 = ({caption, subCaption, detail, actionBar}) =>   //data: {caption: '', subCaption: '', detail: '', actionBar: ''}
{
    let card = document.createElement('div');
    card.className = 'desk__card_01';
    
    let caption = document.createElement('div');
    caption.className = 'desk__card_01__caption';
    caption.innerText = data.caption || '';
    card.appendChild(caption);

    let subCaption = document.createElement('div');
    subCaption.className = 'desk__card_01__sub-caption';
    subCaption.innerText = data.subCaption || '';
    card.appendChild(subCaption);

    let detail = document.createElement('div');
    detail.className = 'desk__card_01__detail';
    detail.innerHTML = data.detail || '';
    card.appendChild(detail);

    let actionBar = document.createElement('div');
    actionBar.className = 'desk__card_01__action-bar';
    actionBar.innerHTML = data.actionBar || '';
    card.appendChild(actionBar);

    return card;
}