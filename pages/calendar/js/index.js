
function showMonth(monthId) {
    // 隱藏所有內容
    document.querySelectorAll('.schedule-container').forEach(el => el.classList.remove('active'));
    // 移除按鈕 active
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    // 顯示目標內容與按鈕
    document.getElementById(monthId).classList.add('active');
    event.target.classList.add('active');
}
