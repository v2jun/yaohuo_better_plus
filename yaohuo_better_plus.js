// ==UserScript==
// @name            妖火网增强脚本Plus
// @namespace       https://www.yaohuo.me/
// @version         0.9.4
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
  showHuifuUbb: false, // 回帖 ubb 展开

  imgThumbWidth: 100, // 图片缩小后显示宽度
  showFaceList: true, // 回帖表情展开
  superbedToken: "", // 聚合图床 token，为空时使用游客身份上传
  // 站内图片增强

  showMoreSetting: false, // 高级设置
  oneClickCollectMoney: false, // 一键吃肉
  showChuiniuHistory: false, // 显示吹牛发布者历史
  showHuifuCopy: false, // 复读机(回复+1)
};
// 自定义样式
const customCSS = `
  .reset{
    margin:0;
    padding:0;
  }
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
    width:80px;
    padding-left:10px;
    height:15px;
  }

  .switch {
    position: relative;
    float: left;
    width: 96px;
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
    transition: margin 0.3s ease-in 0s;
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
    display: block;
    width: 14px;
    height: 14px;
    margin: 3px;
    background: #FFFFFF;
    top: 0;
    bottom: 0;
    right: 72px;
    border: 2px solid #999999;
    border-radius: 50%;
    transition: all 0.3s ease-in 0s;
  }
  .switch-checkbox:checked + .switch-label .switch-inner {
    margin-left: 0;
  }
  .switch-checkbox:checked + .switch-label .switch-switch {
    right: 0px;
  }

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

  .ubb-list-div{
    display:flex;
    flex-wrap: wrap;
    gap: 4px 1px;
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
  .ubb-list-div > .ubb-item:last-child{
  color:red;
  }

  .clear-setting{
    color:#3d68a8;
    text-decoration: underline;
    margin-left:-4px;
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
// 增强 ubb
const bookViewUbbList = [
  { name: "超链接", ubb: "[url=网址]文字说明[/url]" },
  { name: "图片", ubb: "[img]图片链接[/img]", isUpload: true, clickFunc: (e) => {} },
  { name: "视频", ubb: "[movie]视频直链地址[/movie]", isUpload: true, clickFunc: (e) => {} },
  { name: "文字颜色", ubb: "[forecolor=red]红色文字[/forecolor]" },
  { name: "代码", ubb: "[text]代码内容[/text]" },
  { name: "换行", ubb: "///" },
  { name: "分割线", ubb: "[hr]" },
  { name: "加粗", ubb: "[b]文字[/b]" },
  { name: "斜体", ubb: "[i]文字[/i]" },
  { name: "下划线", ubb: "[u]文字[/u]" },
  { name: "删除线", ubb: "[strike]文字[/strike]" },
  { name: "拨号", ubb: "[call]手机号码[/call]" },
  { name: "发短信", ubb: "[url=sms:手机号码?body=短信内容]点此发送[/url]" },
  { name: "日期&时间", ubb: "[now]" },
  { name: "倒计时天数", ubb: "[codo]2030-01-01[/codo]" },
  { name: "音频", ubb: "[audio]音频直链地址[/audio]" },
  { name: "抖音解析", ubb: "", needInput: true },
  { name: "快手解析", ubb: "", needInput: true },
  { name: "B站解析", ubb: "", needInput: true },
  { name: "屋舍文件", ubb: "", clickFunc: (e) => {} },
  { name: "短链生成", ubb: "", needInput: true },
];
// 回帖增强
const huifuUbbList = [
  {
    name: "你真该死",
    ubb: "[audio]https://file.uhsea.com/2304/3deb45e90564252bf281f47c7b47a153KJ.mp3[/audio]",
  },
  {
    name: "卧槽",
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
];
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

  // 确保在页面加载完成后再执行代码，否则 jquery 可能会获取不到 document 内容
  $(document).ready(() => {
    addCustomStyle();
    createScriptSetting();

    userSetting["showTopAndDownBtn"] && addTopAndDown();
    userSetting["showChuiniuHistory"] && executeFunctionForURL("/games/chuiniu/doit.aspx", chuiniuHistory);
    userSetting["oneClickCollectMoney"] && executeFunctionForURL(/^\/bbs-.*\.html$/, speedEatMoney, true);
    userSetting["hideXunzhang"] && executeFunctionForURL(/^\/bbs-.*\.html$/, hideXunzhang, true);
    userSetting["showHuifuCopy"] && executeFunctionForURL(/^\/bbs-.*\.html$/, huifuCopy, true);
    executeFunctionForURL(/^\/bbs\/book_view_.*\.aspx$/, bookViewAddUbb, true);
    executeFunctionForURL(/^\/bbs-.*\.html$/, huifuAddUbb, true);
    executeFunctionForURL(/^\/bbs-.*\.html$/, loadEmoji, true);
    executeFunctionForURL(/^\/bbs-.*\.html$/, changeImgSize, true);
  });
})();

// 回帖 ubb 增强
function huifuAddUbb() {
  $(".kuaisuhuifu a").remove(); // 移除帖子快速回复旁“文件回帖”按钮

  createToggleEle();
  createUbbListEle();

  if (!getUserSetting("showHuifuUbb")) {
    $(".ubb-list-div").hide();
  }

  function handleInsert(item) {
    const { ubb, isUpload, isInput } = item;
    if (isUpload) {
      // 上传文件
      insetCustomContent(ubb, ".centered-container .retextarea", true);
    } else if (isInput) {
      // 输入内容
      insetCustomContent(ubb, ".centered-container .retextarea", true);
    } else {
      // 直接插入
      insetCustomContent(ubb, ".centered-container .retextarea", true);
    }
  }
  function createUbbListEle() {
    const ubbListHtml = [];
    const tempList = [...huifuUbbList, ...bookViewUbbList];
    tempList.forEach((ubbItem) => {
      const span = $(`<span class="ubb-item">${ubbItem.name}</span>`);
      $(span).click(() => handleInsert(ubbItem));
      ubbListHtml.push(span);
    });
    $(".viewContent .sticky").after('<div class="ubb-list-div"></div>');
    $(".ubb-list-div").append(ubbListHtml);
  }
  function createToggleEle() {
    const toggleEle = $(`<span class="custom-toggle-btn">${getUserSetting("showHuifuUbb") ? "折叠 UBB" : "展开 UBB"}</span>`);
    toggleEle.click(function () {
      const showHuifuUbb = getUserSetting("showHuifuUbb");
      if (showHuifuUbb) {
        saveUserSetting("showHuifuUbb", false);
        $(".ubb-list-div").hide();
        $(this).text("展开 UBB");
      } else {
        saveUserSetting("showHuifuUbb", true);
        $(".ubb-list-div").show();
        $(this).text("折叠 UBB");
      }
    });
    $(".viewContent .kuaisuhuifu").append(toggleEle);
  }
}
// 发帖 ubb 增强
function bookViewAddUbb() {
  createToggleEle();
  createUbbListEle();

  if (!getUserSetting("showBookViewUbb")) {
    $(".ubb-list-div").hide();
  }

  function handleInsert(item) {
    const { ubb, isUpload, isInput } = item;
    if (isUpload) {
      // 上传文件
      insetCustomContent(ubb, ".content [name='book_content']", true);
    } else if (isInput) {
      // 输入内容
      insetCustomContent(ubb, ".content [name='book_content']", true);
    } else {
      // 直接插入
      insetCustomContent(ubb, ".content [name='book_content']", true);
    }
  }
  function createUbbListEle() {
    const ubbListHtml = [];
    bookViewUbbList.forEach((ubbItem) => {
      const span = $(`<span class="ubb-item">${ubbItem.name}</span>`);
      $(span).click(async () => handleInsert(ubbItem));
      ubbListHtml.push(span);
    });
    // $(".content br").eq(1).after('<div class="ubb-list-div"></div>');
    $(".content .book_view_add_height").eq(1).after('<div class="ubb-list-div" style="margin:0 0 6px;"></div>');
    $(".ubb-list-div").append(ubbListHtml);
  }
  function createToggleEle() {
    const toggleEle = $(`<span class="custom-toggle-btn" style="font-size:10px;">${getUserSetting("showBookViewUbb") ? "折叠 UBB" : "展开 UBB"}</span>`);
    toggleEle.click(function () {
      const showBookViewUbb = getUserSetting("showBookViewUbb");
      if (showBookViewUbb) {
        saveUserSetting("showBookViewUbb", false);
        $(".ubb-list-div").hide();
        $(this).text("展开 UBB");
      } else {
        saveUserSetting("showBookViewUbb", true);
        $(".ubb-list-div").show();
        $(this).text("折叠 UBB");
      }
    });
    // $(".content input[name='g']").after(toggleEle);
    $(".content #saveDraftButton").before(toggleEle);
  }
}

// 修改图片大小
function changeImgSize() {
  const imgThumbWidth = getUserSetting("imgThumbWidth");
  $("head").append(`<style>.img-thumb{/* width:30%; */max-width:${imgThumbWidth}px;}`); // 将图片缩小样式添加到页面中

  $("img").each(function () {
    const imageWidth = $(this).width(); // 获取当前图片的显示宽度
    // const bodyWidth = $("body").width(); // 获取 body 区域的宽度
    // const percentage = (imageWidth / bodyWidth) * 100; // 计算百分比
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
  $(".reline.list-reply .retext").each(function () {
    const spanEle = $("<span class='huifu-copy'>+1</span>");
    $(this).append(spanEle);
    spanEle.click((e) => {
      e.stopPropagation();
      const parentText = $(this).clone().children(".huifu-copy").remove().end().text().trim();
      insetCustomContent(parentText, ".centered-container .retextarea");
      scrollToEle(".centered-container .retextarea");
      setTimeout(() => {
        $(".kuaisuhuifu input").trigger("click");
      }, 300);
    });
  });
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
          <li class="setting-li-title"><hr/><b>关于脚本</b><hr/></li>
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

          <li class="setting-li-title"><hr/><b>设置</b><hr/></li>
          <li class="setting-li-between">
            <span>设置图标大小(px)</span>
            <input name="settingIconSize" class="setting-li-input" type="number" value="${getUserSetting("settingIconSize")}"/>
          </li>
          <li class="setting-li-tips">
            <span>设置入口图标大小，设置为 0 时不显示，设置内容存储于 localStorage，需要重新显示请</span>
            <span class='clear-setting'>重置设置</span>
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
          <!--<li class="setting-li-between">
            <span><a href="https://www.superbed.cn/" target="_blank">图床token</a></span>
            <input style="width:150px;" class="setting-li-input" value="${getUserSetting(
              "superbedToken"
            )}" name="superbedToken" id="superbedToken"  type="password" placeholder="为空则为游客上传…"/>
          </li>
          <li class="setting-li-tips">用于发帖/回帖图片/视频自动上传</li>-->
          <li class="setting-li-between">
            <span>图片宽度(px)</span>
            <input name="imgThumbWidth" class="setting-li-input" type="number" value="${getUserSetting("imgThumbWidth")}"/>
          </li>
          <li class="setting-li-tips">缩放页面中图片到指定宽度，设置为 0 时不缩放</li>
          <!--<li class="setting-li-between">
            <span>回帖表情展开</span>
            <div class="switch">
              <input name="showFaceList" value="true" ${
                getUserSetting("showFaceList") ? "checked" : ""
              }  class="switch-checkbox" id="showFaceList" type="checkbox">
              <label class="switch-label" for="showFaceList">
                <span class="switch-inner" data-on="开" data-off="关"></span>
                <span class="switch-switch"></span>
              </label>
            </div>
          </li>
          <li class="setting-li-between">
            <span>展开发帖 UBB</span>
            <div class="switch">
              <input name="showBookViewUbb" value="true" ${
                getUserSetting("showBookViewUbb") ? "checked" : ""
              }  class="switch-checkbox" id="showBookViewUbb" type="checkbox">
              <label class="switch-label" for="showBookViewUbb">
                <span class="switch-inner" data-on="开" data-off="关"></span>
                <span class="switch-switch"></span>
              </label>
            </div>
          </li>
          <li class="setting-li-between">
            <span>展开回帖 UBB</span>
            <div class="switch">
              <input name="showHuifuUbb" value="true" ${
                getUserSetting("showHuifuUbb") ? "checked" : ""
              }  class="switch-checkbox" id="showHuifuUbb" type="checkbox">
              <label class="switch-label" for="showHuifuUbb">
                <span class="switch-inner" data-on="开" data-off="关"></span>
                <span class="switch-switch"></span>
              </label>
            </div>
          </li>-->


          <li class="setting-li-title more-setting" style="margin-bottom:0;display: none;"><hr/><b>高级设置</b><hr/></li>
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
          <li class="setting-li-between more-setting" style="display: none;">
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
        </ul>
        <footer>
          <hr/>
          <span class="setting-cancel-btn">取消</span>
          <span class="setting-confirm-btn">保存</span>
        </footer>
      </form>
      </div>
    `;
    container.append(vSettingEle);
    // 禁止蒙版下的body内容滚动
    $("body").css("overflow", "hidden");
    // 高级设置
    $(".setting-div .setting-title").click(
      clickCounter(
        ".setting-div .setting-title",
        function () {
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
          .find("input")
          .each(function () {
            // 根据不同input type格式化值，否则全部为字符串
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
            } else {
              formData[this.name] = this.value;
            }
          });

        const cacheSetting = JSON.parse(localStorage.getItem("yaohuoBetterPlusSetting"));
        for (const key of Object.keys(formData)) {
          cacheSetting[key] = formData[key];
        }
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
    if (getUserSetting("showMoreSetting")) {
      $(".setting-div .more-setting").show();
    }
  }
  // 设置 icon
  function createIcon() {
    const windowWidth = $(window).width();
    const bodyContentWidth = $("body").width();
    const iconSize = getUserSetting("settingIconSize") + "px";
    $("<img>")
      .attr("id", "settingICon")
      .attr("src", "https://pic.imgdb.cn/item/66c4cb46d9c307b7e92a418b.png")
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
    // createPopupContainer();
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

// 滚动页面到指定标签，并显示在屏幕中间
function scrollToEle(toEle) {
  const targetElement = $(toEle); // 使用适当的选择器选择目标元素
  const windowHeight = $(window).height(); // 获取窗口的高度
  const elementOffset = targetElement.offset().top; // 获取目标元素相对于文档顶部的偏移量
  const offset = elementOffset - windowHeight / 2; // 计算滚动的偏移量

  $("html, body").animate(
    {
      scrollTop: offset,
    },
    100
  ); // 平滑滚动到计算的偏移量位置，持续时间为 500 毫秒
}

// Ajax 请求
function myAjax(url, data, method, options) {
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
