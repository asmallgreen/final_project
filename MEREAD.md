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

#### 每頁顯示幾筆

- [ ] 已取得${limit}，api 傳送到後端
- [ ] 函式(WHERE id LIMIT ${limit})篩選成 filterdata，用 axios 發送請求儲存到 filterData

#### 分頁()

- [ ] 按鈕的頁數狀態
- [ ] 更新 filterData 狀態

#### 篩選

- [ ] useRouter 取得路由:/product/category/${tpye}
- [ ] 關聯資料表找出對應屬性、屬性值，將結果渲染到頁面上
- [ ] 點擊 attr-btn 取得 value，api 將值回傳到後端(有空做:顯示結果筆數)
- [ ] 後端篩選出 filterdata 回傳，前端 axios 接收、改變 filterData 狀態值

#### 排序

- [ ] 點擊按鈕取得${sort}，api 回傳後端
- [ ] 後端寫判斷，使用函式(ORDER BY 'ASC')篩選出 filterdata
- [ ] 前端 axios 接收，切換 filterData 狀態值

#### 加入購物車

#### 加入收藏

#### 標籤(條件設定?，切換狀態)

- [ ] HOT 熱銷
- [ ] SALES 促銷

### 產品詳情

#### 頁面渲染(取得商品類別對應的屬性)
- [ ] useRouter取得${id}
- [ ] api回傳${id}，找出對應category_id，關聯資料表
#### 點擊按鈕取值
#### 加入購物車
#### 加入收藏

##筆記
###後端data
- [ ] alldata
- [ ] newdata
- [ ] limitdata
- [ ] catedata (/category/[cate])
- [ ] onedata(/[pid])
###前端
- [ ] index
####prop方式接收
- [ ] launched-card 
- [ ] filter-card
###元件
- [ ] launched-card找newdata
- [ ] filter-card找limitdata
- [ ] filter-card找catedata

### 20231009
#### 所有商品，每頁顯示limit筆
- [v] 在filter-btn中使用 e.target.value取得select option的值，使用useEffect確保limit為最新的值，並依賴localLimit改變及時回傳到index
- [v] 在localLimit值更新時，回傳到filter-btn確保即時更新
- [v] 用axios回傳，req.query將limit值傳至modal的product.js，在index用useEffet將limit放入依賴，確保每次更新product.js也能更新 
- [v] product中的limit放入getPage函式中，的參數改變資料庫篩選條件

#### 所有商品分頁
- [ ] 先處理頁籤
- [ ] 
- [ ] 
- [ ] 
- [ ] Object.entries(allProduct).length抓出所有產品筆數
- [ ] Math.ceil計算分頁，判斷餘數大於0時，page+1
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
