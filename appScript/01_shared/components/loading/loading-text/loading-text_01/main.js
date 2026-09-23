const loadingText_01 = ({id = '', text = 'Đang xử lý'} = {}) =>
{
    const div = document.createElement('div');
    if (id !== '') div.id = id;
    div.className = 'loading-text_01';
    div.innerHTML = 
        `<span class="loading-text_01__spinner"></span>
        <span>${text}</span>`;
    return div;
}