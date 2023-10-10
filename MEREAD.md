# Todo

## Luna

### 20231006

### 商品頁

- [ ] navBar 全站搜索(從前端取得 name 值，到後端篩選資料回傳)
- [v] 篩選新品上架卡片(後端計算日期篩選資料回傳到前端)
- [v] 篩選 Modal 切版(電腦)
- [v] 排序 Modal 切版(電腦)
- [v] 廣告 Scroll 樣式
- [V] 優惠卡片 Scroll 樣式
- [ ] 相關商品推薦條件?
- [V] 點擊卡片切換到商品詳情

### 產品分類(點擊分類:更改網址、列出該類別所有商品)

- [ ] button 設定路由:/product/category/${tpye}點擊更改網址
- [ ] useRouter 獲取當前路由，api 傳送($type)值到後端
- [ ] 利用函式(WHERE category_id === ${type})篩選成 catedata，用 axios 發送請求儲存到 cateData

### Product List

#### 商品名稱搜尋

- [ ]
- [ ]


#### 篩選

- [ ] useRouter 取得路由:/product/category/${tpye}
- [ ] 關聯資料表找出對應屬性、屬性值，將結果渲染到頁面上
- [ ] 點擊 attr-btn 取得 value，api 將值回傳到後端(有空做:顯示結果筆數)
- [ ] 後端篩選出 filterdata 回傳，前端 axios 接收、改變 filterData 狀態值

#### 排序



#### 加入購物車

#### 加入收藏

#### 標籤(條件設定?，切換狀態)

- [ ] HOT 熱銷
- [ ] SALES 促銷

### 產品詳情

#### 頁面渲染(取得商品類別對應的屬性)

- [ ] useRouter 取得${id}
- [ ] api 回傳${id}，找出對應 category_id，關聯資料表

#### 點擊按鈕取值

#### 加入購物車

#### 加入收藏

## 筆記

### 後端 data

- [v] alldata
- [v] newdata
- [ ] catedata (/category/[cate])
- [ ] onedata(/[pid])

### 前端
#### prop 方式接收

- launched-card
- filter-card

### 元件

- launched-card 找 newdata
- filter-card 找 limitdata
- filter-card 找 catedata

### 20231009

#### 所有商品，每頁顯示 limit 筆

- [v] 在 filter-btn 中使用 e.target.value 取得 select option 的值，使用 useEffect 確保 limit 為最新的值，並依賴 localLimit 改變及時回傳到 index
- [v] 在 localLimit 值更新時，回傳到 filter-btn 確保即時更新
- [v] 用 axios 回傳，req.query 將 limit 值傳至 modal 的 product.js，在 index 用 useEffet 將 limit 放入依賴，確保每次更新 product.js 也能更新
- [v] product 中的 limit 放入 getPage 函式中，的參數改變資料庫篩選條件

#### 所有商品分頁

- [v] Object.entries(allProduct).length 抓出所有產品筆數
- [v] luna-pagination 用迴圈 push 出頁數陣列 pageIndex，在用 map 建立 button 標籤
- [v] 建立公式(Math.ceil 計算分頁，判斷餘數大於 0 時，page+1)
- [v] 點擊 button 時取得 page 的值，傳回 index 再由 index 回傳{limit, page}至後端 req.query
- [v] 在後端計算，用 parseInt 確保回傳值為整數，將計算出的 offset 值帶入 getPage()

### 20231010

#### 所有商品分頁
- [v] 分頁dubug，慕朵庭寬測試OK

#### 所有商品排序
- [v] modal-sort點擊按鈕取得button值，更新sortState狀態，但是在onClick套用按鈕時，才將更新的sortValue用props傳到filter-btn，相同方式傳到index，最後index傳回後端product.js
- [v] 後端product.js，將getPage函式更改為getFilter，新增order參數，用前端傳回來的sort值，判斷button值改成sql格式(ex:{price:'acs'})，篩選出filterdata
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]

### 問題

-
-
-
-
-
