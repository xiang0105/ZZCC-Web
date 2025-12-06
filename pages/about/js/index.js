// 1. 字體大小控制功能 (新增)
function setFontSize(size, btnElement) {
    // 設定 HTML 根元素的字體大小 (影響所有 rem 單位)
    document.documentElement.style.fontSize = size;
    
    // 更新按鈕的 active 狀態
    const buttons = document.querySelectorAll('.font-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');
}

// 2. 交通面板切換功能
function showTraffic(type, btnElement) {
    const contents = document.querySelectorAll('.panel-content');
    contents.forEach(content => content.classList.remove('active'));

    const targetContent = document.getElementById('content-' + type);
    if (targetContent) targetContent.classList.add('active');

    const buttons = document.querySelectorAll('.control-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (btnElement) btnElement.classList.add('active');
}

// 3. 滾動監聽 (Scroll Reveal & BackToTop)
window.addEventListener('scroll', function() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
    
    const backToTopBtn = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

// 初始化時觸發一次 scroll 以顯示首屏動畫
window.dispatchEvent(new Event('scroll'));