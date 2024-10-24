// ==UserScript==
// @name            妖火网增强脚本Plus
// @namespace       https://www.yaohuo.me/
// @version         1.3.1
// @description     让妖火再次变得伟大(手动狗头.jpg)
// @author          柠檬没有汁@27894
// @match           *://yaohuo.me/*
// @match           *://*.yaohuo.me/*
// @icon            https://yaohuo.me/css/favicon.ico
// @run-at          document-body
// @license         MIT
// @grant           none
// @noframes
// @homepage        https://www.yaohuo.me/bbs/userinfo.aspx?touserid=27894
// @downloadURL     https://greasyfork.org/zh-CN/scripts/504289-妖火网增强脚本plus
// @updateURL       https://update.greasyfork.org/scripts/504289/妖火网增强脚本plus.user.js
// @supportURL      https://www.yaohuo.me/bbs/userinfo.aspx?touserid=27894
// @require         https://code.jquery.com/jquery-3.7.1.min.js
// ==/UserScript==

/* ================================================== 变量开始 ================================================== */

// 脚本默认设置
const defaultSetting = {
  firstLoadScript: true, // 第一次加载脚本
  showSettingIcon: true, // 显示设置 logo
  settingIconSize: 50, // 设置 logo 大小
  showTopAndDownBtn: true, // 显示一键回到顶部/底部
  hideXunzhang: true, // 隐藏勋章
  showBookViewUbb: false, // 发帖 ubb 展开
  showBookViewFace: false, // 发帖表情展开
  showHuifuUbb: false, // 回帖 ubb 展开
  imgThumbWidth: 100, // 图片缩小后显示宽度
  showFaceList: true, // 回帖表情展开
  useRight: false, // 下一页显示在右边
  autoLoadMoreBookList: false, // 帖子列表自动加载更多
  autoLoadMoreHuifuList: false, // 回复列表自动加载更多
  openLayerForBook: false, // pc 端帖子在弹窗中打开

  imgUploadSelOpt: 0, // 使用图床
  imgUploadApiUrl: ["https://aapi.helioho.st/upload.php", "https://img.ink/api/upload"],
  suimoToken: "", // 水墨图床 token

  showMoreSetting: false, // 高级设置
  oneClickCollectMoney: false, // 一键吃肉
  showChuiniuHistory: false, // 显示吹牛发布者历史
  showHuifuCopy: false, // 复读机(回复+1)
  huifuCopyAutoSubmit: false, // 复读机自动提交
};
// 自定义样式
const customCSS = `
  .reset{
    margin:0;
    padding:0;
  }
  /* 设置弹出框 样式 */
  .setting-div ul li{
    display:flex;
    margin:10px auto;
    justify-content: center;
    align-items: center;
  }
  .setting-div ul li + .setting-li-between{
    padding:0 10px;
    justify-content: space-between;
  }
  .setting-div ul li + .setting-li-tips{
    font-size: 12px;
    line-height: 14px;
    display: block;
    padding: 0 10px;
    margin: -10px 0 0;
    color: red;
    text-align: left;
  }
  .setting-li-title hr{
    flex:1;
  }
  .setting-li-title hr:nth-of-type(1){
    margin-right:10px;
  }
  .setting-li-title hr:nth-of-type(2){
    margin-left:10px;
  }
  .setting-cancel-btn {
    background-color: #999;
    color: #fff;
    border-radius:5px;
    padding: 5px 10px;
  }
  .setting-confirm-btn {
    background-color: #1677ff;
    color: #fff;
    border-radius:5px;
    padding: 5px 10px;
    margin-left: 10px;
  }
  .setting-li-input{
    width:50px;
    padding-left:10px;
    height:15px;
  }
  ::-webkit-input-placeholder {
    font-size:12px;
  }
  ::-moz-placeholder {
    font-size:12px;
  }

  /* 开关 样式 */
  .switch {
    position: relative;
    float: left;
    width: 60px;
    margin: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  .switch-checkbox {display: none;}
  .switch-label {
    display: block;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid #999999;
    border-radius: 20px;
  }
  .switch-inner {
    display: block;
    width: 200%;
    margin-left: -100%;
  }
  .switch-inner::before,
  .switch-inner::after {
    display: block;
    float: right;
    width: 50%;
    height: 20px;
    line-height: 20px;
    padding: 0;
    font-size: 14px;
    color: white;
    font-family: Trebuchet, Arial, sans-serif;
    font-weight: bold;
    box-sizing: border-box;
  }
  .switch-inner::after {
    content: attr(data-on);
    padding-left: 10px;
    background-color: #00e500;
    color: #FFFFFF;
    text-align:left;
  }
  .switch-inner::before {
    content: attr(data-off);
    padding-right: 10px;
    background-color: #EEEEEE;
    color: #999999;
    text-align: right;
  }
  .switch-switch {
    position: absolute;
    top: 0;
    bottom: 0;
    /*right: 72px;*/
    display: block;
    width: 14px;
    height: 14px;
    margin: 3px;
    background: #FFFFFF;
    border: 2px solid #999999;
    border-radius: 50%;
  }
  .switch-checkbox:checked + .switch-label .switch-inner {
    margin-left: 0;
  }
  .switch-checkbox:checked + .switch-label .switch-switch {
    right: 0px;
  }
  /* 复读机按钮 样式 */
  .huifu-copy{
    padding:5px 10px;
    text-align:center;
    color:#fff;
    margin-left:20px;
    background-color: #407088;
    border-radius: 5px;
    white-space:nowrap;
  }

  .custom-toggle-btn{
    background-image: linear-gradient(#f4f4f4,#ececec);
    display: inline-block;
    overflow: visible;
    margin: 0 5px 7px;
    padding: .5em 1em;
    outline: 0;
    border: 1px solid #d4d4d4;
    color: orangered;
    text-decoration: none;
    white-space: nowrap;
    font: 11px/normal sans-serif;
    cursor: pointer;
    border-radius: 5px;
  }
  /* 表情增强 样式 */
  .facelist-div{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
    grid-gap: 2px;
    /*display: flex;
    justify-content: space-between;
    flex-wrap: wrap;*/
    padding: 5px;
    margin: 0 5px 10px;
    font-size: 12px;
    border: 1px solid #eee;
    border-radius: 5px;
  }
  .facelist-img{
    width:40px;
    height:40px;
  }
  /* ubb 增强 样式 */
  .ubb-list-div{
    display:flex;
    flex-wrap: wrap;
    gap: 4px 4px;
    justify-content: space-between;
    margin: 0 1%;
    padding:5px;
    font-size:12px;
    border: 1px solid #d4d4d4;
    border-radius: 8px;
  }
  .ubb-item{
    height:25px;
    line-height:25px;
    /*margin:0 5px 5px 0;*/
    padding:0 10px;
    display:inline-block;
    border: 1px solid #1abc9c;
    color: #333;
    text-decoration: none;
    border-radius:30px;
  }

  .clear-setting{
    color:#3d68a8;
    margin-left:-4px;
  }

  /* 等待提示框 样式 */
  .wait-box-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
  }
  .wait-box-modal {
    background: white;
    padding: 20px 20px 10px;
    border-radius: 10px;
    text-align: center;
  }
  .wait-box-spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-left-color: #09f;
    animation: spin 1s linear infinite;
    margin: 0 auto;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .huifu-ubb-list-div{
    margin: 0 1%;
    padding:10px;
    font-size:12px;
    border: 1px solid #d4d4d4;
    border-radius: 8px;
  }
  .huifu-ubb-list-title{
    height:14px;
    display:flex;
    justify-content: center;
    align-items: center;
    color:red;
  }
  .huifu-ubb-list-title hr{
    flex:1;
  }
  .huifu-ubb-list-title hr:nth-of-type(1){
    margin-right:10px;
  }
  .huifu-ubb-list-title hr:nth-of-type(2){
    margin-left:10px;
  }
  .huifu-ubb-box{
    display:flex;
    flex-wrap: wrap;
    gap: 4px 4px;
    justify-content: space-between;
    margin:6px 0;
  }

  .input-popup-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  .input-popup {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 600px;
    max-width:90%;
  }
  .input-popup-label {
    display: block;
    font-weight: bold;
  }
  .input-popup-textarea {
    width: 100%;
    min-height: 40px;
    resize: vertical;
  }
  .input-popup-buttons {
    text-align: center;
  }
  .input-popup-submit-btn, .input-popup-cancel-btn {
    margin: 0 10px;
    border:0;
  }
  .input-popup-submit-btn{
    background-color: #1677ff;
    color: #fff;
    border-radius: 5px;
    padding: 5px 10px;
    margin-left: 10px;
  }
  .input-popup-cancel-btn {
    background-color: #999;
    color: #fff;
    border-radius: 5px;
    padding: 5px 10px;
  }
`;
// 论坛自带表情
const defaultFaceList = [
  { name: "踩", url: "face/踩.gif" },
  { name: "狂踩", url: "face/狂踩.gif" },
  { name: "淡定", url: "face/淡定.gif" },
  { name: "囧", url: "face/囧.gif" },
  { name: "不要", url: "face/不要.gif" },
  { name: "重拳出击", url: "face/重拳出击.gif" },
  { name: "砳砳", url: "face/砳砳.gif" },
  { name: "滑稽砳砳", url: "face/滑稽砳砳.gif" },
  { name: "沙发", url: "face/沙发.gif" },
  { name: "汗", url: "face/汗.gif" },
  { name: "亲亲", url: "face/亲亲.gif" },
  { name: "太开心", url: "face/太开心.gif" },
  { name: "酷", url: "face/酷.gif" },
  { name: "思考", url: "face/思考.gif" },
  { name: "发呆", url: "face/发呆.gif" },
  { name: "得瑟", url: "face/得瑟.gif" },
  { name: "哈哈", url: "face/哈哈.gif" },
  { name: "泪流满面", url: "face/泪流满面.gif" },
  { name: "放电", url: "face/放电.gif" },
  { name: "困", url: "face/困.gif" },
  { name: "超人", url: "face/超人.gif" },
  { name: "害羞", url: "face/害羞.gif" },
  { name: "呃", url: "face/呃.gif" },
  { name: "哇哦", url: "face/哇哦.gif" },
  { name: "要死了", url: "face/要死了.gif" },
  { name: "谢谢", url: "face/谢谢.gif" },
  { name: "抓狂", url: "face/抓狂.gif" },
  { name: "无奈", url: "face/无奈.gif" },
  { name: "不好笑", url: "face/不好笑.gif" },
  { name: "呦呵", url: "face/呦呵.gif" },
  { name: "感动", url: "face/感动.gif" },
  { name: "喜欢", url: "face/喜欢.gif" },
  { name: "疑问", url: "face/疑问.gif" },
  { name: "委屈", url: "face/委屈.gif" },
  { name: "你不行", url: "face/你不行.gif" },
  { name: "流口水", url: "face/流口水.gif" },
  { name: "潜水", url: "face/潜水.gif" },
  { name: "咒骂", url: "face/咒骂.gif" },
  { name: "耶耶", url: "face/耶耶.gif" },
  { name: "被揍", url: "face/被揍.gif" },
  { name: "抱走", url: "face/抱走.gif" },
];
// 上传表情
const diyFaceList = [
  {
    url: "http://static2.51gonggui.com/FhBfMfl4sGC3QJVTMaLqEKkE90Ia#.gif",
    name: "摸鱼",
  },
  {
    url: "http://static2.51gonggui.com/FmNyrjU8Wq0m3PiwHQJwDhHdv-EJ#.gif",
    name: "稽舞",
  },
  {
    url: "http://static2.51gonggui.com/FoKvdu89eiq0q-24IfOM2mFB0vIq#.gif",
    name: "色稽",
  },
  {
    url: "http://static2.51gonggui.com/FrZ6GDJiOAz3pp4e5_8uSShSXXXk#.gif",
    name: "撒娇",
  },
  {
    url: "http://static2.51gonggui.com/FiZiSSyXSa8eCzwOXmIfOOpfA_7a#.gif",
    name: "稽狗",
  },
  {
    url: "http://static2.51gonggui.com/FqNDzswUNJ-AsSHXyxXB4Qm1X0y-#.gif",
    name: "没钱",
  },
  {
    url: "http://static2.51gonggui.com/Fsq-HyBc5lP6vZY_qeWofOM9mRVH#.gif",
    name: "骚舞",
  },
  {
    url: "http://static2.51gonggui.com/FhCk4emkrO9f8ICFxKlm8wBcTOgT#.gif",
    name: "吃屎",
  },
  {
    url: "http://static2.51gonggui.com/FkEHwSlEfQ7bWya6-wg366Xy91qW#.gif",
    name: "鄙视",
  },
  {
    url: "http://static2.51gonggui.com/Fi2hY7M9DPgD9s0aCWemwk2iYUDW#.gif",
    name: "听歌",
  },
  {
    url: "http://static2.51gonggui.com/Fhry6EpdUBqFCt3OOyQTkLZMZGFR#.gif",
    name: "伸头",
  },
  {
    url: "http://static2.51gonggui.com/FhgYnWJ-apnyjSXOpInJhLbfUQFY#.gif",
    name: "鼓掌",
  },
  {
    url: "http://static2.51gonggui.com/FvSxOEIhyA7ID1J8emIME7tBT7Io#.gif",
    name: "踢腿",
  },
  {
    url: "http://static2.51gonggui.com/FunDHky9UKkB-4zj-bfSb82u81Xg#.gif",
    name: "男同",
  },
  {
    url: "http://static2.51gonggui.com/FgXUeACmKWWMDT9hrpVAnQp4dCqF#.gif",
    name: "手枪",
  },
  {
    url: "http://static2.51gonggui.com/Fg_qtra3abNozPxaoEMVKO7VIsuX#.gif",
    name: "拍头",
  },
  {
    url: "http://static2.51gonggui.com/FnNg1vOiuOlSe7WFWRyNZfO_4H3U#.gif",
    name: "躺平",
  },
  {
    url: "http://static2.51gonggui.com/Fj7WAkv87tpL1I26WQgSaXlsyYBL#.gif",
    name: "追稽",
  },
  {
    url: "http://static2.51gonggui.com/FgwFBazeUavJcw-SL7FS6wUkcUTk#.gif",
    name: "司稽",
  },
  {
    url: "http://static2.51gonggui.com/FjXNVx-MUgAVq62aNqekSPOUjDAC#.gif",
    name: "乞讨",
  },
  {
    url: "http://static2.51gonggui.com/FjudMlJdd8dLXuGjyASN7JldAxqe#.gif",
    name: "跪稽",
  },
  {
    url: "http://static2.51gonggui.com/Fm8DQQwyYthk8Q97ZLScgCDXsv4_#.gif",
    name: "刀你",
  },
  {
    url: "http://static2.51gonggui.com/FqTaBgs1l8bqeDYBxcWzxF4Wgt6_#.gif",
    name: "冲刺",
  },
  {
    url: "http://static2.51gonggui.com/Fmw152FIzN1gpFrbCKlp7cmqlCxc#.gif",
    name: "转圈",
  },
  {
    url: "http://static2.51gonggui.com/Fmf5aWS5yqycKebxTno7un53h9HW#.gif",
    name: "吃稽",
  },
  {
    url: "http://static2.51gonggui.com/FhUkLD2khZ7hn1uzArWkT47Pd9jq#.gif",
    name: "犯贱",
  },
  {
    url: "http://static2.51gonggui.com/FihrjZwpB1jMdOF9QvtQG3J32z4q#.gif",
    name: "牛掰",
  },
  {
    url: "http://static2.51gonggui.com/FlX6e1Ip6Z8gvl7lkimmCifwBhFt#.gif",
    name: "拥抱",
  },
  {
    url: "http://static2.51gonggui.com/FoIs-hNK7fhW8jwxEgDLRxARFcve#.gif",
    name: "拍头",
  },
  {
    url: "http://static2.51gonggui.com/Fgx4XlxG9461Y_TJsg0hGxPTylYi#.gif",
    name: "摇头",
  },
  {
    url: "http://static2.51gonggui.com/Fvrng91QU_PKY9Uwat77VTVouj5k#.gif",
    name: "挠头",
  },
  {
    url: "http://static2.51gonggui.com/FkyiMRaJI1BfuA6T3w4Z9mJh1qbg#.gif",
    name: "上学",
  },
  {
    url: "http://static2.51gonggui.com/FpZEifxiFGs1BWtHjFsk5tJJNKSE#.gif",
    name: "流汗",
  },
  {
    url: "http://static2.51gonggui.com/FiBZZ6mBTB5R5bu5lGkybboOwLwm#.gif",
    name: "摩擦",
  },
  {
    url: "http://static2.51gonggui.com/FmMtly844_wS6LfLLtLSwgzcXSqg#.gif",
    name: "喝饮料",
  },
  {
    url: "http://static2.51gonggui.com/FqyckEvAxFVyD1SmA9m2jInv_Crb#.gif",
    name: "猛狗",
  },
  {
    url: "http://static2.51gonggui.com/FmfsKjv4ymuWR80UGY-sea-I_Ey5#.gif",
    name: "妲己",
  },
  {
    url: "http://static2.51gonggui.com/FkEmzRCL3eJGlgkHHnHTy94sXwE1#.gif",
    name: "街舞",
  },
  {
    url: "http://static2.51gonggui.com/FgiAIOkFg8qG3UZKQx24ImVDrDRj#.gif",
    name: "功德",
  },
  {
    url: "http://static2.51gonggui.com/Fl2Zonx2Y8z-xZrSQnGBWzsnRKC9#.gif",
    name: "晃饮料",
  },
  {
    url: "http://static2.51gonggui.com/FvMXbnIX8RavSBAhflxf1zomD1ov#.gif",
    name: "扇子",
  },
  {
    url: "http://static2.51gonggui.com/FmD3h-QCVdJ-ehjLh8_G-nQzynuv#.gif",
    name: "膜拜",
  },
  {
    url: "http://static2.51gonggui.com/FoGXe8yRSIomTZFM78TZVyP-kwlz#.gif",
    name: "醒醒",
  },
  {
    url: "http://static2.51gonggui.com/Fim_ZRiJugrWJkDtq4SlqbOziuZ3#.gif",
    name: "巴掌",
  },
  {
    url: "http://static2.51gonggui.com/FpVLTimqXFvRJB9PxWDKMherZoRi#.gif",
    name: "鼓掌",
  },
  {
    url: "http://static2.51gonggui.com/Fit100hjJ-T5RwQxeNdoVWplvNvU#.gif",
    name: "该死",
  },
  {
    url: "http://static2.51gonggui.com/FkeVK5icB5-Pc7mbZitDTX1AqfNO#.gif",
    name: "红酒",
  },
  {
    url: "http://static2.51gonggui.com/FnjJRSH3_CLjYyyQzVjD8mtY-PdB#.gif",
    name: "开心",
  },
  {
    url: "http://static2.51gonggui.com/Foqd_tGWrk-ARnNrt-XraMCDzhUS#.gif",
    name: "紧张",
  },
  {
    url: "http://static2.51gonggui.com/FsCE3iHM0REN077WKr0bssyKiR7Z#.gif",
    name: "伤心2",
  },
  {
    url: "https://p6.itc.cn/q_70/images03/20210723/3b9017a6580644e4af8b43d73b92c0a9.gif",
    name: "看戏",
  },
  {
    url: "https://p0.itc.cn/q_70/images03/20210723/4874b66b12f04be1aab989d289e8635a.gif",
    name: "顶你",
  },
  {
    url: "https://pic2.ziyuan.wang/user/guest/2024/04/kwyjjlck_81f49e01db86c.gif",
    name: "哭死",
  },
  {
    url: "https://p2.itc.cn/q_70/images03/20210723/f9c4a2e9879f438c9f151366442f311e.gif",
    name: "看不见",
  },
  {
    url: "https://p8.itc.cn/q_70/images03/20210723/189ca0ed210142999a1661d2bd3cf852.gif",
    name: "蹲坑",
  },
  {
    url: "https://pic2.zhimg.com/v2-568bb2311e00c3ecbc4dd49ab0709f09_b.gif",
    name: "磨刀",
  },
  {
    url: "https://pic.ziyuan.wang/user/sub/2024/04/458ed8da862d4a71bc5ab4c2435711fd_088c2fc6f5680.png",
    name: "小丑",
  },
  {
    url: "https://i.piantu.cn/2024/04/14/839386c85e1803d082b11cfe2fe5c33f.gif",
    name: "有鬼",
  },
];
// 论坛自带 ubb
const defaultUbbList = [
  { name: "超链接", ubb: "[url=网址]文字说明[/url]" },
  { name: "图片", ubb: "[img]图片链接[/img]" },
  { name: "视频", ubb: "[movie]视频直链地址[/movie]" },
  { name: "音频", ubb: "[audio]音频直链地址[/audio]" },
  { name: "文字颜色", ubb: "[forecolor=red]红色文字[/forecolor]" },
  { name: "代码块", ubb: "[code]代码内容[/code]" },
  { name: "全角符号转半角", ubb: "[text]代码内容[/text]" },
  { name: "换行", ubb: "///" },
  { name: "分割线", ubb: "[hr]" },
  { name: "加粗", ubb: "[b]文字[/b]" },
  { name: "斜体", ubb: "[i]文字[/i]" },
  { name: "下划线", ubb: "[u]文字[/u]" },
  { name: "删除线", ubb: "[strike]文字[/strike]" },
  {
    name: "QQ音乐",
    ubb: "[qqmusic]QQ音乐歌曲ID，或者包含歌曲ID的分享链接[/qqmusic]",
  },
  {
    name: "网易云音乐",
    ubb: "[wymusic]网易云音乐歌曲ID，或者包含歌曲ID的分享链接[/wymusic]",
  },
  { name: "拨号", ubb: "[call]手机号码[/call]" },
  { name: "发短信", ubb: "[url=sms:手机号码?body=短信内容]点此发送[/url]" },
  { name: "当前日期&时间", ubb: "[now]" },
  { name: "倒计时天数", ubb: "[codo]2030-01-01[/codo]" },
];
// 增强 ubb
const betterUbbList = {
  txt: [
    {
      name: "超链接",
      inputTitle: ["网址", "文字说明"],
      ubb: (inputValues) => `[url=${inputValues[0]}]${inputValues[1]}[/url]`,
    },
    {
      name: "红字",
      inputTitle: ["文本内容"],
      ubb: (inputValues) => `[forecolor=red]${inputValues[0]}[/forecolor]`,
    },
    {
      name: "加粗",
      inputTitle: ["文本内容"],
      ubb: (inputValues) => `[b]${inputValues[0]}[/b]`,
    },
    {
      name: "斜体",
      inputTitle: ["文本内容"],
      ubb: (inputValues) => `[i]${inputValues[0]}[/i]`,
    },
    {
      name: "下划线",
      inputTitle: ["文本内容"],
      ubb: (inputValues) => `[u]${inputValues[0]}[/u]`,
    },
    {
      name: "删除线",
      inputTitle: ["文本内容"],
      ubb: (inputValues) => `[strike]${inputValues[0]}[/strike]`,
    },
    {
      name: "代码",
      inputTitle: ["代码内容"],
      ubb: (inputValues) => `[code]${inputValues[0]}[/code]`,
    },
    { name: "拨号", inputTitle: ["手机号码"], ubb: (inputValues) => `[call]${inputValues[0]}[/call]` },
    {
      name: "发短信",
      inputTitle: ["手机号码", "短信内容"],
      ubb: (inputValues) => `[url=sms:${inputValues[0]}?body=${inputValues[0]}]点此发送[/url]`,
    },
    {
      name: "倒计时天数",
      inputTitle: ["需要倒计时的日期(格式：2030-01-01)"],
      ubb: (inputValues) => `[url=sms:${inputValues[0]}?body=${inputValues[0]}]点此发送[/url]`,
    },
    {
      name: "QQ音乐",
      inputTitle: ["QQ音乐歌曲链接或ID"],
      ubb: (inputValues) => `[qqmusic]${inputValues[0]}[/qqmusic]`,
    },
    {
      name: "网易云音乐",
      inputTitle: ["网易云音乐歌曲链接或ID"],
      ubb: (inputValues) => `[wymusic]${inputValues[0]}[/wymusic]`,
    },
    // { name: "短链生成" },
    {
      name: "图片",
      ubb: (inputValues) => `[img]${inputValues[0]}[/img]`,
      upload: {
        type: "img",
        accept: "image/*",
      },
    },
    {
      name: "视频",
      inputTitle: ["视频外链(未能找到合适的文件站，如有可提供给我)"],
      ubb: (inputValues) => `[movie]${inputValues[0]}[/movie]`,
      upload: {
        type: "movie",
        accept: "video/*",
      },
    },
    {
      name: "音频",
      inputTitle: ["音频外链(未能找到合适的文件站，如有可提供给我)"],
      ubb: (inputValues) => `[movie]${inputValues[0]}[/movie]`,
      upload: {
        type: "audio",
        accept: "audio/*",
      },
    },
    // {
    //   name: "抖音解析",
    //   inputTitle: ["链接(不需要去除中文和多余字符)"],
    //   apiUrl: "https://v.695402.xyz/dyzl",
    //   ubb: (inputValues) => `[movie]${inputValues[0]}[/movie]`,
    // },
    // { name: "快手解析", inputTitle: ["链接(不需要去除中文和多余字符)"], jxApiUrl: "", ubb: (inputValues) => `[movie]${inputValues[0]}[/movie]` },
    // { name: "B站解析", inputTitle: ["链接(不需要去除中文和多余字符)"], jxApiUrl: "", ubb: (inputValues) => `[movie]${inputValues[0]}[/movie]` },
    // { name: "皮皮虾解析", inputTitle: ["链接(不需要去除中文和多余字符)"], jxApiUrl: "", ubb: (inputValues) => `[movie]${inputValues[0]}[/movie]` },
    // { name: "屋舍文件" },
  ],
  audio: [
    {
      name: "你真该死啊",
      ubb: "[audio]https://file.uhsea.com/2304/3deb45e90564252bf281f47c7b47a153KJ.mp3[/audio]",
    },
    {
      name: "卧槽，无情",
      ubb: "[audio]https://aweme.snssdk.com/aweme/v1/play/?video_id=v0300fg10000c39llkp400egrpaivp30&ratio=1080p[/audio]",
    },
    {
      name: "我不信",
      ubb: "[audio]https://aweme.snssdk.com/aweme/v1/play/?video_id=v0200ff10000bop9e9evld7780im485g&ratio=1080p[/audio]",
    },
    {
      name: "啊~",
      ubb: "[audio]https://aweme.snssdk.com/aweme/v1/play/?video_id=v0300fg10000c27pgb9j1vdnlib21bmg&ratio=1080p[/audio]",
    },
    {
      name: "举报",
      ubb: "[audio]https://aweme.snssdk.com/aweme/v1/play/?video_id=v0200fg10000clgc3l3c77u37ec4o06g&ratio=1080p[/audio]",
    },
    {
      name: "双手插兜",
      ubb: "[audio]https://aweme.snssdk.com/aweme/v1/play/?video_id=v0d00fg10000cl3317rc77uboqgts6s0&ratio=1080p[/audio]",
    },
    {
      name: "你干嘛~",
      ubb: "[audio]https://aweme.snssdk.com/aweme/v1/play/?video_id=v0300fg10000ckbjafrc77uc4heo85r0&ratio=1080p[/audio]",
    },
    {
      name: "天才",
      ubb: "[audio]https://aweme.snssdk.com/aweme/v1/play/?video_id=v0d00fg10000cco09b3c77ufcav057og&ratio=1080p[/audio]",
    },
    {
      name: "垃圾",
      ubb: "[audio]https://aweme.snssdk.com/aweme/v1/play/?video_id=v0300fg10000ckei8ejc77u3qug3fnc0&ratio=1080p[/audio]",
    },
  ],
  video: [],
};

const settingIconBase64 =
  "data:image/png;base64,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";
/* ================================================== 变量结束 ================================================== */

(async function () {
  "use strict";
  if (!checkLocation()) return;
  if (!checkJQueryLoad()) return;

  await initSetting();
  const userSetting = JSON.parse(localStorage.getItem("yaohuoBetterPlusSetting"));

  if (userSetting["firstLoadScript"]) {
    alert("请合理/合法使用本脚本，不要影响论坛正常看帖/回帖！！！如因使用本脚本而被封号/小黑屋，雨我无瓜(免责声明.jpg)");
    saveUserSetting("firstLoadScript", false);
  }

  addCustomStyle();
  userSetting["showTopAndDownBtn"] && addTopAndDown();
  // 页面解析完成后再执行代码，否则 jquery 可能会获取不到 document 内容导致脚本执行失败
  $(document).ready(() => {
    createScriptSetting();
    userSetting["showChuiniuHistory"] && executeFunctionForURL("/games/chuiniu/doit.aspx", chuiniuHistory);
    userSetting["oneClickCollectMoney"] && executeFunctionForURL(/^\/bbs-.*\.html$/, speedEatMoney, true);
    userSetting["hideXunzhang"] && executeFunctionForURL(/^\/bbs-.*\.html$/, hideXunzhang, true);
    userSetting["showHuifuCopy"] && executeFunctionForURL(/^\/bbs-.*\.html$/, huifuCopy, true);
    executeFunctionForURL(/^\/bbs\/book_view_.*\.aspx$/, bookViewAddUbb, true);
    executeFunctionForURL(/^\/bbs-.*\.html$/, huifuAddUbb, true);
    executeFunctionForURL(/^\/bbs-.*\.html$/, loadEmoji, true);
    userSetting["useRight"] && executeFunctionForURL("/bbs/book_list.aspx", useRightNextBtn);
    userSetting["autoLoadMoreBookList"] && executeFunctionForURL("/bbs/book_list.aspx", autoLoadMoreBookList);
    userSetting["autoLoadMoreHuifuList"] && executeFunctionForURL(/^\/bbs-.*\.html$/, autoLoadMoreHuifuList, true);
    userSetting["openLayerForBook"] && executeFunctionForURL("/bbs/book_list.aspx", openLayer);
  });
  // 页面加载完成后再执行代码，否则页面资源可能会获取不到，比如图片等
  $(window).on("load", function () {
    executeFunctionForURL(/^\/bbs-.*\.html$/, changeImgSize, true);
  });
})();

// PC端点击帖子弹窗打开
function openLayer(url) {
  if (!isPC()) return;
  // 监听点击事件
  $(document)
    .off("click", ".listdata .topic-link")
    .on("click", ".listdata .topic-link", function (event) {
      event.preventDefault(); // 阻止默认链接行为
      const url = $(this).attr("href"); // 获取链接的 href 属性
      openLayer(url);
    });
  if (!url || url.length < 1) return;
  // 创建背景层
  let background_layer = $("<div>").css({
    display: "none",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "gray",
    zIndex: "1001",
    opacity: "0.8",
  });
  // 创建弹出层
  let open_layer = $("<div>").css({
    display: "none",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "720px",
    height: "96%",
    border: "1px solid lightblue",
    borderRadius: "10px",
    boxShadow: "4px 4px 10px #171414",
    backgroundColor: "white",
    zIndex: "1002",
    overflow: "auto",
    margin: "0",
    padding: "0",
  });
  // 创建 iframe
  let iframe = $("<iframe>")
    .attr("src", url || "")
    .css({
      width: "100%",
      height: "100%",
      border: "0",
      display: "block",
    });

  // 将 iframe 添加到弹出层
  open_layer.append(iframe);
  // 将弹出层和背景层添加到 body
  $("body").append(open_layer).append(background_layer);
  // 显示弹出层和背景层
  open_layer.show();
  background_layer.show();
  // 点击背景层时关闭弹出层
  background_layer.on("click", function () {
    open_layer.remove();
    background_layer.remove();
  });
}
// 回复列表自动加载更多
function autoLoadMoreHuifuList() {
  // 获取加载更多按钮
  const loadMoreButton = $(".viewContent .more a:contains('加载更多')");
  // 设置一个标志位，用于判断是否已经触发过点击事件
  let hasTriggered = false;

  // 监听滚动事件
  $(window).scroll(function () {
    // 获取页面滚动的位置和文档高度
    const scrollTop = $(this).scrollTop();
    const windowHeight = $(this).height();
    const documentHeight = $(document).height();
    // 检查是否滚动到距离底部400px，并且还没有触发过点击事件
    if (documentHeight - (scrollTop + windowHeight) <= 500 && !hasTriggered) {
      // 自动点击加载更多按钮
      console.log("%c ===> [ 自动点击加载回复 ] <===", "font-size:13px; background:pink; color:#bf2c9f;");
      loadMoreButton.click();
      // 设置标志位为已触发
      hasTriggered = true;
    } else if (documentHeight - (scrollTop + windowHeight) > 500) {
      // 如果滚动距离超过200px，重置标志位
      hasTriggered = false;
    }
  });
}
// 帖子列表自动加载更多
function autoLoadMoreBookList() {
  // 获取加载更多按钮
  const loadMoreButton = $(".btBox .bt1 a:contains('加载更多')");
  // 设置一个标志位，用于判断是否已经触发过点击事件
  let hasTriggered = false;

  // 监听滚动事件
  $(window).scroll(function () {
    // 获取页面滚动的位置和文档高度
    const scrollTop = $(this).scrollTop();
    const windowHeight = $(this).height();
    const documentHeight = $(document).height();
    // 检查是否滚动到距离底部200px，并且还没有触发过点击事件
    if (documentHeight - (scrollTop + windowHeight) <= 200 && !hasTriggered) {
      // 自动点击加载更多按钮
      console.log("%c ===> [ 自动点击加载帖子 ] <===", "font-size:13px; background:pink; color:#bf2c9f;");
      loadMoreButton.click();
      // 设置标志位为已触发
      hasTriggered = true;
    } else if (documentHeight - (scrollTop + windowHeight) > 200) {
      // 如果滚动距离超过200px，重置标志位
      hasTriggered = false;
    }
  });
}
// 帖子页面上一页，下一页按钮互换位置
function useRightNextBtn() {
  // 获取上一页和下一页的链接
  const prevLink = $('.btBox .bt2 a:contains("上一页")');
  const nextLink = $('.btBox .bt2 a:contains("下一页")');

  // 交换它们的位置
  prevLink.after(nextLink.clone());
  nextLink.after(prevLink.clone());
  prevLink.remove();
  nextLink.remove();
}
// 回帖 ubb 增强
function huifuAddUbb() {
  $(".kuaisuhuifu a").remove(); // 移除帖子快速回复旁“文件回帖”按钮

  createToggleEle();
  createUbbListEle();

  !getUserSetting("showHuifuUbb") && $(".huifu-ubb-list-div").hide();

  function createUbbListEle() {
    const ubbDivEle = `
      <div class="huifu-ubb-list-div">
        <span class="huifu-ubb-list-title default-ubb"><hr><b>默认</b><hr></span>
        <span class="huifu-ubb-box"></span>
        <span class="huifu-ubb-list-title better-ubb"><hr><b>增强</b><hr></span>
        <span class="huifu-ubb-box"></span>
        <span class="huifu-ubb-list-title audio-ubb"><hr><b>音频</b><hr></span>
        <span class="huifu-ubb-box"></span>
      </div>
    `;
    $(".viewContent .sticky").after(ubbDivEle);
    createDefaultUbb();
    createBetterUbb();
    createAudiotUbb();
  }
  function createToggleEle() {
    const toggleEle = $(`<span class="custom-toggle-btn">${getUserSetting("showHuifuUbb") ? "折叠 UBB" : "展开 UBB"}</span>`);
    toggleEle.click(function () {
      const showHuifuUbb = getUserSetting("showHuifuUbb");
      if (showHuifuUbb) {
        saveUserSetting("showHuifuUbb", false);
        $(".huifu-ubb-list-div").hide();
        $(this).text("展开 UBB");
      } else {
        saveUserSetting("showHuifuUbb", true);
        $(".huifu-ubb-list-div").show();
        $(this).text("折叠 UBB");
      }
    });
    $(".viewContent .kuaisuhuifu").append(toggleEle);
  }
  // 音频外链 ubb
  function createAudiotUbb() {
    const audioUbbListHtml = [];
    const audioUbbBox = $(".huifu-ubb-list-div .audio-ubb").next();
    betterUbbList.audio.forEach((ubbItem) => {
      const { name, ubb } = ubbItem;
      const span = $(`<span class="ubb-item">${name}</span>`);
      $(span).click(() => insetCustomContent(ubb, ".centered-container .retextarea", true));
      audioUbbListHtml.push(span);
    });
    audioUbbBox.append(audioUbbListHtml);
  }
  // 增强 ubb
  function createBetterUbb() {
    const betterUbbListHtml = [];
    const betterUbbBox = $(".huifu-ubb-list-div .better-ubb").next();
    betterUbbList.txt.forEach((ubbItem) => {
      const { name, upload } = ubbItem;
      let ubbSpanEle = null;
      if (upload?.type?.length > 0) {
        ubbSpanEle = $(`
            <input type="file" id="upload-${upload.type}" style="display: none;" accept="${upload.accept}" multiple/>
            <span class="ubb-item">${name}</span>
        `);
      } else {
        ubbSpanEle = $(`<span class="ubb-item">${name}</span>`);
      }
      betterUbbListHtml.push(ubbSpanEle);
    });
    betterUbbBox.append(betterUbbListHtml);
    // 设置 ubb 点击功能,生成时设置会导致某些ubb点击无法生效
    betterUbbList.txt.forEach((ubbItem) => {
      const { name, inputTitle, ubb, upload, jxApiUrl } = ubbItem;
      betterUbbBox.find(`.ubb-item:contains("${name}")`).click(() => {
        if (inputTitle?.length > 0 && !jxApiUrl) {
          // 输入域
          showInputPopup(inputTitle, (inputResult) => inputResult && insetCustomContent(ubb(inputResult), ".centered-container .retextarea", true));
        } else if (inputTitle?.length > 0 && jxApiUrl?.length > 0) {
          // 外链解析
          showInputPopup(inputTitle, async (inputResult) => {
            const targetUrl = /https:\/\/v\.d.+?\/\w+/.exec(inputResult[0]);
            await getVideoPlayUrl(targetUrl[0]);
          });
        } else if (upload) {
          // 上传文件
          betterUbbBox.find(`#upload-${upload.type}`).click();
          // 文件选择回调事件
          betterUbbBox.find(`#upload-${upload.type}`).change(function () {
            const tempFiles = this.files;
            if (tempFiles.length > 0) {
              if (tempFiles.length > 10) {
                notifyBox("一次最多选择 10 个文件", false);
                return;
              }
              // 上传等待提示
              showWaitBox("上传中…");
              const uploadResults = []; // 存储上传结果的数组
              for (const file of tempFiles) {
                try {
                  switch (upload.type) {
                    case "img":
                      const url = defaultSetting.imgUploadApiUrl[getUserSetting("imgUploadSelOpt")];
                      const options = {};
                      if (getUserSetting("imgUploadSelOpt") == 1) {
                        // 水墨图床添加 token
                        options.headers = { token: getUserSetting("suimoToken") };
                      }
                      const data = new FormData();
                      data.append("image", file);
                      uploadFiles(url, data, options, (response) => {
                        const { code, msg, data } = response;
                        if (code == 200) {
                          uploadResults.push(data.url);
                          insetCustomContent(ubb([data.url]), ".centered-container .retextarea", true);
                        } else {
                          // notifyBox(msg, false);
                        }
                      });
                      break;
                    case "movie":
                      break;
                    case "audio":
                      break;
                    default:
                      break;
                  }
                } catch (error) {
                  // notifyBox(`文件 ${file.name} 上传失败`, false);
                  console.error(error);
                }
              }
              // 关闭等待提示
              $(".wait-box-overlay").remove();
              if (uploadResults.length > 0) {
                setTimeout(() => notifyBox(`已成功上传 ${uploadResults.length} 个文件，失败 ${tempFiles} 个文件`), 300);
              }
              // console.log("%c ===> [ 所有文件上传完成 ] <===", "font-size:13px; background:pink; color:#bf2c9f;", uploadResults);
            } else {
              notifyBox("请选择文件", false);
            }
          });
        }
      });
    });
  }
  // 默认 ubb
  function createDefaultUbb() {
    const defaultUbbListHtml = [];
    const defaultUbbBox = $(".huifu-ubb-list-div .default-ubb").next();
    defaultUbbList.forEach((ubbItem) => {
      const { name, ubb } = ubbItem;
      const span = $(`<span class="ubb-item">${name}</span>`);
      $(span).click(() => insetCustomContent(ubb, ".centered-container .retextarea", true));
      defaultUbbListHtml.push(span);
    });
    defaultUbbBox.append(defaultUbbListHtml);
  }
}
// 发帖 ubb 增强
function bookViewAddUbb() {
  createToggleEle();
  createUbbListEle();
  createFaceListEle();

  // 读取设置，当折叠时隐藏
  !getUserSetting("showBookViewUbb") && $(".ubb-list-div").hide();
  !getUserSetting("showBookViewFace") && $(".facelist-div.bookview-face").hide();

  // 表情
  function createFaceListEle() {
    if (window.location.pathname === "/bbs/book_view_mod.aspx") {
      // 修改帖子
      $(".content .centered-container").eq(1).before('<div class="facelist-div bookview-face"></div>');
    } else {
      // 发布帖子
      $(".content .book_view_add_height").eq(1).after('<div class="facelist-div bookview-face"></div>');
    }

    const faceListHtml = [];
    const faceList = [...defaultFaceList, ...diyFaceList];
    faceList.forEach((faceitem) => {
      const { name, url } = faceitem;
      const img = $("<img/>", {
        class: "facelist-img",
        src: url,
        alt: name,
      });
      const faceUbb = `[img]${url}[/img]`;
      $(img).click(() => insetCustomContent(faceUbb, ".content [name='book_content']", true));
      faceListHtml.push(img);
    });
    $(".facelist-div").append(faceListHtml);
  }
  // ubb
  function createUbbListEle() {
    if (window.location.pathname === "/bbs/book_view_mod.aspx") {
      // 修改帖子
      $(".content .centered-container").eq(1).before('<div class="ubb-list-div" style="margin:0 0 6px;"></div>');
    } else {
      // 发布帖子
      $(".content .book_view_add_height").eq(1).after('<div class="ubb-list-div" style="margin:0 0 6px;"></div>');
    }

    // 生成 ubb 按钮
    const betterUbbListHtml = [];
    betterUbbList.txt.forEach((ubbItem) => {
      const { name, upload } = ubbItem;
      let ubbSpanEle = null;
      if (upload?.type?.length > 0) {
        ubbSpanEle = $(`
            <input type="file" id="upload-${upload.type}" style="display: none;" accept="${upload.accept}" multiple/>
            <span class="ubb-item">${name}</span>
        `);
      } else {
        ubbSpanEle = $(`<span class="ubb-item">${name}</span>`);
      }
      betterUbbListHtml.push(ubbSpanEle);
    });
    $(".ubb-list-div").append(betterUbbListHtml);
    // 设置 ubb 点击功能,生成时设置会导致某些ubb点击无法生效
    betterUbbList.txt.forEach((ubbItem) => {
      const { name, inputTitle, ubb, upload, jxApiUrl } = ubbItem;
      $(`.ubb-list-div .ubb-item:contains("${name}")`).click(() => {
        if (inputTitle?.length > 0 && !jxApiUrl) {
          // 输入域
          showInputPopup(inputTitle, (inputResult) => inputResult && insetCustomContent(ubb(inputResult), ".content [name='book_content']", true));
        } else if (inputTitle?.length > 0 && jxApiUrl?.length > 0) {
          // 外链解析
          showInputPopup(inputTitle, async (inputResult) => {
            const targetUrl = /https:\/\/v\.d.+?\/\w+/.exec(inputResult[0]);
            await getVideoPlayUrl(targetUrl[0]);
          });
        } else if (upload) {
          // 上传文件
          $(`.ubb-list-div #upload-${upload.type}`).click();
          // 文件选择回调事件
          $(`.ubb-list-div #upload-${upload.type}`).change(function () {
            const tempFiles = this.files;
            if (tempFiles.length > 0) {
              if (tempFiles.length > 10) {
                notifyBox("一次最多选择 10 个文件", false);
                return;
              }
              // 上传等待提示
              showWaitBox("上传中…");
              const uploadResults = []; // 存储上传结果的数组
              for (const file of tempFiles) {
                try {
                  switch (upload.type) {
                    case "img":
                      const url = defaultSetting.imgUploadApiUrl[getUserSetting("imgUploadSelOpt")];
                      const options = {};
                      if (getUserSetting("imgUploadSelOpt") == 1) {
                        // 水墨图床添加 token
                        options.headers = { token: getUserSetting("suimoToken") };
                      }
                      const data = new FormData();
                      data.append("image", file);
                      uploadFiles(url, data, options, (response) => {
                        const { code, msg, data } = response;
                        if (code == 200) {
                          uploadResults.push(data.url);
                          insetCustomContent(ubb([data.url]), ".content [name='book_content']", true);
                        } else {
                          // notifyBox(msg, false);
                        }
                      });
                      break;
                    case "movie":
                      break;
                    case "audio":
                      break;
                    default:
                      break;
                  }
                } catch (error) {
                  // notifyBox(`文件 ${file.name} 上传失败`, false);
                  console.error(error);
                }
              }
              // 关闭等待提示
              $(".wait-box-overlay").remove();
              if (uploadResults.length > 0) {
                setTimeout(() => notifyBox(`已成功上传 ${uploadResults.length} 个文件，失败 ${tempFiles} 个文件`), 300);
              }
              // console.log("%c ===> [ 所有文件上传完成 ] <===", "font-size:13px; background:pink; color:#bf2c9f;", uploadResults);
            } else {
              notifyBox("请选择文件", false);
            }
          });
        }
      });
    });
  }
  // 按钮
  function createToggleEle() {
    const toggleEle = $(
      `<span class="custom-toggle-btn ubb-btn" style="font-size:10px;margin-right:0;">${
        getUserSetting("showBookViewUbb") ? "折叠 UBB" : "展开 UBB"
      }</span>
      <span class="custom-toggle-btn face-btn" style="font-size:10px;margin-left:0;">${
        getUserSetting("showBookViewFace") ? "表情折叠" : "表情展开"
      }</span>
      `
    );
    if (window.location.pathname === "/bbs/book_view_mod.aspx") {
      // 修改帖子
      $(".content .centered-container + br").before(toggleEle);
    } else {
      // 发布帖子
      $(".content #saveDraftButton").before(toggleEle);
    }
    // ubb 展开按钮
    $(".custom-toggle-btn.ubb-btn").click(function () {
      $(".ubb-list-div").toggle();
      const showBookViewUbb = getUserSetting("showBookViewUbb");
      if (showBookViewUbb) {
        saveUserSetting("showBookViewUbb", false);
        $(this).text("展开 UBB");
      } else {
        saveUserSetting("showBookViewUbb", true);
        $(this).text("折叠 UBB");
      }
    });
    // 表情展开按钮
    $(".custom-toggle-btn+.face-btn").click(function () {
      $(".facelist-div").toggle();
      const showBookViewFace = getUserSetting("showBookViewFace");
      if (showBookViewFace) {
        saveUserSetting("showBookViewFace", false);
        $(this).text("表情展开");
      } else {
        saveUserSetting("showBookViewFace", true);
        $(this).text("表情折叠");
      }
    });
  }
}
// 修改图片大小
function changeImgSize() {
  const imgThumbWidth = getUserSetting("imgThumbWidth");
  if (imgThumbWidth <= 0) return; // 防止设置为0时依旧添加点击事件，导致点击后页面内图片丢失
  $("head").append(`<style>.img-thumb{max-width:${imgThumbWidth}px;display: block;}`); // 将图片缩小样式添加到页面中

  $("img").each(function () {
    const imageWidth = $(this).width(); // 获取当前图片的显示宽度
    // 排除表情，不缩放
    if (imgThumbWidth && imageWidth >= 200) {
      $(this).addClass("img-thumb"); // 为页面内所有img标签添加class，修改显示大小
    }
  });

  $("body").on("click", "img", function (e) {
    e.preventDefault(); // 取消默认点击行为，避免进入预览窗口
    $(this).toggleClass("img-thumb"); // 给图片添加点击事件，添加/移除指定class，以实时修改图片大小
  });
}
// 帖子页面表情增强
function loadEmoji() {
  // 移除默认表情展开按钮及弹出内容区域
  $(".viewContent .ulselect").remove();
  $(".viewContent .emoticon-popup").remove();

  createVEle();
  addDefaultFace();
  addDiyFace();
  if (!getUserSetting("showFaceList")) {
    $(".facelist-div").hide();
  }

  function insertTextarea(face) {
    const insertToUbb = `[img]${face.url}[/img]`;
    insetCustomContent(insertToUbb, ".centered-container .retextarea", true);
  }
  function addDiyFace() {
    const faceListDiv = $(".facelist-div");
    const diyFaceListHtml = [];
    diyFaceList.forEach((item) => {
      const { name, url } = item;
      const img = $("<img/>", {
        class: "facelist-img",
        src: url,
        alt: name,
      });
      $(img).click(() => insertTextarea(item));
      diyFaceListHtml.push(img);
    });
    faceListDiv.append(diyFaceListHtml);
  }
  function addDefaultFace() {
    const faceListDiv = $(".facelist-div");
    const defaultEmojiHtml = [];
    defaultFaceList.forEach((item) => {
      const { name, url } = item;
      const img = $("<img/>", {
        class: "facelist-img",
        src: url,
        alt: name,
      });
      $(img).click(() => insertTextarea(item));
      defaultEmojiHtml.push(img);
    });
    faceListDiv.append(defaultEmojiHtml);
  }
  function createVEle() {
    const vSpan = $(`<span class='custom-toggle-btn'>${getUserSetting("showFaceList") ? "表情折叠" : "表情展开"}</span>`);
    vSpan.css({
      "margin-left": "10px",
      "padding": "2px 10px",
    });
    vSpan.insertBefore(".viewContent .tongzhi");
    vSpan.click(function () {
      const showFaceList = getUserSetting("showFaceList");
      if (showFaceList) {
        saveUserSetting("showFaceList", false);
        $(this).text("表情展开");
        $(".facelist-div").hide();
      } else {
        saveUserSetting("showFaceList", true);
        $(this).text("表情折叠");
        $(".facelist-div").show();
      }
    });

    const vDiv = $('<div class="facelist-div"></div>');
    vDiv.insertBefore(".viewContent .centered-container");
  }
}
// 复读机(回帖+1)
function huifuCopy() {
  const customLayoutEnabled = JSON.parse(localStorage.getItem("customLayoutEnabled"));
  if (customLayoutEnabled) {
    // 新版回帖
    $(".forum-post .post-content .retext").each(function () {
      const spanEle = $("<span class='huifu-copy'>+1</span>");
      $(this).append(spanEle);
      spanEle.click((e) => {
        e.stopPropagation();
        const parentText = $(this).clone().children(".huifu-copy").remove().end().text().trim();
        insetCustomContent(parentText, ".centered-container .retextarea");
        scrollToEle(".centered-container .retextarea", 80);
        setTimeout(() => {
          getUserSetting("huifuCopyAutoSubmit") && $(".kuaisuhuifu input").trigger("click");
        }, 150);
      });
    });
  } else {
    // 旧版回帖
    $(".reline.list-reply .retext").each(function () {
      const spanEle = $("<span class='huifu-copy'>+1</span>");
      $(this).append(spanEle);
      spanEle.click((e) => {
        e.stopPropagation();
        const parentText = $(this).clone().children(".huifu-copy").remove().end().text().trim();
        insetCustomContent(parentText, ".centered-container .retextarea");
        scrollToEle(".centered-container .retextarea", 80);
        setTimeout(() => {
          getUserSetting("huifuCopyAutoSubmit") && $(".kuaisuhuifu input").trigger("click");
        }, 150);
      });
    });
  }
}
// 隐藏楼主勋章
function hideXunzhang() {
  $(".xunzhang").remove();
}
// 一键吃肉
function speedEatMoney() {
  const vBtn = $("<span class='custom-toggle-btn'>一键吃肉</span>");
  vBtn.click(() => {
    const isPaibi = $("div").hasClass("paibi");
    if (isPaibi) {
      const shengyuNum = $(".paibi .yushuzi").text();
      if (shengyuNum > 0) {
        const eatWordsArr = [
          "吃",
          "吃吃",
          "吃吃.",
          "吃吃。",
          "吃吃..",
          "吃吃。。",
          "吃了",
          "吃肉",
          "来吃肉",
          "吃.",
          "吃。",
          "吃了.",
          "吃了。",
          "吃肉.",
          "吃肉。",
          "来吃肉.",
          "来吃肉。",
          "吃..",
          "吃。。",
          "吃了..",
          "吃了。。",
          "吃肉..",
          "先吃肉",
        ];
        const index = Math.floor(Math.random() * eatWordsArr.length);
        insetCustomContent(eatWordsArr[index], ".centered-container .retextarea");
        setTimeout(() => {
          $(".kuaisuhuifu input").trigger("click");
        }, 300);
      } else {
        notifyBox("已经没有肉了，错过了一个亿~", false);
      }
    } else {
      notifyBox("不是派币贴，你吃个 der", false);
    }
  });
  $(".viewContent .kuaisuhuifu").append(vBtn);
}
// 查询吹牛发布者历史大话选项
async function chuiniuHistory() {
  const elementsWithText = $("body").find(":contains('自己挑战的只能由其它友友应战！')");
  if (elementsWithText.length > 0) return;

  // 创建胜率结果显示容器，写入提示信息
  $(
    `<p id="chuiniuWinningEle" style="background:#f0f9eb;color:gray;text-align:center;margin:0 auto;padding:0 20px;">历史记录获取中...</p>`
  ).insertBefore($(".subtitle"));

  const userinfoEle = $('a[href*="userinfo.aspx"]');
  const chuiniuQueUserId = getUrlParam("touserid", userinfoEle.attr("href")); // 发布者ID
  const chuiniuQueUserNickname = userinfoEle.text(); // 发布者昵称
  const queHistoryArr = Array.from(await getQueUserHistoryArr(chuiniuQueUserId)); // 发布者历史大话ID

  if (queHistoryArr.length > 0) {
    //  获取成功
    const queHistoryAnswers = await Promise.all(queHistoryArr.map(getChuiniuAnswer));
    const countAnswer1 = queHistoryAnswers.filter((v) => v === "1").length;
    const countAnswer2 = queHistoryAnswers.filter((v) => v === "2").length;
    $("#chuiniuWinningEle")
      .css({
        "text-align": "left",
      })
      .html(
        `“<span style="color:#3d68a8;">${chuiniuQueUserNickname}</span>”最近<span style="color:blue;font-weight:bold;">${queHistoryAnswers.length}</span>次已完成大话选项：答案<span style="color:blue;font-weight:bold;">1</span>次数：<span style="color:red;font-weight:bold;">${countAnswer1}</span>,答案<span style="color:blue;font-weight:bold;">2</span>次数： <span style="color:red;font-weight:bold;">${countAnswer2}</span>`
      );
  } else {
    // 获取失败
    $("#chuiniuWinningEle").html(`<span style="color:red;">未知错误，获取历史数据失败，请私信反馈</span>`);
  }

  // 获取指定大话答案
  async function getChuiniuAnswer(chuiniuId) {
    const chuiniuRes = await getPageContent(`/games/chuiniu/book_view.aspx?id=${chuiniuId}`);
    const ansRule1 = chuiniuRes.match(/挑战方出的是\[答案1\]/);
    const ansRule2 = chuiniuRes.match(/挑战方出的是\[答案2\]/);
    if (ansRule1) return "1";
    if (ansRule2) return "2";
  }
  // 获取对方大话指定条数历史记录ID
  async function getQueUserHistoryArr(toUserId, computeTotal = 15) {
    return new Promise(async (resolve, reject) => {
      const idArr = new Set(); // 存放大话ID，利用Set特性去重(翻页时会有重复项出现，非本脚本bug)
      let historyPage = 1; // 翻页，达到预设值时停止

      const historyText = await getPageContent(`/games/chuiniu/book_list.aspx?type=0&touserid=${toUserId}`);
      const userHistoryTotal = historyText.slice(historyText.indexOf("页，共 ") + 4, historyText.indexOf(" 条")); // 吹牛历史总条数

      const getQueUserHistoryid = async () => {
        const tempElements = $(historyText).filter(".line1, .line2");
        for (const line of tempElements) {
          const idLink = line.querySelector('a[href*="book_view.aspx"]');
          if (idLink && !line.textContent.includes("进行中")) {
            const dahuaId = getUrlParam("id", idLink.href);
            if (dahuaId) idArr.add(dahuaId);
            if (idArr.length >= computeTotal) break;
          }
        }
        if (idArr.length < 15 && userHistoryTotal > 15) {
          historyPage++;
          getQueUserHistoryid();
        } else {
          resolve(idArr);
        }
      };
      getQueUserHistoryid();
    });
  }
}
// 一键回到顶部/底部，在原作者基础上做了删减、改动，原作者发布地址：https://greasyfork.org/zh-CN/scripts/38899-回到顶部-底部
function addTopAndDown() {
  if (window.self != window.top) return;
  function ce(n) {
    return document.createElement(n);
  }

  function addStyle(css) {
    let head = document.head || document.getElementsByTagName("head")[0];
    if (head) {
      let style = ce("style");
      style.type = "text/css";
      style.appendChild(document.createTextNode(css));
      head.appendChild(style);
    }
  }

  let el = navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("MSIE") != -1 ? document.documentElement : document.body,
    t1,
    t2,
    speed_by_click = 200,
    zIindex = 1001;

  function getDocumentHeight() {
    return document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight;
  }
  function get_scroll(a) {
    let d = document,
      b = d.body,
      e = d.documentElement,
      c = "client" + a,
      f = "scroll" + a;
    return /CSS/.test(d.compatMode) ? e[c] < e[f] : b[c] < b[f];
  }
  function scrollTo(element, to, duration) {
    (start = document.documentElement.scrollTop || document.body.scrollTop),
      (change = to - start),
      (currentTime = 0),
      (increment = 20),
      (newDuration = typeof duration === "undefined" ? 500 : duration);

    let animateScroll = function () {
      currentTime += increment;
      let val = Math.easeInOutQuad(currentTime, start, change, newDuration);
      window.scrollTo(0, val);
      if (currentTime < newDuration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  }

  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  function shareCSS() {
    let s = "",
      img_up,
      img_dn;

    img_up =
      "data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB+SURBVDhPY1i1atV/amAGahgCMoNhaIGlS5cKAp19BoRBbLJcj2QILDJINwzoAmMgfoclIkBixkS5DI8hMJcRNgxoSBoOl6CnNZBhaVhdBjWE1MSJahjQkA4KEmYH2GUrV66cSYEhYB+AzKBtFiHkQqKiH6Ro1CDCQTWgYQQAs81DU0G/83sAAAAASUVORK5CYII=";
    img_dn =
      "data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACPSURBVDhPY2DAAlatWvUfH8amB6vYqEGEg2pgw4iQ7cTKM6xcuXImsYpxqQOZAQ4woIIOCgzrQAl1oEFpZBiWhitFgwx7R4SBIDXYDYGZDFRgTMAwkCHGhBMRJMxwGUa8ITCbli5dKgg08AySN8+AxIhyCboiJMPIN4Qsm6miiYioxltawvSDYogohYTUAQC80UNTOht/YwAAAABJRU5ErkJggg==";
    s +=
      "#play_btn_up { position:fixed; right:0; top:54%;z-index:" +
      zIindex +
      "; height:40px; width:36px; cursor:pointer; background:url(" +
      img_up +
      ") no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7); border-radius:5px 0 0 5px; margin-top:-24px; }";
    s +=
      "#play_btn_dn { position:fixed; right:0; top:60%;   z-index:" +
      zIindex +
      "; height:40px; width:36px; cursor:pointer; background:url(" +
      img_dn +
      ") no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7); border-radius:5px 0 0 5px; margin-top:-24px; }";

    s +=
      ".play_btn { -webkit-transition-duration:0.5s linear; -o-transition-duration:0.5s linear; -moz-transition-duration:0.5s linear; transition-duration:0.5s linear; opacity:0.65; }";
    s += ".play_btn:hover { opacity:1; }";

    addStyle("" + s);
  }

  function create_btn_element() {
    let up,
      dn,
      scrolled,
      h = get_scroll("Height");
    if (!h) {
      return;
    }
    shareCSS();

    if (el) {
      up = ce("span");
      dn = ce("span");
      up.setAttribute("id", "play_btn_up");
      dn.setAttribute("id", "play_btn_dn");
      up.className = "play_btn";
      dn.className = "play_btn";
      document.body.appendChild(up);
      document.body.appendChild(dn);

      scrolled = window.pageYOffset || document.documentElement.scrollTop;
      up.style.display = scrolled > 0 ? "" : "none";

      up.addEventListener(
        "mouseout",
        function () {
          clearTimeout(t1);
        },
        false
      );
      dn.addEventListener(
        "mouseout",
        function () {
          clearTimeout(t2);
        },
        false
      );
      up.addEventListener(
        "click",
        function () {
          scrollTo(el, 0, speed_by_click);
        },
        false
      );
      dn.addEventListener(
        "click",
        function () {
          scrollTo(el, getDocumentHeight(), speed_by_click);
        },
        false
      );

      window.onscroll = function () {
        let scrolled = document.documentElement.scrollTop,
          diffHeight = document.body.scrollHeight - window.innerHeight;
        up.style.display = scrolled > 0 ? "" : "none";
        dn.style.display = diffHeight > scrolled ? "" : "none";
      };
    }
  }

  create_btn_element();
}

// 生成设置相关内容
function createScriptSetting() {
  createIcon();

  // 关闭设置弹框
  function closePopupContainer() {
    // 恢复body内容滚动
    $("body").css("overflow", "auto");
    // 移除蒙版和弹出内容容器
    $(".popup-overlay").remove();
  }
  // 设置弹框
  function createPopupContainer() {
    // 蒙版
    const overlay = $("<div>").addClass("popup-overlay").appendTo("body").click(closePopupContainer);
    // 弹出内容容器
    const container = $("<div>")
      .addClass("popup-container")
      .appendTo(overlay)
      .click((event) => {
        event.stopPropagation(); // 阻止事件冒泡
      });

    // 设置蒙版的样式
    overlay.css({
      "background-color": "rgba(0, 0, 0, 0.6)",
      "position": "fixed",
      "top": 0,
      "left": 0,
      "width": "100%",
      "height": "100%",
      "z-index": 9999,
      "display": "flex",
      "justify-content": "center",
      "align-items": "center",
    });

    // 设置弹出内容容器的样式
    container.css({
      "background-color": "white",
      "width": "80%",
      "max-width": "400px",
      "max-height": "80%",
      "overflow-y": "auto",
      "padding": "20px",
      "text-align": "center",
      "border-radius": "5px",
    });

    // 添加弹出内容
    const vSettingEle = `
      <form name="settingForm">
      <div class="setting-div">
        <h2 class="reset setting-title">妖火增强插件Plus</h2>
        <p class="reset" style="font-size:12px;">
          Author：
          <a href="/bbs/userinfo.aspx?touserid=27894" style="font-size:12px;">柠檬没有汁@27894</a>
        </p>
        <ul style="margin:0;padding:0;">
          <li class="setting-li-title"><hr><b>关于脚本</b><hr></li>
          <li class="setting-li-between">
            <span>脚本安装/升级</span>
            <span>
              <a href="https://greasyfork.org/zh-CN/scripts/504289-妖火网增强脚本plus" target="_blank">GreasyFork 直达</a>
            </span>
          </li>
          <li class="setting-li-between">
            <span>开源地址</span>
            <span>
              <a href="https://github.com/v2jun/yaohuo_better_plus" target="_blank">Github</a>
            </span>
          </li>
          <li class="setting-li-between">
            <span>重置设置</span>
            <span class='clear-setting'>点击运行</span>
          </li>
          <li class="setting-li-tips">
            <span>如出现玄学bug，可尝试重置脚本设置</span>
          </li>

          <li class="setting-li-title"><hr><b>设置</b><hr></li>
          <li class="setting-li-between">
            <span>设置图标大小(px)</span>
            <input name="settingIconSize" class="setting-li-input" type="number" value="${getUserSetting("settingIconSize")}"/>
          </li>
          <li class="setting-li-tips">
            <span>设置入口图标大小，设置为 0 时不显示</span>
          </li>
          <li class="setting-li-between">
            <span>一键回到顶部/底部</span>
            <div class="switch">
              <input name="showTopAndDownBtn" value="true" ${
                getUserSetting("showTopAndDownBtn") ? "checked" : ""
              }  class="switch-checkbox" id="showTopAndDownBtn" type="checkbox">
              <label class="switch-label" for="showTopAndDownBtn">
                <span class="switch-inner" data-on="开" data-off="关"></span>
                <span class="switch-switch"></span>
              </label>
            </div>
          </li>
          <li class="setting-li-between">
            <span>隐藏楼主勋章</span>
            <div class="switch">
              <input name="hideXunzhang" value="true" ${
                getUserSetting("hideXunzhang") ? "checked" : ""
              }  class="switch-checkbox" id="hideXunzhang" type="checkbox">
              <label class="switch-label" for="hideXunzhang">
                <span class="switch-inner" data-on="开" data-off="关"></span>
                <span class="switch-switch"></span>
              </label>
            </div>
          </li>
          <li class="setting-li-between">
            <span>图片宽度(px)</span>
            <input name="imgThumbWidth" class="setting-li-input" type="number" value="${getUserSetting("imgThumbWidth")}"/>
          </li>
          <li class="setting-li-tips">缩放页面中图片到指定宽度，设置为 0 时不缩放</li>
          <li class="setting-li-between">
            <span>图床选择</span>
            <select name='imgUploadSelOpt' class="reset" style="font-size: 12px;width:116px;padding-left:8px;height:25px;">
              <option value="0" ${getUserSetting("imgUploadSelOpt") == 0 ? "selected" : ""}>美团</option>
              <option value="1" ${getUserSetting("imgUploadSelOpt") == 1 ? "selected" : ""}>水墨</option>
            </select>
          </li>
          <li class="setting-li-between sel-suimo">
            <span><a href="https://img.ink/user/settings.html" target="_blank">水墨图床token</a></span>
            <input style="width:100px;" class="setting-li-input" value="${getUserSetting(
              "suimoToken"
            )}" name="suimoToken" id="suimoToken"  type="password" placeholder="为空则为不上传…"/>
          </li>
          <li class="setting-li-between">
            <span>我要用右手</span>
            <div class="switch">
              <input name="useRight" value="true" ${
                getUserSetting("useRight") ? "checked" : ""
              }  class="switch-checkbox" id="useRight" type="checkbox">
              <label class="switch-label" for="useRight">
                <span class="switch-inner" data-on="开" data-off="关"></span>
                <span class="switch-switch"></span>
              </label>
            </div>
          </li>
          <li class="setting-li-tips">将帖子列表的下一页按钮显示在右边</li>
          <li class="setting-li-between">
            <span>帖子自动加载</span>
            <div class="switch">
              <input name="autoLoadMoreBookList" value="true" ${
                getUserSetting("autoLoadMoreBookList") ? "checked" : ""
              }  class="switch-checkbox" id="autoLoadMoreBookList" type="checkbox">
              <label class="switch-label" for="autoLoadMoreBookList">
                <span class="switch-inner" data-on="开" data-off="关"></span>
                <span class="switch-switch"></span>
              </label>
            </div>
          </li>
          <li class="setting-li-between">
            <span>回复自动加载</span>
            <div class="switch">
              <input name="autoLoadMoreHuifuList" value="true" ${
                getUserSetting("autoLoadMoreHuifuList") ? "checked" : ""
              }  class="switch-checkbox" id="autoLoadMoreHuifuList" type="checkbox">
              <label class="switch-label" for="autoLoadMoreHuifuList">
                <span class="switch-inner" data-on="开" data-off="关"></span>
                <span class="switch-switch"></span>
              </label>
            </div>
          </li>
          <li class="setting-li-between">
            <span>帖子在弹窗中打开</span>
            <div class="switch">
              <input name="openLayerForBook" value="true" ${
                getUserSetting("openLayerForBook") ? "checked" : ""
              }  class="switch-checkbox" id="openLayerForBook" type="checkbox">
              <label class="switch-label" for="openLayerForBook">
                <span class="switch-inner" data-on="开" data-off="关"></span>
                <span class="switch-switch"></span>
              </label>
            </div>
          </li>
          <li class="setting-li-tips">仅在PC端生效，且弹窗中无法使用脚本</li>


          <li class="setting-li-title more-setting more-setting-click" style="margin-bottom:0;display: none;"><hr><b>高级设置</b><hr></li>
          <li class="more-setting" style="font-size:12px;text-align:center;margin:-16px 0 0;display: none;">使用以下功能前请先熟读并背诵版规(手动狗头.jpg)</li>
          <li class="setting-li-between more-setting" style="display: none;">
            <span>一键吃肉</span>
            <div class="switch">
              <input name="oneClickCollectMoney" value="true" ${
                getUserSetting("oneClickCollectMoney") ? "checked" : ""
              }  class="switch-checkbox" id="oneClickCollectMoney" type="checkbox">
              <label class="switch-label" for="oneClickCollectMoney">
                <span class="switch-inner" data-on="开" data-off="关"></span>
                <span class="switch-switch"></span>
              </label>
            </div>
          </li>
          <li class="setting-li-between more-setting" style="display: none;">
            <span>吹牛历史查询</span>
            <div class="switch">
              <input name="showChuiniuHistory" value="true" ${
                getUserSetting("showChuiniuHistory") ? "checked" : ""
              }  class="switch-checkbox" id="showChuiniuHistory" type="checkbox">
              <label class="switch-label" for="showChuiniuHistory">
                <span class="switch-inner" data-on="开" data-off="关"></span>
                <span class="switch-switch"></span>
              </label>
            </div>
          </li>
          <li class="setting-li-between extra-setting " style="display: none;">
            <span>复读机(回帖+1)</span>
            <div class="switch">
              <input name="showHuifuCopy" value="true" ${
                getUserSetting("showHuifuCopy") ? "checked" : ""
              }  class="switch-checkbox" id="showHuifuCopy" type="checkbox">
              <label class="switch-label" for="showHuifuCopy">
                <span class="switch-inner" data-on="开" data-off="关"></span>
                <span class="switch-switch"></span>
              </label>
            </div>
          </li>
          <li class="setting-li-between extra-setting" style="display: none;">
            <span>复读机自动提交</span>
            <div class="switch">
              <input name="huifuCopyAutoSubmit" value="true" ${
                getUserSetting("huifuCopyAutoSubmit") ? "checked" : ""
              }  class="switch-checkbox" id="huifuCopyAutoSubmit" type="checkbox">
              <label class="switch-label" for="huifuCopyAutoSubmit">
                <span class="switch-inner" data-on="开" data-off="关"></span>
                <span class="switch-switch"></span>
              </label>
            </div>
          </li>
        </ul>
        <footer>
          <hr>
          <span class="setting-cancel-btn">取消</span>
          <span class="setting-confirm-btn">保存</span>
        </footer>
      </form>
      </div>
    `;
    container.append(vSettingEle);
    // 监听下拉选择，改变其他元素状态
    $('form[name="settingForm"]')
      .find("select")
      .on("change", function () {
        const selectName = $(this).attr("name");
        const selectedValue = $(this).val();

        if (selectName === "imgUploadSelOpt") {
          if (selectedValue == 0) $(".setting-div .sel-suimo").hide();
          else if (selectedValue == 1) $(".setting-div .sel-suimo").show();
        }
      });
    // 禁止蒙版下的body内容滚动
    $("body").css("overflow", "hidden");
    // 高级设置
    $(".setting-div .setting-title").click(
      clickCounter(
        ".setting-div .setting-title",
        () => {
          const showMoreSetting = getUserSetting("showMoreSetting");
          if (showMoreSetting) {
            $(".setting-div .more-setting").hide();
            saveUserSetting("showMoreSetting", false);
            notifyBox("高级设置已隐藏");
          } else {
            $(".setting-div .more-setting").show();
            saveUserSetting("showMoreSetting", true);
            notifyBox("高级设置已开启");
          }
        },
        10,
        10
      )
    );
    // 额外设置
    $(".setting-div .more-setting-click").click(
      clickCounter(
        ".setting-div .more-setting-click",
        () => {
          $(".setting-div .extra-setting").toggle();
        },
        3,
        3
      )
    );
    // 清除缓存
    $(".setting-div .clear-setting").click((e) => {
      localStorage.removeItem("yaohuoBetterPlusSetting");
      setTimeout(() => {
        window.location.reload();
      }, 300);
    });
    // 取消按钮
    $(".setting-div .setting-cancel-btn").click(closePopupContainer);
    // 提交按钮
    $(".setting-div .setting-confirm-btn").click(
      debounce(() => {
        const formData = {};
        $('form[name="settingForm"]')
          .find("input, select")
          .each(function () {
            // 根据不同输入方式格式化值，否则全部为字符串
            if ($(this).is(":checkbox")) {
              formData[this.name] = this.checked;
            } else if ($(this).is(":radio")) {
              const checkedValue = $('form[name="settingForm"]')
                .find('[name="' + this.name + '"]:checked')
                .val();
              formData[this.name] = checkedValue !== undefined ? checkedValue : null;
            } else if ($(this).attr("type") === "number") {
              formData[this.name] = parseFloat(this.value);
            } else if ($(this).attr("type") === "date") {
              formData[this.name] = new Date(this.value);
            } else if ($(this).is("select")) {
              formData[this.name] = parseFloat(this.value);
            } else {
              formData[this.name] = this.value;
            }
          });

        const cacheSetting = JSON.parse(localStorage.getItem("yaohuoBetterPlusSetting"));
        for (const key of Object.keys(formData)) {
          cacheSetting[key] = formData[key];
        }
        console.log("%c ===> [ cacheSetting ] <===", "font-size:13px; background:pink; color:#bf2c9f;", cacheSetting);
        try {
          localStorage.setItem("yaohuoBetterPlusSetting", JSON.stringify(cacheSetting));
          notifyBox("保存成功");
        } catch (error) {
          notifyBox("保存失败", false);
        }
        // 刷新页面以应用新设置
        setTimeout(() => {
          window.location.reload();
        }, 300);
      })
    );
    // 根据用户设置决定是否显示高级设置
    if (getUserSetting("showMoreSetting")) $(".setting-div .more-setting").show();
    // 根据用户设置决定是否显示水墨图床 token 设置
    if (getUserSetting("imgUploadSelOpt") != 1) $(".setting-div .sel-suimo").hide();
  }
  // 设置 icon
  function createIcon() {
    // 页面内设置按钮，避免icon被设置为 0 时无法重置设置
    $(".subtitle2")
      .append("<span style='color:red;margin-left:15px;'>脚本设置</span>")
      .find("span")
      .click(() => {
        createPopupContainer();
      });

    const windowWidth = $(window).width();
    const bodyContentWidth = $("body").width();
    const iconSize = getUserSetting("settingIconSize") + "px";
    $("<img>")
      .attr("id", "settingICon")
      .attr("src", `${settingIconBase64}`)
      .css({
        "position": "fixed",
        "top": "10px",
        "right": "10px",
        "width": iconSize,
        "height": iconSize,
        "z-index": 9998,
      })
      .appendTo("body")
      .click(() => {
        createPopupContainer();
      });
    // PC端设置右偏移量
    if (windowWidth > bodyContentWidth) {
      const rightOffset = (windowWidth - bodyContentWidth) / 2 + 10;
      $("#settingICon").css("right", rightOffset + "px");
    }
  }
}

// 初始化本地设置文件(存放于localStorage，清除浏览器缓存会让设置失效)
function initSetting() {
  return new Promise((resolve, reject) => {
    const localSetting = JSON.parse(localStorage.getItem("yaohuoBetterPlusSetting")) || {};
    const saveSetting = { ...defaultSetting, ...localSetting }; // 合并设置，自定义项覆盖默认选项，避免添加新功能时已缓存设置没有新功能相关从而产生bug
    try {
      localStorage.setItem("yaohuoBetterPlusSetting", JSON.stringify(saveSetting));
      console.log("======> [ 已成功初始化设置 ]");
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * 递归检测jQuery是否成功加载
 * @param {Number} maxAttempts 最大检测次数
 * @param {Number} interval 检测间隔时间/ms
 * @param {Number} attempt  已检测次数
 * @returns
 */
function checkJQueryLoad(maxAttempts = 50, interval = 200, attempt = 0) {
  if (typeof jQuery !== "undefined") {
    console.log("已成功加载 jQuery");
    return true;
  } else if (attempt < maxAttempts) {
    console.log("已检测次数：", attempt + 1);
    setTimeout(() => {
      checkJQueryLoad(maxAttempts, interval, attempt + 1);
    }, interval);
  } else {
    console.log("无法加载 jQuery");
    notifyBox("jQuery 加载失败，增强脚本运行已终止", false);
    return false;
  }
}

// 判断是否是在网站中（有些手机端浏览器无法识别油猴 @match 标识，导致在所有网站都会执行脚本）
function checkLocation() {
  const currentHost = window.location.host;
  const targetHostArr = ["yaohuo.me", "www.yaohuo.me"];

  if (targetHostArr.includes(currentHost)) {
    return true;
  } else {
    return false;
  }
}

/* ================================================== 自定义方法开始 ================================================== */

// 解析各大视频平台url
function getVideoPlayUrl(url) {
  return new Promise((resolve, reject) => {
    if (url.includes("douyin")) {
      resolve(dy());
    } else if (url.includes("kuaishou")) {
    } else if (url.includes("bilibili")) {
    } else {
      reject();
    }
  });
  function dy() {
    const dyData = myAjax(url, { url }, "post", { headers: { "Access-Control-Allow-Origin": "*" } });
    console.log("%c ===> [ dyData ] <===", "font-size:13px; background:pink; color:#bf2c9f;", dyData);
  }
}

/**
 * 上传文件到指定api
 * @param {*} url api地址
 * @param {*} data 数据
 * @param {*} options 附加请求数据
 * @param {*} callback 回调函数
 * @param {*} type 请求方法
 */
function uploadFiles(url, data, options = {}, callback, type = "POST") {
  $.ajax({
    url,
    type,
    data,
    contentType: false,
    processData: false,
    dataType: "json", // 期望返回的数据格式
    ...options,
    success: (response) => {
      callback(response);
    },
    error: (error) => {
      console.error("未知错误，上传失败", error);
    },
  });
}

// 生成输入内容域
function showInputPopup(inputTitle, callback) {
  // 创建蒙版
  const mask = $('<div class="input-popup-mask"></div>');
  mask.click(function (event) {
    if (event.target === mask[0]) {
      mask.remove();
      callback(null);
    }
  });
  // 创建弹出框
  const popup = $('<div class="input-popup"></div>');
  // 创建输入框
  for (let i = 0; i < inputTitle.length; i++) {
    const inputBox = $(
      '<div class="input-popup-input"><label class="input-popup-label">' +
        inputTitle[i] +
        '：</label><textarea class="input-popup-textarea" rows="2" placeholder="请输入..."></textarea></div>'
    );
    popup.append(inputBox);
  }
  // 创建按钮容器
  const buttonsContainer = $('<div class="input-popup-buttons"></div>');
  // 创建取消按钮
  const cancelBtn = $('<button class="input-popup-cancel-btn">取消</button>');
  cancelBtn.click(function () {
    mask.remove();
    callback(null);
  });
  // 创建确定按钮
  const submitBtn = $('<button class="input-popup-submit-btn">确定</button>');
  submitBtn.click(function () {
    const inputs = $(".input-popup-textarea");
    const inputValues = [];
    inputs.each(function () {
      inputValues.push($(this).val());
    });
    mask.remove();
    callback(inputValues);
  });
  // 将按钮添加到按钮容器
  buttonsContainer.append(cancelBtn);
  buttonsContainer.append(submitBtn);
  // 将按钮容器添加到弹出框
  popup.append(buttonsContainer);
  // 将弹出框添加到蒙版
  mask.append(popup);

  // 将蒙版添加到页面
  $("body").append(mask);
}

// 判断是否为pc端浏览器打开
function isPC() {
  let userAgentInfo = navigator.userAgent;
  let mobileAgents = ["Android", "iPhone", "iPad", "iPod", "Windows Phone"];
  let isPC = true;
  for (let i = 0; i < mobileAgents.length; i++) {
    if (userAgentInfo.indexOf(mobileAgents[i]) > -1) {
      isPC = false;
      break;
    }
  }
  return isPC;
}

// 滚动页面到指定标签，并显示在屏幕中间
function scrollToEle(toEle, animateTime = 500) {
  const targetElement = $(toEle); // 使用适当的选择器选择目标元素
  const windowHeight = $(window).height(); // 获取窗口的高度
  const elementOffset = targetElement.offset().top; // 获取目标元素相对于文档顶部的偏移量
  const offset = elementOffset - windowHeight / 2; // 计算滚动的偏移量

  $("html, body").animate(
    {
      scrollTop: offset,
    },
    animateTime
  ); // 平滑滚动到计算的偏移量位置
}

// Ajax 请求
function myAjax(url, data, method = "Get", options) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      method,
      data,
      success: (response) => {
        resolve(response);
      },
      error: (error) => {
        reject(error);
      },
      ...options,
    });
  });
}

// 生成指定长度随机字符串
function generateRandomString(length) {
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return randomString;
}

/**
 * 指定元素被点击*次后执行指定函数
 * @param {*} clickEle 指定元素
 * @param {*} callback 回调函数
 * @param {*} clickLimit 点击次数
 * @param {*} timeLimit 连续点击限制时间，单位/s
 */
function clickCounter(clickEle, callback, clickLimit = 3, timeLimit = 1) {
  $(clickEle).on("click", function () {
    let $button = $(this);
    let clickCount = $button.data("clickCount") || 0; // 获取点击次数，如果不存在则默认为0
    clickCount++; // 点击次数加1
    $button.data("clickCount", clickCount); // 存储点击次数

    if (clickCount === 1) {
      // 如果是第一次点击
      $button.data(
        "timeout",
        setTimeout(function () {
          $button.removeData("clickCount"); // 超时后移除点击次数数据
        }, timeLimit * 1000)
      ); // 设置时间窗口，单位为毫秒
    } else if (clickCount === clickLimit) {
      // 如果点击次数达到设定的限制
      clearTimeout($button.data("timeout")); // 清除超时
      $button.removeData("clickCount"); // 清除点击次数数据
      callback(); // 执行指定的回调函数
    }
  });
}

// 向页面中添加指定样式
function addCustomStyle() {
  // console.log("%c ===> [ 添加自定义样式 ] <===", "font-size:13px; background:pink; color:#bf2c9f;");
  $("<style>").text(customCSS).appendTo("head");
}

/**
 * 防抖
 * @param {*} func
 * @param {*} delay
 * @returns
 */
function debounce(func, delay = 800) {
  console.log("%c ===> [ 节流函数开始运行 ] <===", "font-size:13px; background:pink; color:#bf2c9f;");
  let timeoutId;

  return function () {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
}

/**
 * 在指定textarea/input当前光标处插入内容
 * @param {*} content 插入内容
 * @param {String} targetEle 插入目标 element(jquery可使用的选择器)
 * @param {Boolean} autoFocus 是否自动获取输入焦点
 */
function insetCustomContent(content, targetEle, autoFocus = false) {
  const textarea = $(targetEle); // 获取目标元素
  if (autoFocus) {
    const cursorPosition = textarea[0].selectionStart; // 获取当前光标位置
    const currentValue = textarea.val(); // 当前内容
    const newValue = currentValue.slice(0, cursorPosition) + content + currentValue.slice(cursorPosition); // 将内容插入当前光标处。如果未选择输入框则插入最后
    textarea.val(newValue); // 写入完整内容
    // 将光标移到插入内容的最后
    textarea[0].selectionStart = cursorPosition + content.length;
    textarea[0].selectionEnd = cursorPosition + content.length;
    textarea.focus();
  } else {
    textarea.val(content);
  }
}

/**
 * 当前页面为指定 url 时执行函数
 * @param {*} targetPath 指定 url，可为正则表达式
 * @param {Function} executeFunction 执行函数
 * @param {Boolean} isRegex 是否使用正则判断 url
 */
function executeFunctionForURL(targetPath, executeFunction, isRegex = false) {
  if (isRegex) {
    targetPath.test(window.location.pathname) && executeFunction();
  } else {
    if (typeof targetPath !== "string" || typeof executeFunction !== "function") {
      throw new Error("参数无效！");
    }
    window.location.pathname === targetPath && executeFunction();
  }
}

// 从指定url获取get参数`
function getUrlParam(paramName, targetUrl = window.location.href) {
  try {
    let urlObj = new URL(targetUrl, window.location.origin);
    return urlObj.searchParams.get(paramName);
  } catch (error) {
    console.error("无效的URL:", targetUrl, error);
    return null;
  }
}
// 获取指定页面内容
function getPageContent(path, method = "GET") {
  const url = `${window.location.origin}${path}`;
  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      method,
      dataType: "html",
      success: (response) => {
        resolve(response);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

// 设置保存
function saveUserSetting(setName, setValue) {
  let cacheSetting = JSON.parse(localStorage.getItem("yaohuoBetterPlusSetting"));
  cacheSetting[setName] = setValue;
  try {
    localStorage.setItem("yaohuoBetterPlusSetting", JSON.stringify(cacheSetting));
    // notifyBox(successMsg);
  } catch (error) {
    // notifyBox(errorMsg, false);
    throw new Error("未知错误，保存设置失败");
  }
}
// 设置获取
function getUserSetting(name) {
  // let cacheSetting = JSON.parse(localStorage.getItem("yaohuoBetterPlusSetting"));
  // console.log("%c ===> [ cacheSetting ] <===", "font-size:13px; background:pink; color:#bf2c9f;", cacheSetting);
  // return cacheSetting[name];
  try {
    return JSON.parse(localStorage.getItem("yaohuoBetterPlusSetting"))[name];
  } catch (error) {
    throw new Error("未知错误，获取设置失败");
  }
}
// 等待提示框
function showWaitBox(msg) {
  const overlay = $('<div class="wait-box-overlay"></div>');
  const modal = $('<div class="wait-box-modal"></div>');
  modal.append('<div class="wait-box-spinner"></div>');
  modal.append(`<span class="wait-box-text">${msg}</span>`);
  overlay.append(modal);
  $("body").append(overlay);
  overlay.on("click", function (e) {
    e.stopPropagation();
  });
  return overlay;
}

/**
 * 弹出提示
 * @param {String} message 提示内容
 * @param {Boolean} status 提示状态，true成功，false失败，默认true
 * @param {Number} delayTime 提示时间/ms，默认1500ms
 */
let offsetY = 0; // 消息框初始垂直偏移量
function notifyBox(message, status = true, delayTime = 1500) {
  // 消息父容器
  const containerDiv = $("<div>")
    .css({
      "position": "fixed",
      "top": `calc(100px + ${offsetY}px)`,
      "left": "50%",
      "transform": "translateX(-50%)",
      "width": "350px",
      "max-width": "80%",
      "text-align": "center",
      "z-index": 9999,
    })
    .appendTo("body");
  // 消息框创建
  const messageDiv = $("<div>")
    .text(message)
    .css({
      "background": status ? "#f0f9eb" : "#fef0f0",
      "color": status ? "#67c23a" : "#f56c6c",
      "padding": "5px 20px",
      "box-shadow": "0 2px 4px rgba(0, 0, 0, 0.2)",
      "white-space": "normal",
      "wordWrap": "break-word",
      "overflowWrap": "break-word",
      "hyphens": "auto",
      "border-radius": "5px",
      "max-width": "100%", // 设置消息框的最大宽度
    })
    .appendTo(containerDiv);
  // 延迟后消息框销毁
  messageDiv
    .fadeIn()
    .delay(delayTime)
    .fadeOut(function () {
      containerDiv.remove();
      offsetY -= 50; // 删除后减少50px的垂直偏移量
    });

  offsetY += 50; // 增加消息框的高度和间距
}

/* ================================================== 自定义方法结束 ================================================== */
