document.addEventListener('DOMContentLoaded', () => {
    console.log("中正社區大學週報頁面已完全載入。");

    const gridContainer = document.getElementById('weeklyReportGrid');
    const totalWeeks = 18;

    // Helper function to get URL parameter
    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    // --- 1. 判斷週報類型 (Report Type) ---
    let reportType = getUrlParameter('type').toLowerCase();
    if (reportType !== 'student') {
        reportType = 'teacher'; 
    }
    
    // --- 表格下載資料定義 (來自使用者圖片) ---
    // 🚀 更新: 檔案路徑已從 '表格下載/' 變更為 '表單/'
    const FORM_DATA = [
        // 紙本電子檔 (下載) - 放在 '表單/' 資料夾中
        { label: '114-2期退費申請書', url: '表單/114-2期退費申請書.pdf', type: 'print' },
        { label: '中正社大公民週講座心得表', url: '表單/中正社大公民週講座心得表.pdf', type: 'print' },
        { label: '刊物提案單', url: '表單/刊物提案單.pdf', type: 'print' },
        { label: '助教申請資料表', url: '表單/助教申請資料表.pdf', type: 'print' },
        { label: '校外教學(實習)記錄單', url: '表單/校外教學(實習)記錄單.pdf', type: 'print' },
        { label: '教學與體驗分享單', url: '表單/教學與體驗分享單.pdf', type: 'print' },
        { label: '講師資料表', url: '表單/講師資料表.pdf', type: 'print' },
        { label: '臺北市中正社區大學講座調查表', url: '表單/臺北市中正社區大學講座調查表.pdf', type: 'print' },
        
        // 線上表格 (填寫) - 保持外部連結不變
        { label: '教學日誌', url: 'https://goo.gl/forms/z8cTYc4GTJlpt2dw2', type: 'online' },
        { label: '課程異動申請單(線上)', url: 'https://goo.gl/forms/p4FdJQdMPE5WbB8I3', type: 'online' },
    ];
    // --- 表格下載資料定義結束 ---


    // --- 2. 定義不同週報的資料 (Report Data) ---
    const reportData = {
        'teacher': {
            pageTitle: '教師週報',
            h1Text: '教師週報',
            pText: '提供教師最新的教學資訊、行政公告與校務安排。',
            guide: {
                title: '教師須知',
                description: '點擊開啟 114-2 期教師須知 PDF 檔案',
                pdfPath: './files/教師/教師須知.pdf', 
            },
            pdfWeeks: [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 13], 
            linkPrefix: './files/教師',
            linkFilename: 'teacher',
            otherType: 'student'
        },
        'student': {
            pageTitle: '學員週報',
            h1Text: '學員週報',
            pText: '提供學生最新的校務資訊、課程公告與學習資源。',
            guide: {
                title: '學員須知',
                description: '點擊開啟 114-2 期學員須知 PDF 檔案',
                pdfPath: './files/學生/學員須知.pdf', 
            },
            pdfWeeks: [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13], 
            linkPrefix: './files/學生',
            linkFilename: 'student',
            otherType: 'teacher'
        }
    };

    const currentReport = reportData[reportType];
    
    // --- 3. 動態更新頁面標題與文字 (Update Headers) ---
    document.getElementById('pageTitle').textContent = `${currentReport.pageTitle} - 中正社區大學`;
    document.getElementById('reportP').textContent = currentReport.pText;

    // --- 4. 動態更新標題切換標籤 (Update Report Tabs) ---
    const currentTabElement = document.getElementById(`${reportType}Tab`);
    const otherTabElement = document.getElementById(`${currentReport.otherType}Tab`);
    
    if (currentTabElement && otherTabElement) {
        currentTabElement.classList.add('current-topic');
        currentTabElement.setAttribute('href', `javascript:void(0)`); 

        otherTabElement.classList.remove('current-topic');
        otherTabElement.setAttribute('href', `?type=${currentReport.otherType}`);
    }


    // --- 5. 動態更新須知卡片 (Update Notice Card) ---
    const noticeCard = document.getElementById('noticeCard');
    const noticeTitle = document.getElementById('noticeTitle');
    const noticeDescription = document.getElementById('noticeDescription');

    if (noticeCard && noticeTitle && noticeDescription) {
        noticeTitle.textContent = currentReport.guide.title;
        noticeDescription.textContent = currentReport.guide.description;
        
        noticeCard.removeAttribute('href');
        
        noticeCard.onclick = function(event) {
            event.preventDefault(); 
            window.open(currentReport.guide.pdfPath, '_blank'); 
        };
    }

    // --- 6. 下拉選單生成與控制邏輯 (Dropdown Menu Logic) ---
    const dropdownMenu = document.getElementById('formDropdownMenu');
    const dropdownToggle = document.getElementById('formDropdownToggle');

    if (dropdownMenu && dropdownToggle) {
        // A. 動態生成選單內容
        let menuHTML = '';
        
        // 1. 紙本電子檔
        menuHTML += `<div class="dropdown-header">📄 紙本電子檔 (下載)</div>`;
        FORM_DATA.filter(f => f.type === 'print').forEach(form => {
            // 檔案下載 (PDF/DOCX)
            menuHTML += `<a href="${form.url}" class="dropdown-item" target="_blank">${form.label}</a>`;
        });
        
        // 2. 線上表格
        menuHTML += `<div class="dropdown-header" style="margin-top: 15px;">💻 線上表格 (填寫)</div>`;
        FORM_DATA.filter(f => f.type === 'online').forEach(form => {
            // 線上連結 (Google Forms 等)
            menuHTML += `<a href="${form.url}" class="dropdown-item dropdown-item-online" target="_blank">${form.label}</a>`;
        });

        dropdownMenu.innerHTML = menuHTML;


        // B. 控制選單顯示/隱藏
        dropdownToggle.addEventListener('click', (event) => {
            event.stopPropagation(); // 阻止事件冒泡
            const isExpanded = dropdownMenu.classList.contains('show');
            
            // 切換顯示狀態
            if (isExpanded) {
                dropdownMenu.classList.remove('show');
                dropdownToggle.setAttribute('aria-expanded', 'false');
            } else {
                // 顯示選單
                dropdownMenu.classList.add('show');
                dropdownToggle.setAttribute('aria-expanded', 'true');
            }
        });

        // C. 點擊其他地方時關閉選單
        document.addEventListener('click', (event) => {
            // 檢查點擊的目標是否在下拉選單容器內
            const dropdownContainer = dropdownToggle.closest('.dropdown');
            if (dropdownContainer && !dropdownContainer.contains(event.target)) {
                dropdownMenu.classList.remove('show');
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // --- 7. 卡片生成與連結邏輯 (Card Generation) ---
    
    // 中文數字轉換函式 (保持不變)
    const getChineseWeekText = (i) => {
        const chineseNumbers = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
        if (i <= 10) return chineseNumbers[i] + '週';
        if (i === 11) return '十一週';
        if (i === 12) return '十二週';
        if (i === 13) return '十三週';
        if (i === 14) return '十四週';
        if (i === 15) return '十五週';
        if (i === 16) return '十六週';
        if (i === 17) return '十七週';
        if (i === 18) return '十八週';
        return i + '週'; 
    };

    // 清空舊卡片
    gridContainer.innerHTML = ''; 

    for (let i = 1; i <= totalWeeks; i++) {
        const weekNumber = String(i).padStart(2, '0');
        const chineseWeekText = getChineseWeekText(i);
        
        let linkURL = '';
        let targetAttribute = '_self'; 
        let pdfIcon = ''; 
        let cardClass = 'report-card';
        
        if (currentReport.pdfWeeks.includes(i)) {
            linkURL = `${currentReport.linkPrefix}/${currentReport.linkFilename}_${weekNumber}.pdf`; 
            targetAttribute = '_blank';
            pdfIcon = `<i class="fas fa-file-pdf pdf-icon"></i>`;
            cardClass += ' has-pdf';

        } else {
            linkURL = `${currentReport.linkPrefix}/week_${weekNumber}_view.htm`; 
        }

        const cardHTML = `
            <a href="${linkURL}" class="report-card ${cardClass}" target="${targetAttribute}" data-week="${i}">
                <div class="week-number">
                    <span>${weekNumber}</span>
                </div>
                <div class="card-title">第${chineseWeekText}${currentReport.h1Text.substring(0, 2)}週報</div> 
                ${pdfIcon}
            </a>
        `;
        
        gridContainer.insertAdjacentHTML('beforeend', cardHTML);
    }
    
    // --- 滾動效果 (保持不變) ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
});