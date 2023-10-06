import React from "react";
import { Container } from "react-bootstrap";

export default function CourseList() {
  return (
    <>
      <div className="dm">
        <div className="dm-img"></div>
      </div>
      <div className="titlearea">
        <Container>
          <h1>所有課程</h1>
        </Container>
      </div>
      <div className="hr-line"></div>
      <div className="nav-bar">
        <Container className="d-flex">
          <div className="bread-crumb">
            <div className="breadCrumb"></div>
          </div>
          <div className="function-btns">
            <div className="btn filterBtn">
              <div className="icon"></div>
              <p>篩選(0)</p>
            </div>
            <div className="btn orderBtn">
              <div className="icon"></div>
              <p>排序</p>
            </div>
            <div className="btn paginationBtn">每頁顯示(15)筆</div>
          </div>
        </Container>
      </div>
      <div className="course-list">
        <Container>
          <div className="course-list-item">
            <div className="course-list-img"></div>
            <div className="course-list-text">
              <div className="title">初探：射法八節</div>
              <div className="intro">
                且而抱樹小空誰拉邊了就車吉固，蝶貓年真快。師跑亭眼；午哥兆說合眼動把習爪右安頁常許，遠校候「魚隻幾抄園」。登也身司光北具，月枝巴登寺主羽，下早急房訴玩月美夏，葉造新雄給頁來品知游後大飽。圓河毛夕文員快犬訴貝苦坐反再良點實。歡男米己去雲原。
              </div>
              <div className="items">
                <br />
                人數限制：25人
                <br />
                報名截止：2023-00-00
                <br />
                課程時間：2023-00-00 — 2023-00-00
              </div>
              <div className="course-rating">
                <div className="stars">
                  <div className="star">1</div>
                  <div className="star">2</div>
                  <div className="star">3</div>
                  <div className="star">4</div>
                  <div className="star">5</div>
                </div>
                <div className="counting">888人已評價</div>
              </div>
              <div className="bottom">
                <h2 className="price">NT$8000</h2>
                <div className="btn moreBtn">詳細資訊</div>
              </div>
            </div>
          </div>

          <div className="course-list-item">
            <div className="course-list-img"></div>
            <div className="course-list-text">
              <div className="title">初探：射法八節</div>
              <div className="intro">
                且而抱樹小空誰拉邊了就車吉固，蝶貓年真快。師跑亭眼；午哥兆說合眼動把習爪右安頁常許，遠校候「魚隻幾抄園」。登也身司光北具，月枝巴登寺主羽，下早急房訴玩月美夏，葉造新雄給頁來品知游後大飽。圓河毛夕文員快犬訴貝苦坐反再良點實。歡男米己去雲原。
              </div>
              <div className="items">
                <br />
                人數限制：25人
                <br />
                報名截止：2023-00-00
                <br />
                課程時間：2023-00-00 — 2023-00-00
              </div>
              <div className="course-rating">
                <div className="stars">
                  <div className="star">1</div>
                  <div className="star">2</div>
                  <div className="star">3</div>
                  <div className="star">4</div>
                  <div className="star">5</div>
                </div>
                <div className="counting">888人已評價</div>
              </div>
              <div className="bottom">
                <h2 className="price">NT$8000</h2>
                <div className="btn moreBtn">詳細資訊</div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className="pagination"></div>
    </>
  );
}
