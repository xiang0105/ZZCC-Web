from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import urllib3

# 關閉 SSL 警告 (因為社大舊網站憑證問題)
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

app = Flask(__name__)
# 允許跨網域存取 (CORS) - 讓 index.html, course_detail.html, public_servant.html 可以呼叫這個後端
CORS(app)

# --------------------------
# API 1: 抓取課程列表 (主頁面用)
# --------------------------
@app.route('/api/courses', methods=['GET'])
def get_courses():
    # 中正社大課程總表網址
    target_url = "https://www.zzcc.tp.edu.tw/class/class.asp"
    
    try:
        # verify=False 避免舊網站 SSL 憑證問題
        response = requests.get(target_url, verify=False)
        
        # cp950 是 Windows 繁體中文編碼，支援更多特殊字元
        response.encoding = 'cp950' 
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        courses = []
        # 尋找所有表格列
        rows = soup.find_all('tr')

        for row in rows:
            cols = row.find_all('td')
            # 過濾非課程列 (至少要有 7 欄)
            if len(cols) >= 7:
                row_data = [ele.text.strip() for ele in cols]
                
                # 簡單過濾：第一欄必須包含 "週" (例如 "週一")
                if "週" not in row_data[0]:
                    continue

                course_info = {
                    "day": row_data[0],      # 週一
                    "time": row_data[1],     # 上午09:30起
                    "id": row_data[2],       # F2C101
                    "status": row_data[3],   # 額滿 / 尚餘名額
                    "name": row_data[4],     # 自然生態輕鬆行
                    "teacher": row_data[5],  # 林金松
                    "fee": row_data[6]       # 3000元
                }
                courses.append(course_info)

        return jsonify(courses)

    except Exception as e:
        print(f"Error fetching list: {e}")
        return jsonify({"error": str(e)}), 500

# --------------------------
# API 2: 抓取單一課程詳細資料 (詳細頁面用)
# --------------------------
@app.route('/api/course_detail', methods=['GET'])
def get_course_detail():
    course_id = request.args.get('id')
    if not course_id:
        return jsonify({"error": "No id provided"}), 400

    # 詳細頁面網址
    target_url = f"https://www.cccc.tp.edu.tw/class/lookup.asp?CourseNo={course_id}"
    
    try:
        response = requests.get(target_url, verify=False)
        response.encoding = 'cp950'
        
        soup = BeautifulSoup(response.text, 'html.parser')

        detail_data = {}

        # --- 抓取函數 ---
        def find_content_by_label(label_text):
            # 尋找包含特定文字的 td 標籤
            label_td = soup.find(lambda tag: tag.name == 'td' and label_text in tag.get_text())
            
            if label_td:
                # 找到標題後，抓取它的隔壁欄位 (next_sibling)
                content_td = label_td.find_next_sibling('td')
                if content_td:
                    return content_td.get_text(strip=True)
            return ""

        # 1. 講師資訊
        detail_data['lecturer_name'] = find_content_by_label("講師姓名")
        detail_data['lecturer_edu'] = find_content_by_label("講師學歷")
        detail_data['lecturer_exp'] = find_content_by_label("講師經歷")

        # 2. 課程基本資訊
        detail_data['week'] = find_content_by_label("開課週次")
        detail_data['time'] = find_content_by_label("上課時段")
        detail_data['credit_fee'] = find_content_by_label("學分費用")
        detail_data['extra_fee'] = find_content_by_label("額外費用")
        detail_data['limit'] = find_content_by_label("招生人數")
        
        # 3. 教學內容
        detail_data['concept'] = find_content_by_label("課程理念")
        detail_data['method'] = find_content_by_label("教學方式")
        detail_data['target'] = find_content_by_label("選課要求")
        detail_data['assessment'] = find_content_by_label("評鑑方式") 
        detail_data['references'] = find_content_by_label("參考書目") 

        # 4. 抓取 18 週課表
        syllabus = []
        tables = soup.find_all('table')
        for table in tables:
            table_text = table.get_text()
            if "週次" in table_text and "課程主題" in table_text:
                rows = table.find_all('tr')
                for row in rows:
                    cols = row.find_all('td')
                    if len(cols) >= 3:
                        week = cols[0].get_text(strip=True)
                        if "週次" in week:
                            continue
                            
                        syllabus.append({
                            "week": week,
                            "topic": cols[1].get_text(strip=True),
                            "content": cols[2].get_text(strip=True)
                        })
                break

        detail_data['syllabus'] = syllabus

        return jsonify(detail_data)

    except Exception as e:
        print(f"Error fetching detail: {e}")
        return jsonify({"error": str(e)}), 500

# --------------------------
# API 3: 抓取公務人員研習課程列表 (公務員專區用) - NEW!
# --------------------------
@app.route('/api/public_servant_courses', methods=['GET'])
def get_public_servant_courses():
    # 公務人員研習頁面網址
    target_url = "https://www.zzcc.tp.edu.tw/data/%E5%85%AC%E5%8B%99%E4%BA%BA%E5%93%A1%E7%A0%94%E7%BF%92.asp"
    
    try:
        response = requests.get(target_url, verify=False)
        # 這個特定頁面通常使用 big5 或 cp950
        response.encoding = 'big5' 
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        courses = []
        # 抓取所有列
        rows = soup.find_all('tr')
        
        for row in rows:
            cols = row.find_all('td')
            # 該網頁表格結構通常有 4 欄以上：[0]期別/週次 [1]週次/編號 [2]編號/名稱 [3]名稱/講師...
            # 觀察網頁結構，主要資料列有 5 欄: 期別, 週次, 編號, 名稱, 講師
            if len(cols) >= 5:
                col_texts = [c.text.strip() for c in cols]
                
                # 欄位對應 (根據目標網頁結構)
                # col[0]: 251 (期別)
                # col[1]: 週一 (週次)
                # col[2]: F1A101 (編號)
                # col[3]: 課程名稱
                # col[4]: 講師
                
                week = col_texts[1]
                course_id = col_texts[2]
                name = col_texts[3]
                teacher = col_texts[4]
                
                # 過濾標題列 (標題列包含 "課程編號" 或 "開課週次")
                if "課程編號" not in course_id and course_id:
                    courses.append({
                        "week": week,
                        "id": course_id,
                        "name": name,
                        "teacher": teacher
                    })
        
        return jsonify(courses)

    except Exception as e:
        print(f"Error fetching public servant courses: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # 啟動伺服器，預設 Port 5000
    app.run(debug=True, port=5000)