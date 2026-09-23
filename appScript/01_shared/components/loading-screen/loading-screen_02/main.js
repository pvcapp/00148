
const loadingScreen_02 = (id = '') => 
{
    const container = document.createElement('div');
    if (id !== '') container.id = id;
    container.className = 'loading-screen_02';
    container.innerHTML = `
        <div class="loading-screen_02-content">
            <div class="loading-screen_02-spinner">
                <div class="loading-screen_02-house"></div>
            </div>
            <h2 class="loading-screen_02-title">
                Vui lòng chờ
            </h2>
            <p class="loading-screen_02-message">
                Dữ liệu của bạn đang được tải lên
            </p>
        </div>
    `;
    return container;
}