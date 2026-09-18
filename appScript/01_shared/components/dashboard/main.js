const column = (options = {}) =>
{
    return div({...options, className: `column ${options.className || ''}`.trim()});
}

const row = (options = {}) =>
{
    return div({...options, className: `row ${options.className || ''}`.trim()});
}


function totalCard_render(tieuDe, so) 
{
    return `
        <div class="card">
        <div class="text-sub">${escapeHtml(tieuDe)}</div>
        <div class="card__number">${escapeHtml(String(so))}</div>
        </div>
    `;
}
