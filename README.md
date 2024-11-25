# 妖火网增强脚本

### 介绍

妖火网增强脚本，让妖火再次伟大（手动狗头.jpg）

###### 注 1：本脚本依赖远程加载 JQuery 实现相关功能，所以当网不好或者 JQuery 的 CDN 出错时会无法执行相关功能，属于正常情况，不在 bug 范围内，也不会考虑自己实现相关功能，勿反馈，反馈了也没用 (｡◕ˇ∀ˇ◕)

###### 注 2：绝大部分功能均可单独开启和关闭（未做开关的都是我觉得没有必要控制的，有需求再说），不保证兼容其他插件，使用其他插件的请自行测试，与其他脚本的兼容性问题不在修复范围内

### 功能列表

##### 基础功能

- [x] 一键回到顶部/底部
- [x] 隐藏勋章
- [x] 发帖增强
- [x] 回帖增强
  - [x] 表情增强
  - [x] ubb 增强 ……

##### 高级功能

使用以下功能前，请先阅读并背诵版规(手动狗头.jpg)，不要影响论坛正常体验以下功能默认关闭，请自行查看源码获取打开方式

- [x] 一键吃肉
- [x] 吹牛历史查询
- [x] 复读机(回复+1) ……

### 使用说明

使用支持脚本的浏览器加载脚本即可

电脑推荐油猴插件，安卓手机推荐 360 极速浏览器/via，ios 推荐 360 浏览器/alook

tips：快速点击设置里的脚本名称有惊喜

### 感谢名单

脚本编写过程中参考并使用了部分网友/妖友的代码（毕竟没有什么比 cv 大法更快了），包括但不限于(如果发现使用了你的代码，但是没在名单内可以站内私信我，我给你加上)：

- ▌ 壹贰叁肆吳 ┃ 彦祖@24407
- 龙少 c@20469
- 外卖不用券@23825
- 无糖奶盖@28090
- 烟花小神 Joker@24974
- 五万药友的梦@40498 ……

#### 更新日志

- 0.1.0
  - 【新增】一键回到顶部/底部
- 0.2.0
  - 【新增】吹牛发布者历史查询
  - 【修复】一键回到顶部/底部 在移动端显示错位问题
- 0.3.0
  - 【优化】吹牛历史发布查询相关代码，使其更精简高效
  - 【新增】设置按钮、弹出内容区域（设置项尚未填充）
- 0.4.0
  - 【新增&优化】当前网址检测，避免移动端浏览器不识别油猴标识导致脚本在其他网站运行
  - 【新增】一键吃肉
- 0.5.0
  - 【优化】一键吃肉判断逻辑，避免没肉硬吃（简称水回复）
  - 【优化】设置弹窗大小,适配移动端
  - 【优化】一键回到顶部/底部 按钮增大，方便移动端点击
  - 【新增】隐藏楼主勋章
  - 【优化】完善相关设置项
- 0.6.0
  - 【优化】重构网址检测，直接采取 location.host 判断，快准狠
  - 【新增】首次使用确认提示
  - 【优化】完善设置项目，新增高级设置相关
  - 【新增】复读机(回复+1)
- 0.7.0
  - 【新增】回帖表情增强
  - 【新增&优化】新增部分设置，优化设置逻辑
- 0.8.0
  - 【优化】重构快速回复点击逻辑，避免移动端键盘非必要的弹出
  - 【优化】复读机按钮内容不换行
  - 【新增】页面图片自动缩小
- 0.8.1
  - 【修复】图片为 gif 时无法点击放大/缩小
- 0.9.0
  - 【修复】图片为上传到论坛附件时，点击进入预览
  - 【优化】复读机+1 时，将输入框滚动到屏幕中间，以便查看是否回复成功
  - 【优化】表情增强大小，手机端方便操作
  - 【新增】发帖/回帖 ubb 增强设置及相关内容
- 0.9.1
  - 【修复】完善发帖/回帖 ubb 功能
- 0.9.2
  - 【优化】重构回帖表情增强功能
  - 【优化】取消部分设置项，新增部分设置 tips
- 0.9.3
  - 【修复】回帖 ubb 默认展开时显示文字错误
  - 【优化】复读机逻辑，更符合直觉
  - 【新增】重置设置按钮，避免玄学 bug 产生
- 0.9.4
  - 【优化】发帖/回帖 ubb 样式微调
- 0.9.5
  - 【新增】复读机是否自动回复开关。点击+1 按钮后是否自动提交
  - 【优化】将设置 icon 更改为 base64，避免原图图片加载失败时设置按钮显示错误
  - 【优化】隐藏部分因为种种原因而未完成 ubb 选项
  - 【优化】图片缩放样式，避免图片并排
- 1.0.0 正式版发布
- 1.1.0
  - 【修复】发帖增强 ubb 在修改帖子页面不生效
  - 【修复】复读机在新版回帖下不生效
  - 【新增】页面内设置按钮，解决某些妖友将设置 icon 大小设置为 0 时不知道怎么重置设置的问题。同时解决因图标无法移动带来的某些情况下影响浏览/回复的问题(将 icon 大小设置为 0 即可)
- 1.2.0
  - 【修复】发帖表情增强插入错误
  - 【新增】发帖 ubb “图片”点击可以直接上传到图床并回显了(需配置水墨图床 token，感谢水墨图床的支持)
- 1.2.1
  - 【新增】重置设置
  - 【修复】引入新版回帖复读机引起的旧版回帖不生效(ps:bug 产生原因是老 C 存在 localstorage 的是单纯的字符串，导致直接取出来判断 bool 一直是 true)
  - 【修复】当图片缩放宽度设置为 0 时，点击事件依旧存在，从而导致点击页面内图片造成图片丢失的问题
  - 【优化】设置内容样式，更符合手机端使用；取消无用动画，降低性能开销
  - 【优化】发帖 ubb “图片”点击事件逻辑。在未配置 token 时向输入框插入默认 ubb
- 1.3.0
  - 【移除】复读机相关功能设置
  - 【新增】修改惯用手(将帖子列表底部“上一页”“下一页”按钮位置互换，妖友疑问，我觉得可以实现，原贴：https://yaohuo.me/bbs-1360801.html)
  - 【新增】帖子列表自动加载更多
  - 【新增】回帖自动加载更多
  - 【新增】PC 端，点击帖子弹窗打开(修改妖友代码，原贴https://yaohuo.me/bbs/book_view.aspx?id=1361242&siteid=1000&classid=177)
- 1.3.1
  - 【修复】帖子/回复列表加载更多重复点击问题
  - 【优化】帖子列表加载更多阈值，手机端体验更流畅
  - 【优化】图片缩放执行时机，解决因页面内图片加载慢导致的部分图片不缩放问题
- 1.4.0
  - 【优化】调整发帖/回帖 ubb 样式及功能，可以更方便的水贴/回帖了
  - 【新增】更多有趣(沙雕)表情
- 1.4.1
  - 【修复】新版发帖/修改贴子页面 ubb 失效问题(万恶的老 C，凭空给我增加工作量)
  - 【移除】ubb 列表内音频 ubb(感觉无实际意义，大家也基本不会点开语音条，不如表情包来得实在)
  - 【优化】图片缩放逻辑，不再缩放评论区图片
