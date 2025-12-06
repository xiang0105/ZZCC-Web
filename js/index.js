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
            <a class="courses-title" href="${course.link}">${globalIndex.toString().padStart(2, '0')} : ${course.content}</a>
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

    // 1. 偵測是否為手機版 (螢幕寬度 <= 768px)
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // 2. 定義寬度與間距 (利用三元運算子切換數值)
    // ⚠️ 請修改下方的數值，讓它跟您的 CSS 設定一模一樣
    const cardWidth = isMobile ? 150 : 300; // 手機版卡片寬 : 電腦版卡片寬
    const gap = isMobile ? 16 : 24;         // 手機版間距 : 電腦版間距

    // 計算一次要捲動的距離
    const scrollAmount = cardWidth + gap;

    // 計算「單組內容」的總長度
    // (因為 scrollWidth 會根據 CSS 自動變小，所以這行不需要改，它會自動抓到正確的總長度)
    const singleSetWidth = track.scrollWidth / 2;

    if (direction === 1) {
        // ------------ 向右 (Next) ------------

        // 檢查：如果已經捲到「第二組」的範圍了 (容許 10px 誤差)
        if (track.scrollLeft >= singleSetWidth - 10) {
            track.style.scrollBehavior = "auto"; // 關閉動畫
            track.scrollLeft -= singleSetWidth;  // 瞬間彈回起點
        }

        // 恢復平滑捲動，並執行真正的往右滑
        setTimeout(() => {
            track.style.scrollBehavior = "smooth";
            track.scrollBy({ left: scrollAmount });
        }, 10);

    } else {
        // ------------ 向左 (Prev) ------------

        // 檢查：如果已經在最左邊
        if (track.scrollLeft <= 0) {
            track.style.scrollBehavior = "auto"; // 關閉動畫
            track.scrollLeft += singleSetWidth;  // 瞬間彈到第二組開頭
        }

        // 恢復平滑捲動，並執行真正的往左滑
        setTimeout(() => {
            track.style.scrollBehavior = "smooth";
            track.scrollBy({ left: -scrollAmount });
        }, 10);
    }
};

var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus();
  console.log("Modal is shown");
})
