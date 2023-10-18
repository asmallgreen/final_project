# Todo

## Luna

### 20231006

### 商品頁

- [ ] navBar 全站搜索(從前端取得 name 值，到後端篩選資料回傳)
- [x] 篩選新品上架卡片(後端計算日期篩選資料回傳到前端)
- [x] 篩選 Modal 切版(電腦)
- [x] 排序 Modal 切版(電腦)
- [x] 廣告 Scroll 樣式
- [x] 優惠卡片 Scroll 樣式
- [ ] 相關商品推薦條件?
- [x] 點擊卡片切換到商品詳情

### 產品分類(點擊分類:更改網址、列出該類別所有商品)

- [ ] button 設定路由:/product/category/${tpye}點擊更改網址
- [ ] useRouter 獲取當前路由，api 傳送($type)值到後端
- [ ] 利用函式(WHERE category_id === ${type})篩選成 catedata，用 axios 發送請求儲存到 cateData

### Product List

#### 商品名稱搜尋

- [ ]
- [ ]


#### 篩選

- [x] useRouter 取得路由:/product/category/${tpye}
- [ ] 關聯資料表找出對應屬性、屬性值，將結果渲染到頁面上
- [x] 點擊 attr-btn 取得 value，api 將值回傳到後端(有空做:顯示結果筆數)
- [x] 後端篩選出 filterdata 回傳，前端 axios 接收、改變 filterData 狀態值

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

- [x] alldata
- [x] newdata
- [x] catedata (/category/[cate])
- [x] onedata(/[pid])

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

- [x] 在 filter-btn 中使用 e.target.value 取得 select option 的值，使用 useEffect 確保 limit 為最新的值，並依賴 localLimit 改變及時回傳到 index
- [x] 在 localLimit 值更新時，回傳到 filter-btn 確保即時更新
- [x] 用 axios 回傳，req.query 將 limit 值傳至 modal 的 product.js，在 index 用 useEffet 將 limit 放入依賴，確保每次更新 product.js 也能更新
- [x] product 中的 limit 放入 getPage 函式中，的參數改變資料庫篩選條件

#### 所有商品分頁

- [x] Object.entries(allProduct).length 抓出所有產品筆數
- [x] luna-pagination 用迴圈 push 出頁數陣列 pageIndex，在用 map 建立 button 標籤
- [x] 建立公式(Math.ceil 計算分頁，判斷餘數大於 0 時，page+1)
- [x] 點擊 button 時取得 page 的值，傳回 index 再由 index 回傳{limit, page}至後端 req.query
- [x] 在後端計算，用 parseInt 確保回傳值為整數，將計算出的 offset 值帶入 getPage()

### 20231010

#### 所有商品分頁
- [x] 分頁dubug，慕朵庭寬測試OK
#### 所有商品排序
- [x] modal-sort點擊按鈕取得button值，更新sortState狀態，但是在onClick套用按鈕時，才將更新的sortValue用props傳到filter-btn，相同方式傳到index，最後index傳回後端product.js
- [x] 後端product.js，將getPage函式更改為getFilter，新增order參數，用前端傳回來的sort值，判斷button值改成sql格式(ex:{price:'acs'})，篩選出filterdata
#### 商品詳情
- [x] 從/product/index.js的卡片連結至[:pid]
- [x] 使用useRouter取得網址(商品id)，回傳id值到後端getOne函式選出對應id商品資料
- [x] UI資料連接資料庫
- [x] 按鈕切換狀態
    - [x] 數量+/-改變數字狀態
    - [x] 屬性按鈕 按鈕狀態可切換(一次只能一個選項) 
- [x] filter-card點擊連結到商品資訊

### 20231011

#### 所有商品篩選功能
- [x] 所有商品的篩選只有四大類，modal-attr
- [x] modal-attry在onclick取得button值，傳到filter-btn和index，在從後端抓資料
- [x] 點選查看結果才會跑資料
- [ ] modal切換時，無法正常運行功能
- [x] 建立屬性中介表、屬性資料表
- [ ] modal裡面的title和attr-btn用資料庫取值(不同category屬性不同)

#### 分類頁
- [ ] 麵包屑用useRouter抓當下路由，判斷後面的值
- [ ] 
- [ ] 


### 20231011

#### 商品詳情頁
- [x] 關聯資料庫測試，從product_arrow-length資料表中抓到所有arrow_length_id=1(長度85mm)的product_id

### 20231012

#### 商品詳情頁
- [x] 關聯資料庫，從product_attribute資料表中抓到所有category_id=${cate}(路由:cate的值ex:cate1是弓)的name
- [x] 藉由category_id判斷產品詳請所要的規格，以及規格的值

### 20231013

### 問題

- [ ] 重整網頁時luna-pagination無法即時取得pageLength，導致按鈕陣列為空值，改變limit值後可以
- [ ] luna-pagination的handlePrev/handleNext函式中的pageLength無法被及時更新，點選後不變
- [ ]
- [ ]

### TODO LATER
- [ ] filter-btn篩選商品(抓dataLength)
- [ ] modal-attr查看{dataLength}筆結果
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
