// 添加卡片激活效果
const cards = document.querySelectorAll('.card');
        
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // 移除其他卡片的激活状态
        cards.forEach(c => c.classList.remove('active'));
        // 添加当前卡片的激活状态
        card.classList.add('active');
    });
});