var $ = function(node){
  if(document.querySelectorAll(node).length === 1){
    return document.querySelector(node)
  }
  return document.querySelectorAll(node)}

var playSong = new Audio()
var showVol = playSong.volume
var songLock = true
var channelname = []
var channelid = []
var index = 0
var songTime = 0
var arrLrc = []
var arrSong
var songnum = 0
var songVoteList = []
var lrcHeight

//一些事件的监听

$('.volicon').addEventListener('click',function(){
  $('.volicon').classList.add('changeVol')
  $('.noVol').classList.remove('changeVol')
  playSong.volume = 0
})

$('.noVol').addEventListener('click',function(){
  $('.noVol').classList.add('changeVol')
  $('.volicon').classList.remove('changeVol')
  playSong.volume = showVol
})

$('.vol').addEventListener('click',function(){
  $('.vols').classList.add('active')
  $('.vol').classList.remove('active')
})

$('.vols').addEventListener('mouseleave',function(){
  $('.vol').classList.add('active')
  $('.vols').classList.remove('active')
})

$('.vols').addEventListener('click',function(e){
  var idx = [].indexOf.call($('.vols > li'),e.toElement)
  for(var i = 0; i < $('.vols > li').length; i++){
    $('.vols > li')[i].classList.remove('active')
    $('.vol > li')[parseInt(i/2)].classList.remove('active')
  }
  for(var i = 0; i < idx; i++){
    $('.vols > li')[i].classList.add('active')
  }
  for(var i = 0; i < idx-1; i++){
    $('.vol > li')[parseInt(i/2)].classList.add('active')
  }
  playSong.volume = 1 - idx/10
})

$('.play').addEventListener('click',function(){
  $('.play').classList.add('active')
  $('.pause').classList.remove('active')
  playSong.play()
})

$('.pause').addEventListener('click',function(){
  $('.pause').classList.add('active')
  $('.play').classList.remove('active')
  playSong.pause()
})

$('.vote').addEventListener('click',function(){
  $('.vote').classList.add('active')
  $('.voteR').classList.remove('active')
  dealVote()
  songnum++
})

$('.voteR').addEventListener('click',function(){
  $('.voteR').classList.add('active')
  $('.vote').classList.remove('active')
  dealVoteR()
  songnum--
})

playSong.addEventListener('play',function(){
  $('.play').classList.add('active')
  $('.pause').classList.remove('active')
})

playSong.addEventListener('pause',function(){
  $('.pause').classList.add('active')
  $('.play').classList.remove('active')
})

playSong.addEventListener('ended',function(){
  getSong()
})

//从后台获取数据

function getChannels(){
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if(xhr.status === 200 || xhr.status === 304){
        dealChannels(JSON.parse(xhr.responseText))
      }else {
        alert('获取频道出错，请刷新页面')
      }
    }
  }
  xhr.open('get','https://api.jirengu.com/fm/getChannels.php',true)
  xhr.send()
}

function getSong(){
  var xhr = new XMLHttpRequest()
  if(!songLock){return}
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if(xhr.status === 200 || xhr.status === 304){
        $('.showLrc').innerText = ''
        dealSongGet(JSON.parse(xhr.responseText))
      }else {
        alert('获取歌曲出错，请刷新页面')
      }
      songLock = true
    }
  }
  xhr.open('get','https://api.jirengu.com/fm/getSong.php?channel=' + channelid[index],true)
  xhr.send()
  songLock = false  
}

function getLrc(id){
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if(xhr.status ===200 || xhr.status === 304){
        dealLrc(JSON.parse(xhr.responseText))
        lrcScroll()
        getList2()
        getHeight()
      }else {
        alert('获取歌词出错，请刷新页面')
      }
    }
  }
  xhr.open('get','https://api.jirengu.com/fm/getLyric.php?&sid=' + id,true)
  xhr.send()
}

window.onload = getChannels
playSong.autoplay = true
getSong()
getLrc()

//处理频道

function dealChannels(data){
  var arr = data.channels
  var html = ''
  for(var i = 0; i < arr.length; i++){
    channelname.push(arr[i]['name'])
    channelid.push(arr[i]['channel_id'])
  }
  channelname.push(channelname[0])
  channelname.unshift(channelname[channelname.length - 2])
  showChannels()  
}

function showChannels(){
  $('.introduce p')[0].innerText = channelname[index]
  $('.introduce p')[1].innerText = channelname[index + 1]
  $('.introduce p')[2].innerText = channelname[index + 2]
}

$('.tabR').addEventListener('click',function(){
  $('.showLrc').innerText = ''
  index++
  if(index > channelname.length-3){
    index = 0
    showChannels()
  }
  showChannels()
  getSong()
})

$('.tabL').addEventListener('click',function(){
  $('.showLrc').innerText = ''
  index--
  if(index < 0){
    index = channelname.length-3
    showChannels()
  }
  showChannels()
  getSong()
})

//处理歌曲，歌词

function dealSongGet(data){
  var arr = data.song
  arrSong = data.song
  dealSong(arr[0])
}

function dealSong(data){
  $('.img > img').src = data.picture
  $('.song').innerText = data.title
  $('.singer').innerText = data.artist
  playSong.src = data.url
  getLrc(data.sid)
}

playSong.ondurationchange = function(){
  songTime = playSong.duration
  for(var i = 0; i < songVoteList.length; i++){
    if(playSong.src === songVoteList[i][0].url){
      $('.vote').classList.add('active')
      $('.voteR').classList.remove('active')
      return 
    }else{
      $('.voteR').classList.add('active')
      $('.vote').classList.remove('active')
    }
  }
}

function dealSongTime(time){
  var min = parseInt(time/60)
  var second = parseInt(time%60)
  var text = ''
  if(min < 10){
    text = '-0' + min + ':' + second
    if(second < 10){text = '-0' + min + ':' + '0' + second}
  }else{text = '-' + min + ':' + second}
  $('.time').innerText = text
}

$('.next').addEventListener('click',function(){
  $('.showLrc').innerText = ''
  getSong()
})

function dealLrc(data){
  arrLrc = data.lyric.split('\n')
}

function showLrc(){
  var reg = /\[.+\]/
  for(var i = 0; i < arrLrc.length; i++){
    if(arrLrc[i].match(reg) !== null){
      var arr1 = arrLrc[i].match(reg)
      var time = lrctime(playSong.currentTime)
      if(arr1[0].slice(arr1.length-10,arr1.length-5) === time){
        $('.lrc').innerText = arrLrc[i].slice(arr1[0].length)
      }
    }
  }
}
var list1 = []
var list2 = []
function lrcScroll(){
  var listT = []
  var listM = []
  var reg = /\[.+\]/ 
  for(var i = 0; i < arrLrc.length; i++){
    if(arrLrc[i].match(reg) !== null){
      var arr1 = arrLrc[i].match(reg)
      listT.push(arr1[0].slice(arr1.length-10,arr1.length-5))
      listM.push(arrLrc[i].slice(arr1[0].length))
    }
  }
  list1 = listT
  list2 = listM
}

function getList2(){
  for(var j = 0; j < list2.length; j++){
    var node = document.createElement('p')
    node.innerText = list2[j]
    $('.showLrc').appendChild(node)
  }
}

function getHeight(){
   lrcHeight = $('.showLrc').offsetHeight
}

function lrcScrollS(){
  var index = 0
  for(var k = 0; k < list1.length; k++){
    var time = lrctime(playSong.currentTime)
    if(list1[k] === time){
      for(var j = 0; j < k; j++){
        $('.showLrc p')[j].classList.remove('active')
      }
      $('.showLrc p')[k].classList.add('active')
      $('.showLrc').style.top = -(k-1)*lrcHeight/list1.length + 80 +'px';
      console.log(k)
    }
  }
}

function lrctime(time){
  var min = parseInt(time/60)
  var second = parseInt(time%60)
  var text = ''
  if(min < 10){
    text = '0' + min + ':' + second
    if(second < 10){text = '0' + min + ':' + '0' + second}
  }else{text = min + ':' + second}
  return text
}

//动态改变进度条，时间

playSong.shouldUpdate = true
playSong.ontimeupdate = function(){
  var _this = this
  if(_this.shouldUpdate) {
    dealSongTime(songTime - playSong.currentTime)
    autoBar()
    _this.shouldUpdate = false
    setTimeout(function(){
      _this.shouldUpdate = true
    }, 1000)
  }
  showLrc()
  lrcScrollS()
}

//进度条的控制

$('.dot').addEventListener('mousedown',function(){
  document.addEventListener('mousemove',dealDot)
})

document.addEventListener('mouseup',function(){
  document.removeEventListener('mousemove',dealDot)
})

document.addEventListener('mousemove',function(e){
  var k = (window.innerWidth-340)/2 + 95 + 20
  mouseXbar = e.clientX - k
  mouseXdot = e.clientX - k - 6
  if(mouseXbar > 200){mouseXbar = 200} else if(mouseXbar < 0){mouseXbar = 0}
  if(mouseXdot > 185){mouseXdot = 185} else if(mouseXdot < 0){mouseXdot = 0}
})

function dealDot(){
  $('.dot').style.left = mouseXdot + 'px'
  $('.barPro').style.width = mouseXbar + 'px'
  playSong.currentTime = mouseXbar*songTime/200
  dealSongTime(songTime - mouseXbar*songTime/200)
}

function autoBar(){
  $('.dot').style.left = playSong.currentTime*185/songTime + 'px'
  $('.barPro').style.width = playSong.currentTime*200/songTime + 'px'
}

//歌单

function dealVote(){
  songVoteList.push(arrSong)
  var html = songnum + 1 + '.' + songVoteList[songnum][0].title + '-' + songVoteList[songnum][0].artist
  var node = document.createElement('li')
  node.innerText = html
  $('.songList').appendChild(node)
}

function dealVoteR(){
  songVoteList.pop(songVoteList[songnum])
  var node = $('.songList li')
  if(node.length !== undefined){node = $('.songList li')[songnum-1]}
  $('.songList').removeChild(node)
}

$('.songListicon').addEventListener('click',function(){
  if($('.saveList').classList.contains('show')){
    $('.saveList').classList.remove('show')
  }else{
    $('.saveList').classList.add('show')
    $('.lrcScroll').classList.remove('show')
  }
})

$('.lyricicon').addEventListener('click',function(){
  if($('.lrc').classList.contains('show')){
    $('.lrc').classList.remove('show')
    $('.lrcScroll').classList.add('show')
    getHeight()
    $('.saveList').classList.remove('show')
  }else{
    $('.lrc').classList.add('show')
    $('.lrcScroll').classList.remove('show')
  }
})

$('.songList').addEventListener('click',function(e){
  var idx = [].indexOf.call($('.songList > li'),e.toElement)
  dealSong(songVoteList[idx][0]) 
})


