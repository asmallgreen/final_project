# Todo

## KuanKuan

### 20231014

### 會員優惠券
#### 必做
- [X] 訂單使用過的優惠券還沒串真的order-list
#### 不DEMO就不會死
- [ ] 功能：分頁


### 會員訂單
### 必做
- [X] UI
- [X] order-list
- [X] order-detail

### public優惠券
- [ ]功能：領取後disable

### 購物車
#### 必做功能
- [X] 功能：規格Active
- [X] 功能：在商品細節頁挑選隨機商品並且寫入規格數量等
- [ ] 功能：限要先制選規格數量才能加入購物車 if (selectValue.length < value.map.length) 
- [ ] 功能：加入購物車後icon顯示數量

#### 不DEMO就不會死
- [ ] 功能：同一商品ID只能一次一種規格，新選的規格會直接覆蓋舊規格並且額外添加數量( if(product_id && detail ===)product quantity+1)
- [ ] 功能：登出後洗掉cart，不然下一個登入的會繼承
- [ ] 功能：有選課程就只能用信用卡付款 if course cart > 0 宅配disable
- [ ] 功能：使用優惠券後，刪除該優惠券

### TODO LATER
- [ ] 撞牆
- [X] 訂單：DESC
- [ ] 購物車UI：購物車版還沒修，還沒有訂單細節手風琴
- [ ] 購物車UI+功能：購物車信用卡沒地方輸入
- [ ] 優惠券功能：會員優惠券、訂單分頁
- [ ] 購物車UI：加入購物車alert改掉
- [ ] 購物車功能：購物車input正規表達
- [X] 優惠券UI：過期的顯示深色且標註


## DEMO DETAIL
優惠券一定要DEMO硬刪，不然購物車會跑出來過期優惠券可以選。不然就是要再多寫很多CODE

優惠券DEMO  新增2張Coupon  結訓大慶祝，全商品5折；結訓慶祝，商品現折5000