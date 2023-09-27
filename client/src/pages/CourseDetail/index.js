import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function CourseDetail() {
  //tabs
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className="course-detail-body">
      <div className="container">
        <div className="bread-crumb">
          <div className="breadCrumb"></div>
        </div>
        <div className="course-detail-info">
          <div className="left">
            <div className="course-detail-img"></div>
          </div>
          <div className="right">
            <div className="course-detail-text">
              <div className="title">初探：射法八節</div>
              <div className="intro">
                且而抱樹小空誰拉邊了就車吉固，蝶貓年真快。師跑亭眼；午哥兆說合眼動把習爪右安頁常許，遠校候「魚隻幾抄園」。登也身司光北具，月枝巴登寺主羽，下早急房訴玩月美夏，葉造新雄給頁來品知游後大飽。圓河毛夕文員快犬訴貝苦坐反再良點實。
                <br />
                <br />
                歡男米己去雲原。花今詞兌爪時雪毛菜尼像夏我爬朱，冬發公害亭八洋院果根親具姊坐久老，故虎兆五水冒生吉菜「包子連畫木首反戊布占」己次坐課抱冬跑冬荷昔；瓜麻扒雄寺眼牛乍平里位見視忍科。雲呢己豆心尾。里語借十用昌種假冰尺棵爬心竹蝴幼地，他斥九，土喝明哭奶寫少固因百乍好年道，歡言丁了躲助內連童棵果采聽「物」訴扒光，可屋像果家封乾畫由戶公房詞口造方象了；歌進送綠黃帶祖好休黑八一休。
              </div>
              <div className="course-detail-items">
                人數限制：25人
                <br />
                報名截止：2023-00-00
                <br />
                課程時間：2023-00-00 — 2023-00-00
                <br />
                課程長度　2小時
                <br />
                上課地點　北道場
                <br />
                授課教師　衛宮士郎
                <br />
              </div>
              <div className="course-rating">
                <h2 className="price">NT$8000</h2>
                <div className="stars">
                  <div className="star">1</div>
                  <div className="star">2</div>
                  <div className="star">3</div>
                  <div className="star">4</div>
                  <div className="star">5</div>
                  <div className="counting">888人已評價</div>
                </div>
              </div>
            </div>
            <div className="btns">
              <div className="btn course-detail-btn like-btn">加入收藏</div>
              <div className="btn course-detail-btn cart-btn">加入購物車</div>
            </div>
            {/* <div className="course-detail-items">
              <span>人數限制　25人</span>
              <span>報名截止　2023-00-00</span>
              <span>課程時間　2023-00-00 — 2023-00-00</span>
              <span>課程長度　2小時</span>
              <span>上課地點　北道場</span>
              <span>授課教師　衛宮士郎</span>
              <span>NT$8000</span>
            </div>
            <div className="btns">
              <div className="like-btn"></div>
              <div className="cart-btn"></div>
            </div> */}
          </div>
        </div>
        <div className="course-detail-tabs">
          <Box sx={{ bgcolor: "background.paper", width: 500 }}>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                Item One
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                Item Two
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                Item Three
              </TabPanel>
            </SwipeableViews>
          </Box>
        </div>
      </div>
    </div>
  );
}
