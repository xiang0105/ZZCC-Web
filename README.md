# 臺北市中正社區大學 - 課務專區網站 (ZZCC Course Platform)

這是一個為 **臺北市中正社區大學** 設計的現代化課務資訊平台。本專案透過 Python Flask 後端即時爬取舊版學校網站的資料，並轉化為乾淨、響應式（Responsive）的前端介面，解決舊網站手機瀏覽不便與憑證過期的問題，提供學員更流暢的查詢體驗。

## 專案特色

  * **現代化 UI 設計**：使用 Bootstrap 5 打造，支援手機、平板與桌機瀏覽。
  * **即時資料同步**：後端採用爬蟲技術，直接抓取社大官方網站最新課程資訊。
  * **API 整合**：將傳統 HTML 表格資料轉換為標準 JSON API，前後端分離架構。
  * **SSL 憑證相容處理**：後端自動處理舊網站 SSL 憑證問題，確保資料抓取穩定。
  * **雲端部署**：後端 API 部署於 Render，前端可託管於 GitHub Pages。

## 技術架構 (Tech Stack)

### 前端 (Frontend)

  * **HTML5 / CSS3**
  * **JavaScript (ES6+) / jQuery**
  * **Bootstrap 5** (RWD 響應式排版)
  * **Font Awesome 6** (圖示庫)

### 後端 (Backend)

  * **Python 3**
  * **Flask** (輕量級 Web 框架)
  * **BeautifulSoup4** (HTML 解析與爬蟲)
  * **Requests** (HTTP 請求處理)
  * **Flask-CORS** (處理跨域資源共享問題)
  * **Gunicorn** (生產環境 WSGI Server)

-----

## 專案結構

```text
/
├── css/                 # 樣式表 (Bootstrap, Custom CSS)
├── js/                  # 前端腳本 (index.js, Bootstrap JS)
├── images/              # 圖片資源
├── webfonts/            # FontAwesome 字型檔
├── pages/               # 其他分頁 (如關於我們、表單下載等)
├── app.py               # 後端主程式 (Flask API & 爬蟲邏輯)
├── requirements.txt     # Python 套件依賴清單
└── index.html           # 首頁入口
```

-----

## 快速開始 (Installation)

如果您想要在本地端執行此專案，請按照以下步驟操作：

### 1\. 複製專案 (Clone)

```bash
git clone https://github.com/您的帳號/您的專案名稱.git
cd 您的專案名稱
```

### 2\. 設定後端環境

建議使用虛擬環境 (Virtual Environment)：

```bash
# 建立虛擬環境
python -m venv venv

# 啟動虛擬環境 (Windows)
venv\Scripts\activate
# 啟動虛擬環境 (Mac/Linux)
source venv/bin/activate

# 安裝必要套件
pip install -r requirements.txt
```

### 3\. 啟動後端伺服器

```bash
python app.py
```

啟動後，API 將運行於 `http://127.0.0.1:5000`。

### 4\. 啟動前端

  * **方法 A (推薦)**：使用 VS Code 的 "Live Server" 套件開啟 `index.html`。
  * **方法 B**：修改 `js/index.js` 中的 `API_URL` 指向本地伺服器：
    ```javascript
    const API_URL = "http://127.0.0.1:5000/api/courses";
    ```

-----

## API 文件說明

後端提供以下 API 供前端呼叫：

| HTTP Method | Endpoint | 說明 | 參數 |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/courses` | 抓取主頁面課程列表 | 無 |
| `GET` | `/api/course_detail` | 抓取單一課程詳細大綱 | `?id={課程編號}` |
| `GET` | `/api/public_servant_courses` | 抓取公務人員研習課程 | 無 |

**回應範例 (`/api/courses`)**:

```json
[
  {
    "day": "週一",
    "time": "上午09:30起",
    "id": "F2C101",
    "status": "尚餘名額",
    "name": "自然生態輕鬆行",
    "teacher": "林金松",
    "fee": "3000元"
  },
  ...
]
```

-----

## 部署資訊 (Deployment)

本專案後端已部署至 **Render** 雲端平台。

  * **API Base URL**: `https://zzcc-api.onrender.com` (範例)
  * **注意事項**: Render 免費版在閒置 15 分鐘後會自動休眠，再次喚醒可能需要 30-50 秒的啟動時間，請耐心等候。

### 如何部署到 Render?

1.  註冊 Render 帳號並連結 GitHub。
2.  建立新的 **Web Service**。
3.  **Build Command**: `pip install -r requirements.txt`
4.  **Start Command**: `gunicorn app:app`

-----

## 版權聲明

  * 本網站內容來源為 **臺北市中正社區大學**，僅供學習與練習使用。
  * 專案開發：MuXiang
  * Copyright © 2025. All Rights Reserved.