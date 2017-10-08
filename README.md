# 音乐播放器

### 作者，肖丰。

![My-FM.png](http://upload-images.jianshu.io/upload_images/5430411-330fe443c115413f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

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

实现过程困难重重啊。

##### 歌词展示

核心：
- 正则获取歌词的时间和内容```let reg = /^\[(.+)\](.+)$/```
- currentTime，获取前播放时间time，通过对比歌词中的时间得到当前歌词```arr[i] < time < arr[i+1]```

这里使用了两种方式表现，第一种是在后台通过操作数组，替换 innerText ，第二种是将歌词渲染到 DOM ，通过操作 DOM 的 top 属性，实现滚动


##### 进度条功能的实现

通过判断鼠标位置，换算到进度条刻度，通过对鼠标事件的监听和取消，得到进度，并让歌词和音频同步，交互过程中会有一点延迟和误差。

##### 本地存储

使用 localStorage 进行本地存储和读取,
```
window.localStorage.setItem('list',JSON.stringify(songVoteList))
```
```
songVoteList = JSON.parse(window.localStorage.getItem('list'))
```

将每次 vote 之后的歌曲 push到一个数组中，如果取消 vote，则删除数组中对应的元素，最后，遍历数组将数据 append 到页面上，在 append 之前需要清空容器``` node.innerText = '' ```

注：接口数据源来自百度 FM ，饥人谷制作，仅供前端爱好者学习交流。

再注：不给个星星么~欢迎交流讨论，共同进步。


