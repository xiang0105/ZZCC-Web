// --- 1. 行事曆資料庫 (Data) ---
// 格式：key 為 "YYYY-M-D" (注意月份不補0以配合簡單邏輯)，value 為物件
const scheduleData = {
    // --- 9月 ---
    "2025-9-1": { week: "W1", dots: ["blue"], events: [{ type: "admin", title: "第1週 陸續開課、班級代表推選。", desc: "開課及班代推選。" }, { type: "admin", title: "加退選開始", desc: "受理加選、改選、退選 (9/1-9/19)。" }] },
    "2025-9-15": { week: "W3", dots: ["blue"], events: [{ type: "admin", title: "班代座談會", desc: "召開第1次班級代表座談會。" }, { type: "admin", title: "最後退選週", desc: "9/15-9/19內退選退還七成。" }] },
    "2025-9-19": { dots: ["blue"], events: [{ type: "admin", title: "加退選結束", desc: "加退選受理截止。" }] },
    "2025-9-20": { dots: ["blue"], events: [{ type: "admin", title: "停止退費", desc: "第4週起恕不受理退費、改選。" }] },
    "2025-9-27": { dots: ["red"], holiday: true, events: [{ type: "holiday", title: "教師節連假", desc: "連續假期停班、停課 (9/27-9/29)。" }] },
    "2025-9-28": { dots: ["red"], holiday: true, events: [{ type: "holiday", title: "教師節連假", desc: "連續假期停班、停課。" }] },
    "2025-9-29": { week: "W5", dots: ["red"], holiday: true, events: [{ type: "holiday", title: "教師節連假", desc: "連續假期停班、停課。" }] },
    "2025-9-30": { dots: ["blue"], events: [{ type: "admin", title: "課程大綱送件截止、課程發展暨師資審查會議。", desc: "課綱投件作業結束及課程發展暨師資審查會議。" }] },

    // --- 10月 ---
    "2025-10-4": { dots: ["red"], holiday: true, events: [{ type: "holiday", title: "中秋節連假", desc: "停班、停課 (10/4-10/6)。" }] },
    "2025-10-5": { dots: ["red"], holiday: true, events: [{ type: "holiday", title: "中秋節連假", desc: "停班、停課。" }] },
    "2025-10-6": { week: "W6", dots: ["red"], holiday: true, events: [{ type: "holiday", title: "中秋節連假", desc: "停班、停課。" }] },
    "2025-10-10": { dots: ["red"], holiday: true, events: [{ type: "holiday", title: "國慶連假", desc: "停班、停課 (10/10-10/12)。" }] },
    "2025-10-11": { dots: ["red"], holiday: true, events: [{ type: "holiday", title: "國慶連假", desc: "停班、停課。" }] },
    "2025-10-12": { dots: ["red"], holiday: true, events: [{ type: "holiday", title: "國慶連假", desc: "停班、停課。" }] },
    "2025-10-24": { dots: ["red"], holiday: true, events: [{ type: "holiday", title: "光復節連假", desc: "停班、停課 (10/24-10/26)。" }] },
    "2025-10-25": { dots: ["red"], holiday: true, events: [{ type: "holiday", title: "光復節連假", desc: "停班、停課。" }] },
    "2025-10-26": { dots: ["red"], holiday: true, events: [{ type: "holiday", title: "光復節連假", desc: "停班、停課。" }] },
    // 公民週範圍
    "2025-10-27": { week: "W9", citizen: true, dots: ["green"], events: [{ type: "citizen", title: "現代公民素養週", desc: "全校性講座活動 (10/27-10/31)。" }] },
    "2025-10-28": { citizen: true, dots: ["green"], events: [{ type: "citizen", title: "現代公民素養週", desc: "全校性講座活動。" }] },
    "2025-10-29": { citizen: true, dots: ["green"], events: [{ type: "citizen", title: "現代公民素養週", desc: "全校性講座活動。" }] },
    "2025-10-30": { citizen: true, dots: ["green"], events: [{ type: "citizen", title: "現代公民素養週", desc: "全校性講座活動。" }] },
    "2025-10-31": { citizen: true, dots: ["green"], events: [{ type: "citizen", title: "現代公民素養週", desc: "全校性講座活動。" }] },

    // --- 11月 ---
    "2025-11-10": { week: "W11", dots: ["blue"], events: [{ type: "admin", title: "教學評鑑與調查", desc: "學員問卷、教師評量、成果展調查 (11/10-11/15)。" }] },
    "2025-11-11": { dots: ["blue"], events: [{ type: "admin", title: "教學評鑑與調查", desc: "學員問卷、教師評量、成果展調查。" }] },
    "2025-11-12": { dots: ["blue"], events: [{ type: "admin", title: "教學評鑑與調查", desc: "學員問卷、教師評量、成果展調查。" }] },
    "2025-11-13": { dots: ["blue"], events: [{ type: "admin", title: "教學評鑑與調查", desc: "學員問卷、教師評量、成果展調查。" }] },
    "2025-11-14": { dots: ["blue"], events: [{ type: "admin", title: "教學評鑑與調查", desc: "學員問卷、教師評量、成果展調查。" }] },

    // --- 12月 ---
    "2025-12-1": { week: "W14", dots: ["blue"], events: [{ type: "admin", title: "申請週", desc: "研習證書、公教人員時數申請。" }, { type: "admin", title: "班代座談會", desc: "第2次班代座談會(暫定)。" }] },
    "2025-12-8": { week: "W15", dots: ["blue"], events: [{ type: "admin", title: "核發證明", desc: "核發班級代表優惠證明。" }] },
    "2025-12-25": { dots: ["red"], holiday: true, events: [{ type: "holiday", title: "行憲紀念日", desc: "停班、停課。" }] },
    "2025-12-22": { week: "W17", dots: ["blue"], events: [{ type: "admin", title: "期末展示", desc: "期末成果展(預排)。" },{ type: "admin", title: "期末行政", desc: "時數上傳、核發研習證明書。" }] },
    "2025-12-29": { week: "W18", dots: ["blue"], events: [{ type: "admin", title: "新課體驗", desc: "新課程示範體驗(預排)" }] },

    // --- 1月 ---
    "2026-1-1": { dots: ["red"], holiday: true, events: [{ type: "holiday", title: "元旦", desc: "停班、停課。" }] },
    "2026-1-5": { makeup: true, week: "補", dots: ["blue"], events: [{ type: "admin", title: "補課週", desc: "處理補課事宜。" }] },
    "2026-1-6": { dots: ["blue"], events: [{ type: "admin", title: "補課週", desc: "處理補課事宜。" }] },
    "2026-1-7": { dots: ["blue"], events: [{ type: "admin", title: "補課週", desc: "處理補課事宜。" }] },
    "2026-1-8": { dots: ["blue"], events: [{ type: "admin", title: "補課週", desc: "處理補課事宜。" }] },
    "2026-1-9": { dots: ["blue"], events: [{ type: "admin", title: "補課週", desc: "處理補課事宜。" }] },
    "2026-1-12": { makeup: true, week: "招", dots: ["blue"], events: [{ type: "admin", title: "期末行政", desc: "相關行政作業。" }, { type: "admin", title: "期末行政", desc: "相關行政作業。" }] },
    "2026-1-13": { dots: ["blue"], events: [{ type: "admin", title: "期末行政", desc: "相關行政作業。" }] },
    "2026-1-14": { dots: ["blue"], events: [{ type: "admin", title: "期末行政", desc: "相關行政作業。" }] },
    "2026-1-15": { dots: ["blue"], events: [{ type: "admin", title: "期末行政", desc: "相關行政作業。" }] },
    "2026-1-16": { dots: ["blue"], events: [{ type: "admin", title: "期末行政", desc: "相關行政作業。" }] },

    // 單純週次標記 (沒有事件，只有 W 標籤)
    "2025-9-8": { week: "W2" }, "2025-9-22": { week: "W4" },
    "2025-10-13": { week: "W7" }, "2025-10-20": { week: "W8" },
    "2025-11-3": { week: "W10" }, "2025-11-17": { week: "W12" }, "2025-11-24": { week: "W13" },
    "2025-12-15": { week: "W16" }
};

// 目前狀態
let currentYear = 2025;
let currentMonth = 9;

// --- 2. 初始化 ---
window.onload = function() {
    changeMonth(9, 2025); // 預設顯示 9 月
};

// --- 3. 切換月份 ---
function changeMonth(month, year) {
    currentMonth = month;
    currentYear = year;
    
    // 更新標題
    document.getElementById('calendar-title').innerText = `${year}年 ${month}月`;
    
    // 更新 Tab 樣式
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.includes(month < 10 ? `0${month}` : `${month}`) || // 處理補零問題
            btn.innerText.includes(["九","十","十一","十二","一"][month > 8 ? month - 9 : 4])) {
                // 簡單匹配文字，或直接傳入 event target 處理更佳，這裡為了簡化邏輯用文字匹配
                // 修正：直接用 onclick 傳入的參數最準，這裡只要清除所有，被點擊的會由 HTML onclick classList.add 處理
                // 為了讓這段 code 獨立運作，我們重置所有 active，再根據內容加回去
            }
    });
    
    // 修正 Tab 樣式邏輯：因為 HTML onclick 已經處理了 this.active，這裡其實主要是資料渲染
    // 但為了確保按鈕狀態同步 (例如從 JS 呼叫)，我們重新渲染按鈕狀態
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    // 找出對應的按鈕 (Hardcode index mapping based on month)
    const map = {9:0, 10:1, 11:2, 12:3, 1:4};
    if(tabs[map[month]]) tabs[map[month]].classList.add('active');

    renderCalendar(month, year);
    renderEventList(month, year, null); // 預設顯示全月
}

// --- 4. 渲染月曆格子 ---
function renderCalendar(month, year) {
    const grid = document.getElementById('days-grid');
    grid.innerHTML = ""; // 清空

    // 取得該月第一天是星期幾 (0=週日)
    const firstDay = new Date(year, month - 1, 1).getDay();
    // 取得該月有幾天
    const daysInMonth = new Date(year, month, 0).getDate();

    // 填補前面的空白日
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'day empty';
        grid.appendChild(emptyCell);
    }

    // 填入日期
    for (let d = 1; d <= daysInMonth; d++) {
        const dateKey = `${year}-${month}-${d}`;
        const data = scheduleData[dateKey];
        
        const cell = document.createElement('div');
        cell.className = 'day';
        cell.onclick = () => selectDate(d, cell); // 綁定點擊事件

        // 判斷是否為週末
        const dayOfWeek = new Date(year, month - 1, d).getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            cell.classList.add('weekend');
        }

        // 判斷特殊樣式 (資料驅動)
        if (data) {
            if (data.holiday) cell.classList.add('holiday-mode');
            if (data.citizen) cell.classList.add('citizen-mode');
        }

        // 建立 HTML 內容
        let html = ``;
        
        // 週次標籤
        if (data && data.week) {
            html += `<span class="week-tag ${data.makeup ? 'makeup' : ''}">${data.week}</span>`;
        } else {
            // 為了排版整齊，沒有標籤的也要佔位，或者用 flex 撐開
            html += `<span style="display:block; height:18px;"></span>`; 
        }

        html += `<div class="day-number">${d}</div>`;

        // 色點
        if (data && data.dots) {
            html += `<div class="event-dots">`;
            data.dots.forEach(color => {
                html += `<span class="dot ${color}"></span>`;
            });
            html += `</div>`;
        }

        cell.innerHTML = html;
        grid.appendChild(cell);
    }
}

// --- 5. 點擊日期 ---
function selectDate(day, element) {
    // 移除其他日期的選取狀態
    document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
    // 加入當前選取狀態
    element.classList.add('selected');

    // 更新右側清單
    renderEventList(currentMonth, currentYear, day);
}

// --- 6. 渲染右側清單 ---
function renderEventList(month, year, selectedDay) {
    const listContainer = document.getElementById('event-list');
    const label = document.getElementById('selected-date-label');
    listContainer.innerHTML = ""; // 清空
    listContainer.classList.remove('fade-in'); // 重置動畫
    void listContainer.offsetWidth; // 觸發 reflow
    listContainer.classList.add('fade-in'); // 加回動畫

    let html = "";
    let hasEvent = false;

    // 如果有點擊某一天
    if (selectedDay) {
        label.innerText = `${month}/${selectedDay}`;
        const dateKey = `${year}-${month}-${selectedDay}`;
        const data = scheduleData[dateKey];

        if (data && data.events) {
            data.events.forEach(evt => {
                html += createEventHTML(`${month}/${selectedDay}`, evt);
                hasEvent = true;
            });
        } else {
            html = `<div style="padding:20px; color:#999; text-align:center;">本日無特定行事要項</div>`;
        }
    } 
    // 如果是顯示全月 (Default)
    else {
        label.innerText = "全月檢視";
        // 遍歷該月所有日期
        const daysInMonth = new Date(year, month, 0).getDate();
        for (let d = 1; d <= daysInMonth; d++) {
            const dateKey = `${year}-${month}-${d}`;
            const data = scheduleData[dateKey];
            if (data && data.events) {
                data.events.forEach(evt => {
                    // 判斷日期顯示格式，如果是範圍(如連假)，資料中可能是單日設定，這裡簡單顯示日期
                    html += createEventHTML(`${month}/${d}`, evt);
                    hasEvent = true;
                });
            }
        }
        if (!hasEvent) {
            html = `<div style="padding:20px; color:#999; text-align:center;">本月尚無行事要項</div>`;
        }
    }

    listContainer.innerHTML = html;
}

// 輔助函式：產生單一事件的 HTML
function createEventHTML(dateStr, evt) {
    let typeClass = "";
    if (evt.type === "admin") typeClass = "type-admin";
    if (evt.type === "citizen") typeClass = "type-citizen";
    if (evt.type === "holiday") typeClass = "type-holiday";

    // 取得星期幾
    const [m, d] = dateStr.split('/');
    const weekDay = ["日","一","二","三","四","五","六"][new Date(currentYear, m-1, d).getDay()];

    return `
    <div class="event-item ${typeClass}">
        <span class="event-date">${dateStr} (${weekDay})</span>
        <div class="event-content">
            <h4>${evt.title}</h4>
            <p>${evt.desc}</p>
        </div>
    </div>
    `;
}