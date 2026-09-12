function totalCard_render(tieuDe, so) 
{
    return `
        <div class="card">
        <div class="text-sub">${escapeHtml(tieuDe)}</div>
        <div class="card__number">${escapeHtml(String(so))}</div>
        </div>
    `;
}


//Table: các cột, các cột hiển thị, sort, ...
//captionList: [{name: 'stt', show: 1, displayAs: 'STT'}, {name: 'hoVaTen', show: 1, displayAs: 'Họ và tên'}]
function renderView_card(viewId, viewCaption, 
    data = {captionList: [], data:[]}, sort = {column: '', direction: 'ASC'}, 
    header = {primaryColumn: '', secondaryColumn: '', sumaryColumn: ''})
{
    
}