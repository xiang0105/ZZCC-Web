document.addEventListener('DOMContentLoaded', () => {
    // --- 1. 手風琴開關功能 ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    function toggleAccordion(item, forceOpen = false, forceClose = false) {
        const content = item.querySelector('.accordion-content');
        const icon = item.querySelector('.toggle-icon i');
        
        if (!content || !icon) return;

        if (forceOpen) {
            item.classList.add('active');
            content.style.maxHeight = content.scrollHeight + "px";
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
            return;
        }
        
        if (forceClose) {
            item.classList.remove('active');
            content.style.maxHeight = null;
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
            return;
        }

        item.classList.toggle('active');
        if (item.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + "px";
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
        } else {
            content.style.maxHeight = null;
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
        }
    }

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            toggleAccordion(header.parentElement);
        });
    });

    // --- 2. 導覽列滾動監聽 & Header Search 顯示 ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.category-nav a');
    const searchWrapper = document.querySelector('.search-wrapper');
    const headerSearch = document.getElementById('header-search');

    window.addEventListener('scroll', () => {
        // Active Link Logic
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });

        // Header Search Visibility Logic
        if (searchWrapper && headerSearch) {
            const triggerPoint = searchWrapper.offsetTop + searchWrapper.offsetHeight;
            if (window.scrollY > triggerPoint) {
                headerSearch.classList.add('visible');
            } else {
                headerSearch.classList.remove('visible');
            }
        }
    });

    // --- 3. 搜尋功能 (整合 Header 與 Main Search) ---
    const searchInput = document.getElementById('faq-search-input');
    const headerSearchInput = document.getElementById('header-search-input');
    const searchStatus = document.getElementById('search-status');
    const noResultMsg = document.getElementById('no-result-msg');
    const searchTermDisplay = document.getElementById('search-term-display');
    const accordionItems = document.querySelectorAll('.accordion-item');
    const allSections = document.querySelectorAll('.faq-section');

    function performSearch(term) {
        term = term.trim().toLowerCase();
        
        // Sync inputs
        if (searchInput && searchInput.value !== term) searchInput.value = term;
        if (headerSearchInput && headerSearchInput.value !== term) headerSearchInput.value = term;

        let matchCount = 0;

        if (term === '') {
            accordionItems.forEach(item => {
                item.style.display = 'block';
                toggleAccordion(item, false, true); 
            });
            allSections.forEach(sec => sec.style.display = 'block');
            if(searchStatus) searchStatus.textContent = '';
            if(noResultMsg) noResultMsg.style.display = 'none';
            return;
        }

        accordionItems.forEach(item => {
            const title = item.querySelector('h4').textContent.toLowerCase();
            const body = item.querySelector('.accordion-body').textContent.toLowerCase();

            if (title.includes(term) || body.includes(term)) {
                item.style.display = 'block';
                toggleAccordion(item, true, false);
                matchCount++;
            } else {
                item.style.display = 'none';
                toggleAccordion(item, false, true);
            }
        });

        allSections.forEach(section => {
            const visibleItems = section.querySelectorAll('.accordion-item[style="display: block;"]');
            if (visibleItems.length === 0) {
                section.style.display = 'none';
            } else {
                section.style.display = 'block';
            }
        });

        if (matchCount > 0) {
            if(searchStatus) searchStatus.textContent = `找到 ${matchCount} 則相關問題`;
            if(noResultMsg) noResultMsg.style.display = 'none';
        } else {
            if(searchStatus) searchStatus.textContent = '';
            if(noResultMsg) noResultMsg.style.display = 'block';
            if(searchTermDisplay) searchTermDisplay.textContent = term;
            allSections.forEach(sec => sec.style.display = 'none');
        }
    }

    if(searchInput) searchInput.addEventListener('input', (e) => performSearch(e.target.value));
    if(headerSearchInput) headerSearchInput.addEventListener('input', (e) => performSearch(e.target.value));

    // --- 4. 字體大小調整功能 ---
    function setFontSize(size) {
        document.documentElement.setAttribute('data-fontsize', size);
        // Update Header Buttons
        document.querySelectorAll('.font-btn-header').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.getElementById('h-btn-' + size);
        if(activeBtn) activeBtn.classList.add('active');
        
        localStorage.setItem('ccwt_font_size', size);
    }

    // Expose setFontSize to global scope for onclick events in HTML
    window.setFontSize = setFontSize;

    const savedSize = localStorage.getItem('ccwt_font_size');
    if (savedSize) {
        setFontSize(savedSize);
    }

    // --- 5. 搜尋關鍵字推薦功能 (Search Recommendations) ---
    const recommendationBox = document.getElementById('search-recommendations');
    const recommendationList = document.getElementById('recommendation-list');

    // 定義一組潛在的關鍵字 (Whitelist approach for better quality)
    const potentialKeywords = [
        "報名", "學費", "費用", "保險", "課程", "學分", "上課", "時間", 
        "地點", "優惠", "折扣", "退費", "轉班", "旁聽", "證書", "停車", 
        "講義", "材料", "網路", "線上", "實體", "補課", "請假", "收據", 
        "發票", "額滿", "開課", "簡章", "資格", "年齡", "戶籍", "補助", 
        "志工", "社團", "成果展", "冷氣", "電腦", "場地", "身心障礙", "低收入"
    ];

    function generateRecommendations() {
        // 1. 收集所有 Q&A 的文字內容
        let fullText = "";
        accordionItems.forEach(item => {
            fullText += item.textContent;
        });

        // 2. 計算關鍵字出現頻率
        const keywordCounts = {};
        potentialKeywords.forEach(keyword => {
            const regex = new RegExp(keyword, "g");
            const matches = fullText.match(regex);
            if (matches) {
                keywordCounts[keyword] = matches.length;
            }
        });

        // 3. 排序並取出前 10 名
        const sortedKeywords = Object.keys(keywordCounts)
            .sort((a, b) => keywordCounts[b] - keywordCounts[a])
            .slice(0, 12); // 取前 12 個

        // 4. 產生 HTML
        recommendationList.innerHTML = '';
        sortedKeywords.forEach(keyword => {
            const tag = document.createElement('span');
            tag.classList.add('recommendation-tag');
            tag.textContent = keyword;
            tag.addEventListener('click', () => {
                // 填入搜尋框並搜尋
                if(searchInput) {
                    searchInput.value = keyword;
                    performSearch(keyword);
                }
                if(headerSearchInput) {
                    headerSearchInput.value = keyword;
                }
                recommendationBox.style.display = 'none';
            });
            recommendationList.appendChild(tag);
        });
    }

    // 初始化推薦列表
    generateRecommendations();

    // 處理顯示/隱藏邏輯
    if (searchInput) {
        searchInput.addEventListener('focus', () => {
            recommendationBox.style.display = 'block';
        });

        // 使用 setTimeout 讓點擊事件先發生，再隱藏
        searchInput.addEventListener('blur', () => {
            setTimeout(() => {
                recommendationBox.style.display = 'none';
            }, 200);
        });
    }
});