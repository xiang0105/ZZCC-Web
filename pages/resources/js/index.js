var forms = [
  {
    title: "114-2期退費申請單",
    path: "./files/114-2期退費申請書.pdf",
  },
  {
    title: "校外教學(實習)記錄單",
    path: "./files/校外教學(實習)記錄單.docx",
  },
  {
    title: "教學與體驗分享單",
    path: "./files/教與學體驗分享單1.docx",
  },
  {
    title: "講師資料表",
    path: "./files/講師資料表.doc",
  },
  {
    title: "刊物提案單",
    path: "./files/刊物提案單.doc",
  },
  {
    title: "公民素養週講座心得表",
    path: "./files/中正社大公民週講座心得表(空白).doc",
  },
  {
    title: "助教申請資料表",
    path: "./files/助教申請資料表.doc",
  },
  {
    title: "講座調查表",
    path: "./files/臺北市中正社區大學講座調查表.doc",
  }
];

// 1. 選取要插入內容的容器
const downloadListContainer = document.querySelector('.download-list');

// 2. 判斷容器是否存在，避免報錯
if (downloadListContainer) {
    
  // 3. 使用 map 迴圈生成 HTML 字串
  const formsHTML = forms.map(form => {
    return `
      <a href="${form.path}" class="download-item" target="_blank">
          <div class="file-info">
              <i class="fa-regular fa-file-lines download-icon"></i>
              <span class="file-name">${form.title}</span>
          </div>
          <i class="fa-solid fa-download download-icon"></i>
      </a>
    `;
  }).join(''); // 將陣列合併成一個長的字串

  // 4. 將生成的 HTML 放入容器中
  downloadListContainer.innerHTML = formsHTML;
}