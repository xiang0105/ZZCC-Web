function checkScreenSize() {
    // 取得目標元素
    const navItem = document.getElementById('mobile-only-nav');
    
    // 判斷螢幕寬度是否小於等於 768px
    if (window.innerWidth <= 768) {
        // 手機版：顯示 (移除 display: none)
        navItem.style.display = 'block'; 
    } else {
        // 電腦版：隱藏
        navItem.style.display = 'none';
    }
}

// 1. 網頁載入時執行一次
window.addEventListener('load', checkScreenSize);

// 2. 當視窗大小改變時，重新執行
window.addEventListener('resize', checkScreenSize);

var news_list = [
  {
    img: "./images/news/001.png",
    title: "和平新城小客廳電子書上線囉！",
    link: "https://online.fliphtml5.com/zzcc23278441/ntkc/#p=1",
  },
  {
    img: "./images/news/002.png",
    title: "2025年國際身心障礙者日故事徵文開跑囉~",
    link: "https://www.dosw2025idpd.989.com.tw/index.html",
  },
  {
    img: "./images/news/003.png",
    title: "淨零小屋共玩場X中正永續生活節",
    link: "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=1551179272883906",
  },
  {
    img: "./images/news/004.png",
    title: "教育部推動兒童及青少年健康上網措施",
    link: "https://dept.moe.gov.tw/ED2700/News.aspx?n=B9FB2A800D03E15C&sms=30F37BAF2AEA6314",
  },
  {
    img: "./images/news/005.png",
    title: "114-2期迎新活動審核結果出爐啦~",
    link: "./files/news/114-2期迎新活動登記_整理過後.pdf",
  },
  {
    img: "./images/news/006.png",
    title: "培育台語家庭計畫開跑囉~",
    link: "https://tg.moc.gov.tw/ptgl-user-service/login.html",
  },
  {
    img: "./images/news/007.png",
    title: "114年10月18日 第3屆終身學習節啟動記者會",
    link: "https://www.moe.gov.tw/News_Content.aspx?n=9E7AC85F1954DDA8&s=8EDDF84CE461184C",
  },
  {
    img: "./images/news/008.png",
    title: "移民署「新住民心力量」廣播節目開始囉~",
    link: "https://www.facebook.com/powerofnewimmigrants",
  },
];

const newsContainer = document.querySelector(".news-list");

news_list.forEach((news) => {
  const newsItem = document.createElement("div");
  newsItem.classList.add("col-lg-3");
  newsItem.classList.add("col-md-4");
    newsItem.innerHTML = `
    <div class="card mb-4">
        <div class="news-img" style="background-image: url('${news.img}')"></div>
        <div class="card-body">
          <div class="news-title">${news.title}</div>
          <div class="d-flex mt-3"> 
            <a class="btn btn-primary ms-auto" href="${news.link}" target="_blank" rel="noopener noreferrer">了解更多</a>
          </div>
        </div>
    </div>
    `;
    newsContainer.appendChild(newsItem);
});

var courses_list = [
  {
    content: "【我們與資訊的距離：媒體素養入門五堂課】開始報名囉!",
    link: "./files/course/我們與資訊的距離.pdf",
  },
  {
    content: "【情緒不再失控！社會情緒學習(SEL)工作坊開課啦！】",
    link: "./images/course/sel工作坊.png",
  },
  {
    content: "【114-2期婦女學習系列課程 開跑囉~】",
    link: "./files/course/114婦女課程.pdf",
  },
  {
    content: "【傳】台語、【承】文化傳統漢學（台語）、教育部台羅拼音進階班課程",
    link: "https://forms.gle/JBkqrr81xcjX4yDe7",
  },
  {
    content: "【原住民族語言臺北學習中心族語學習班】",
    link: "https://ntnucamp.sce.ntnu.edu.tw/allc/News/",
  },
  {
    content: "【小家電維修種子培力工作坊】招生中",
    link: "https://www.facebook.com/share/p/1C2QeY7o7U/",
  },
  {
    content: "【114年度新住民博物館&眷村走讀班開始報名囉!】",
    link: "https://iwnet.civil.taipei/Newimmigrants/",
  },
  {
    content: "【從菜園到餐桌 - 寶藏巖都市農耕工作坊即將開課】",
    link: "https://www.facebook.com/share/p/17qfp25BPu/",
  },
  {
    content: "【F2L204 混搭魔法｜奇妙的調酒組合】",
    link: "https://www.facebook.com/share/p/1BwMWWZ3H8/",
  },
];

const coursesContainer = document.querySelector(".courses-list");
var course_page = 0;
const itemsPerPage = 4;

function renderCourses() {
    coursesContainer.innerHTML = "";

    const startIndex = course_page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const pageData = courses_list.slice(startIndex, endIndex);

    pageData.forEach((course , index) => {
        const courseItem = document.createElement("div");

        const globalIndex = startIndex + index + 1;
        
        courseItem.innerHTML = `
        <div class="mb-4">
            <a class="courses-title d-flex" href="${course.link}"><span class="courses-number">${globalIndex.toString().padStart(2, '0')} : </span><div>${course.content}</div></a>
            <hr>
        </div>
        `;
        coursesContainer.appendChild(courseItem);
    });

    if( course_page == 0 ) {
        document.querySelector(".courses-prev").style.display = "none";
    } else {
        document.querySelector(".courses-prev").style.display = "inline-block";
    }

    if( endIndex >= courses_list.length ) {
        document.querySelector(".courses-next").style.display = "none";
    } else {
        document.querySelector(".courses-next").style.display = "inline-block";
    }
}

renderCourses();

var links = [
    {
      link: "https://www.ccwt.tp.edu.tw/cht/index.php?",
      img: "./images/links/001.png",
      title: "臺北市社區大學聯網",
      content: "匯集臺北市 12 所社區大學資源的整合性資訊平台，提供跨校課程檢索、最新市政與學習公告及相關法規查詢，讓市民能即時掌握各校開課動態與行政資訊。",
    },
    {
      link: "https://zzdo.gov.taipei/",
      img: "./images/links/002.png",
      title: "中正區公所",
      content: "提供中正區各項行政服務、最新公告及在地活動資訊，讓居民能即時掌握社政、里民服務與公共資源。",
    },
    {
      link: "https://elearning.taipei/mpage/",
      img: "./images/links/003.png",
      title: "臺北e大",
      content: "臺北市線上學習平台，提供多元免費課程，包含公民素養、生活技能與市政知識，讓市民隨時隨地提升自我。",
    },
    {
      link: "https://moe.senioredu.moe.gov.tw/Home/ELearning",
      img: "./images/links/004.png",
      title: "樂齡學習中心",
      content: "為高齡者打造的友善學習環境，提供豐富課程與社團活動，促進健康老化、社會參與與終身學習。",
    },
    {
      link: "https://kf.knvs.tp.edu.tw/wordpress/",
      img: "./images/links/005.png",
      title: "中正區地方知識",
      content: "彙集中正區的歷史文化、地景故事與社區特色，呈現在地知識與人文風貌，促進居民對地方的理解與認同。",
    },
    {
      link: "https://elders.gov.taipei/Default.aspx",
      img: "./images/links/006.png",
      title: "台北市銀髮服務資訊網",
      content: "整合臺北市銀髮族相關服務，包括健康照護、福利資源、長照資訊與活動公告，協助長者及家庭獲得完整支援。",
    },
];

function renderLinks() {
    var track = document.getElementById("linkTrack");

    if (!track) return;

    var htmlContent = "";

    links.forEach(function (item, index) {
      var num = index + 1;
      var displayNum = num < 10 ? "0" + num : num;

      htmlContent += `
        <a href="${item.link}" class="quick-menu-card" target="_blank" rel="noopener noreferrer">
            <div class="card-background">
                <img src="${item.img}" alt="${item.content}">
            </div>
            <div class="card-overlay"></div>
            <div class="card-number">${displayNum}</div>
            <div class="card-title">${item.title}</div>
            <div class="card-description">
                <p>${item.content}</p>
            </div>
        </a>`;
    });

    track.innerHTML = htmlContent;
    track.innerHTML += htmlContent;
}

renderLinks();

window.scrollLinks = function (direction) {
    var track = document.getElementById("linkTrack");
    if (!track) return;

    // 1. 取得基本數據
    var card = track.querySelector('.quick-menu-card');
    if (!card) return;

    var cardWidth = card.offsetWidth; 
    var style = window.getComputedStyle(track);
    var gap = parseFloat(style.gap) || 24;
    var scrollAmount = cardWidth + gap; // 每次滑動的距離

    // 2. 計算「半程」距離 (因為我們複製了一份，所以總長度的一半就是一組的長度)
    // 這裡用 scrollWidth (總內容寬) 除以 2
    var oneSetWidth = track.scrollWidth / 2;

    // 3. 【關鍵魔法】：在滑動「之前」，先檢查是否需要「瞬移」
    
    if (direction === 1) {
        // ------------ 向右 (Next) ------------

        // 如果目前位置已經超過(或等於)第一組的長度
        // 代表使用者已經看得到第二組的卡片了
        // 我們就把位置「瞬間」減去一組的長度，回到第一組的相對位置
        if (track.scrollLeft >= oneSetWidth) {
            track.style.scrollBehavior = "auto"; // 關閉動畫 (瞬間)
            track.scrollLeft -= oneSetWidth;     // 瞬移回前面
        }

        // 瞬移完(或不用瞬移)之後，再開啟動畫，漂亮地往右滑
        // 加上 setTimeout 確保瞬移已經完成
        setTimeout(() => {
            track.style.scrollBehavior = "smooth";
            track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }, 0);

    } else {
        // ------------ 向左 (Prev) ------------

        // 如果目前位置在最開頭 (0)
        // 我們先把位置「瞬間」加到第二組的開頭
        if (track.scrollLeft <= 0) {
            track.style.scrollBehavior = "auto"; // 關閉動畫 (瞬間)
            track.scrollLeft += oneSetWidth;     // 瞬移去後面
        }

        // 瞬移完之後，再開啟動畫，漂亮地往左滑
        setTimeout(() => {
            track.style.scrollBehavior = "smooth";
            track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }, 0);
    }
};

// 監聽視窗大小改變，自動對齊卡片 (這段建議保留)
window.addEventListener('resize', function() {
    var track = document.getElementById("linkTrack");
    if (!track) return;
    
    // 取得卡片寬度
    var card = track.querySelector('.quick-menu-card');
    if(card) {
        track.style.scrollBehavior = "auto";
        var cardWidth = card.offsetWidth;
        var gap = 24; 
        var index = Math.round(track.scrollLeft / (cardWidth + gap));
        track.scrollLeft = index * (cardWidth + gap);
        
        setTimeout(() => {
            track.style.scrollBehavior = "smooth";
        }, 100);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    console.log("程式開始載入..."); // 檢查點 1

    // 1. 選取元素
    const submitBtn = document.getElementById('submitBtn');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const myModalEl = document.getElementById('myModal');

    // 2. 初始化 Bootstrap Modal (確保變數只宣告一次)
    let bsModal = null;
    if (typeof bootstrap !== 'undefined' && myModalEl) {
        bsModal = new bootstrap.Modal(myModalEl);
        
        // 修正原本的 focus 功能：當 Modal 開啟後，自動聚焦在「姓名」欄位
        myModalEl.addEventListener('shown.bs.modal', function () {
            if(nameInput) nameInput.focus();
        });
    }

    // ==========================================
    //  即時輸入監聽 (修正重複程式碼)
    // ==========================================
    // 把這三個欄位放在陣列裡一起處理，程式碼更乾淨
    [nameInput, emailInput, messageInput].forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                // console.log("正在輸入...", input.id); // 檢查點 2 (想看可以打開)
                validateField(input);
            });
        }
    });

    // ==========================================
    //  送出按鈕監聽
    // ==========================================
    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("按下送出按鈕"); // 檢查點 3
            
            // 按下送出時，強制檢查所有欄位
            const isNameValid = validateField(nameInput);
            const isEmailValid = validateField(emailInput);
            const isMessageValid = validateField(messageInput);

            if (isNameValid && isEmailValid && isMessageValid) {
                alert('已送出！請等待我們工作天 1~3 日回覆您！');
                
                // 清空表單
                document.getElementById('contactForm').reset();
                removeClasses();
                
                // 關閉 Modal
                if (bsModal) bsModal.hide();
            } else {
                console.log("驗證失敗，不送出");
            }
        });
    }

    // 3. 通用的單一欄位檢查函式
    function validateField(input) {
        if (!input) return false; // 防止找不到元素報錯

        const value = input.value.trim();
        const id = input.id;
        let isOk = true;
        let errorMsg = '';

        // 根據 ID 判斷要檢查什麼
        if (id === 'name') {
            if (value === '') {
                errorMsg = '姓名不能為空';
                isOk = false;
            }
        } else if (id === 'email') {
            if (value === '') {
                errorMsg = '電子郵件不能為空';
                isOk = false;
            } else if (!isEmail(value)) {
                errorMsg = '電子郵件格式不正確';
                isOk = false;
            }
        } else if (id === 'message') {
            if (value === '') {
                errorMsg = '訊息內容不能為空';
                isOk = false;
            }
        }

        // 根據結果顯示紅/綠燈
        if (isOk) {
            setSuccess(input);
            return true;
        } else {
            setError(input, errorMsg);
            return false;
        }
    }

    // 設定錯誤狀態
    function setError(input, message) {
        const formBox = input.parentElement;
        const small = formBox.querySelector('small');
        if(small) small.innerText = message;
        
        formBox.classList.add('error');
        formBox.classList.remove('success');
    }

    // 設定成功狀態
    function setSuccess(input) {
        const formBox = input.parentElement;
        formBox.classList.add('success');
        formBox.classList.remove('error');
    }

    // 重置樣式
    function removeClasses() {
        [nameInput, emailInput, messageInput].forEach(input => {
            if(input) {
                const formBox = input.parentElement;
                formBox.classList.remove('success');
                formBox.classList.remove('error');
            }
        });
    }

    // Email 正則表達式
    function isEmail(email) {
        return /^[^@]+@[^@]+\.[^@]+$/.test(email);
    }
});