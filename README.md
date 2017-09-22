# 音乐播放器

### 作者，肖丰。

![My-FM(2).png](http://upload-images.jianshu.io/upload_images/5430411-db872118a2aa801b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

预览地址， https://xuwanwantt.github.io/My-FM/index.html

### 介绍

- 收藏列表，可通过点击爱心按钮将音乐名添加到其中，并缓存到本地
- 歌词滚动，可切换全屏滚动和单行滚动
- 音量调节，单击音量按钮，可直接静音
- 歌曲类型栏的轮播，通过左右按钮可操作切换
- 进度条，可通过按钮拖动调节播放进度

### 技术

- HTML ，利用 HTML5 的 audio 标签，实现页面添加音频；HTML 5 的localStorage存储收藏列表

- CSS ，用到flex布局，box-shadow ， text-shadow ， box-radius ，定位等属性，使元素更美观

- JavaScript ，主要功能的实现，使用原生JS。
  - 例如操作DOM，创建新标签，添加元素，实现“收藏列表”和歌词滚动；

  - 通过对元素的监听，实现播放器应有的操作体验，如播放、暂停、下一个等功能；

  - 利用条件判断和数组操作，实现频道的轮播；
  通过cros，实现跨域，请求到音乐数据；

- iconfont ，利用阿里的 iconfont 生成 svg 文件，配合对应的JS文件和 svg 标签，实现各种按钮的图标。

### 后记

实现过程中进度条的实现感觉有点难，通过判断鼠标位置，换算到进度条刻度，通过对鼠标事件的监听和取消，得到进度，并让歌词和音频同步，交互过程中会有一点延迟和误差。



注：接口数据源来自百度 FM ，饥人谷制作，仅供前端爱好者学习交流。

再注：不给个星星么~欢迎交流讨论，共同进步。


