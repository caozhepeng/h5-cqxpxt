<template>
    <div class="video_player_container">
        <!-- <video id="myVideo" class="video-js" v-bind="$attrs" ref="refVideo" :controls="props.controls" :loop="false"
            @play="handlePlay" @pause="handlePause" @ended="handleEnded" @seeking="onSeeking" @seeked="onSeeked"
            @timeupdate="onTimeupdate"></video> -->
        <!-- <div class="cover_view"></div> -->
    <div class="component-container">
        <div class="video-wrapper">
          <!-- 视频容器将由Video.js初始化 -->
          <video ref="videoElement" class="video-js" playsinline webkit-playsinline></video>
        </div>
      </div>
      
      <div class="time-display">
        <div class="time-item">
          <div class="time-label">当前时间</div>
          <div id="current-time">{{ formattedCurrentTime }}</div>
        </div>
        <div class="time-item">
          <div class="time-label">总时长</div>
          <div id="duration">{{ formattedDuration }}</div>
        </div>
        <div class="time-item">
          <div class="time-label">播放状态</div>
          <div>{{ isPlaying ? '播放中' : '暂停' }}</div>
        </div>
      </div>
      
      <div class="status">
        进度条状态: <strong>{{ isReadonly ? '禁止拖动' : '允许拖动' }}</strong>
      </div>
      
      <div class="controls">
        <button @click="toggleReadonly" class="btn">{{ isReadonly ? '启用拖动' : '禁用拖动' }}</button>
        <button @click="toggleFullscreen" class="btn btn-alt">切换全屏</button>
        <button @click="resetVideo" class="btn">重置视频</button>
        <button @click="togglePlay" class="btn">{{ isPlaying ? '暂停' : '播放' }}</button>
      </div>
      
      <div class="mobile-tips">
        <h3>移动端功能说明</h3>
        <ul>
          <li>全屏模式下同样禁止拖动和快进</li>
          <li>已禁用方向键快进功能</li>
          <li>优化了移动端控制栏显示</li>
          <li>添加了触摸事件阻止，防止意外拖动</li>
          <li>在iOS和Android设备上测试通过</li>
        </ul>
      </div>
      
      <div class="footer">
        <p>Vue3 Video.js 只读进度条组件 | 适用于需要限制播放进度的场景</p>
      </div>
    </div>
</template>

<script setup lang="ts">
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const emit = defineEmits([
    'update:currentTime', // 更新播放进度
    'play',               // 播放事件
    'pause',              // 暂停事件
    'ended'               // 结束事件
]);
const props = defineProps({
    controls: {
        type: Boolean,
        default: false,
    },

    // 视频封面图
    poster: {
        type: String,
        default: "",
    },

    // 是否使用自定义控制器
    useCustomControls: {
        type: Boolean,
        default: true,
    },

    // 当前播放时间（v-model）
    currentTime: {
        type: Number,
        default: 0,
    },
});

// let player = null;
const refVideo = ref<HTMLVideoElement | null>(null);
// 播放状态
// const isPlaying = ref(false);
let timeNow = 0;
/** 拖动之前的时间 */
let timebefore = 0;

let tuodong = false;

/** 当浏览器已加载音频/视频的元数据时 */
const handleLoadedmetadata = () => {
    if (refVideo.value) {
        //   duration.value = refVideo.value.duration;

        // 确保初始时间正确设置
        if (props.currentTime > 0) {
            // 初始化暂停时间
            timePauseTime = props.currentTime;
            refVideo.value.currentTime = props.currentTime;
        }
    }
}
let timePauseTime = 0;
const onSeeking = (v) => {
    // console.log("推动中:", refVideo.value.currentTime);
    if (!tuodong) {
        console.log('拖动中', refVideo.value.currentTime);
        if (!isPlaying.value) { // 暂停状态
        } else {
            timebefore = refVideo.value.currentTime;
        }
    }
    tuodong = true;
    videoPause();
};

const onSeeked = (v) => {

}

const videoPause = () => {
}

// 处理播放事件
const handlePlay = () => {
    console.log('播放');

    isPlaying.value = true;
    emit('play');
};

// 处理暂停事件
const handlePause = () => {
    isPlaying.value = false;
    emit('pause');
};

// 处理结束事件
const handleEnded = () => {
    isPlaying.value = false;
    emit('ended');
};

/** 当目前的播放位置已更改时 */
const onTimeupdate = (v) => {
    // console.log("onTimeupdate:", v);
    // console.log('onTimeupdate-currentTime:', refVideo.value.currentTime);
    // timeNow = refVideo.value.currentTime;
    //   emit('update:currentTime', timeNow);

}

const setClick = () => {
    refVideo.value.currentTime = 10;
}

function resizePlayer() {
    var width = document.getElementById('myVideo').clientWidth; // 获取容器宽度
    console.log('w:', width);

    var height = width * (9 / 16); // 假设仍然是16:9的宽高比
    // player.width(width).height(height); // 设置播放器宽度和高度
}

// 监听currentTime变化（从父组件）
watch(() => timeNow, (newVal) => {
    if (refVideo.value && Math.abs(refVideo.value.currentTime - newVal) > 0.5) {
        refVideo.value.currentTime = newVal;
    }
});

 const videoElement = ref(null);
        const player = ref(null);
        const isReadonly = ref(true);
        const isPlaying = ref(false);
        const currentTime = ref(0);
        const duration = ref(0);
        const formattedCurrentTime = ref('00:00');
        const formattedDuration = ref('00:00');
        
        // 格式化时间为 MM:SS
        const formatTime = (time) => {
          const minutes = Math.floor(time / 60);
          const seconds = Math.floor(time % 60);
          return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        };
        
        // 初始化视频播放器
        const initPlayer = () => {
          if (player.value) return;
          
          player.value = videojs(videoElement.value, {
            controls: true,
            autoplay: false,
            aspectRatio: '16:9',
            preload: 'auto',
            controlBar: {
              children: [
                'playToggle',
                'currentTimeDisplay',
                'progressControl',
                'durationDisplay',
                'fullscreenToggle'
              ],
              volumePanel: false
            },
            sources: [{
              src: 'https://vjs.zencdn.net/v/oceans.mp4',
              type: 'video/mp4'
            }],
            nativeControlsForTouch: false,
            userActions: {
              doubleClick: false,
              hotkeys: false
            }
          });
          
          // 事件监听
          player.value.on('play', () => isPlaying.value = true);
          player.value.on('pause', () => isPlaying.value = false);
          player.value.on('timeupdate', updateTime);
          player.value.on('durationchange', updateTime);
          player.value.on('fullscreenchange', handleFullscreenChange);
          player.value.on('keydown', handleKeydown);
          
          // 初始应用只读设置
          applyReadOnlyProgressBar();
        };
        
        // 应用只读进度条
        const applyReadOnlyProgressBar = () => {
          if (!player.value) return;
          
          // CSS禁用交互
          const progressControl = player.value.controlBar.progressControl.el();
          if (progressControl) {
            progressControl.style.pointerEvents = 'none';
            progressControl.style.cursor = 'default';
          }
          
          // 隐藏进度条滑块
          const playProgress = document.querySelector('.vjs-play-progress');
          if (playProgress) {
            playProgress.style.setProperty('--vjs-progress-before-display', 'none');
          }
          
          // 移动端添加触摸事件阻止
          if ('ontouchstart' in window) {
            const progressHolder = document.querySelector('.vjs-progress-holder');
            if (progressHolder) {
              progressHolder.addEventListener('touchstart', preventTouch, { passive: false });
              progressHolder.addEventListener('touchmove', preventTouch, { passive: false });
            }
          }
        };
        
        // 移除只读进度条
        const removeReadOnlyProgressBar = () => {
          if (!player.value) return;
          
          const progressControl = player.value.controlBar.progressControl.el();
          if (progressControl) {
            progressControl.style.pointerEvents = '';
            progressControl.style.cursor = '';
          }
          
          const playProgress = document.querySelector('.vjs-play-progress');
          if (playProgress) {
            playProgress.style.setProperty('--vjs-progress-before-display', '');
          }
          
          // 移除触摸事件监听
          if ('ontouchstart' in window) {
            const progressHolder = document.querySelector('.vjs-progress-holder');
            if (progressHolder) {
              progressHolder.removeEventListener('touchstart', preventTouch);
              progressHolder.removeEventListener('touchmove', preventTouch);
            }
          }
        };
        
        // 阻止触摸事件
        const preventTouch = (e) => {
          e.preventDefault();
          e.stopPropagation();
        };
        
        // 更新播放时间
        const updateTime = () => {
          if (!player.value) return;
          
          currentTime.value = player.value.currentTime();
          duration.value = player.value.duration();
          
          formattedCurrentTime.value = formatTime(currentTime.value);
          
          if (!isNaN(duration.value)) {
            formattedDuration.value = formatTime(duration.value);
          }
        };
        
        // 处理全屏变化
        const handleFullscreenChange = () => {
          // 移动端全屏后重新应用样式
          setTimeout(() => {
            if (isReadonly.value) {
              applyReadOnlyProgressBar();
            }
          }, 300);
        };
        
        // 处理键盘事件
        const handleKeydown = (event) => {
          // 37: 左箭头, 39: 右箭头
          if (event.keyCode === 37 || event.keyCode === 39) {
            event.preventDefault();
            event.stopPropagation();
          }
        };
        
        // 切换只读模式
        const toggleReadonly = () => {
          isReadonly.value = !isReadonly.value;
          
          if (isReadonly.value) {
            applyReadOnlyProgressBar();
          } else {
            removeReadOnlyProgressBar();
          }
        };
        
        // 切换全屏
        const toggleFullscreen = () => {
          if (!player.value) return;
          
          if (player.value.isFullscreen()) {
            player.value.exitFullscreen();
          } else {
            player.value.requestFullscreen();
          }
        };
        
        // 重置视频
        const resetVideo = () => {
          if (!player.value) return;
          
          player.value.currentTime(0);
          player.value.play();
        };
        
        // 切换播放状态
        const togglePlay = () => {
          if (!player.value) return;
          
          if (player.value.paused()) {
            player.value.play();
          } else {
            player.value.pause();
          }
        };
        
        onMounted(() => {
          initPlayer();
          
          // 移动端触摸事件处理
          if ('ontouchstart' in window) {
            const videoContainer = videoElement.value;
            if (videoContainer) {
              // 防止进度条触摸
              videoContainer.addEventListener('touchstart', (e) => {
                const progressControl = document.querySelector('.vjs-progress-control');
                if (progressControl && progressControl.contains(e.target)) {
                  e.preventDefault();
                }
              }, { passive: false });
              
              // 防止全屏触摸拖动
              videoContainer.addEventListener('touchmove', (e) => {
                if (player.value && player.value.isFullscreen()) {
                  e.preventDefault();
                }
              }, { passive: false });
            }
          }
        });
        
        onBeforeUnmount(() => {
          if (player.value) {
            player.value.dispose();
            player.value = null;
          }
        });
      

// onMounted(() => {

//     // 初始化播放器
//     player = videojs(refVideo.value, {
//         controls: true,
//         // sources: [{
//         //   src: 'https://vjs.zencdn.net/v/oceans.mp4', // 替换为你的视频地址
//         //   type: 'video/mp4'
//         // }],
//         disableEventHandlers: true, // 防止其他事件触发拖动
//         aspectRatio: '16:9',
        
//         // 自定义控制栏配置
//             controlBar: {
//                 children: [
//                     'playToggle',
//                     'currentTimeDisplay', // 当前时间
//                     'progressControl',
//                     'durationDisplay',    // 总时长
//                     'fullscreenToggle'
//                 ],
//                 volumePanel: false
//             },
//             nativeControlsForTouch: false, // 禁用原生控制，使用Video.js控制
//             userActions: {
//                 doubleClick: false,       // 禁用双击全屏
//                 hotkeys: false            // 禁用快捷键
//             }

//         // controlBar: {
//         //     playToggle: true,
//         //     currentTimeDisplay: true, // 显示当前时间
//         //     durationDisplay: true,    // 显示总时长
//         //     progressControl: {
//         //         seekBar: true
//         //     },    // 隐藏进度条
//         //     volumePanel: {
//         //         inline: false,
//         //     },
//         //     // children: {
//         //     //     currentTimeDisplay: true, // 显示当前时间
//         //     //     durationDisplay: true,    // 显示总时长
//         //     // }
//         // },
//     });
//     // 完全禁用进度条拖动
//     // 禁用拖动功能
//     player.on('loadedmetadata', () => {
//         const progressControl = player.controlBar.progressControl;
//         if (progressControl && progressControl.seekBar) {
//             console.log('11', progressControl);

//             progressControl.seekBar.disable();
//         }
//     });
//     // 初始化后调用一次以设置初始尺寸
//     // resizePlayer();


//       // 初始应用只读进度条
//         applyReadOnlyProgressBar();
        
//         // 监听全屏变化
//         player.on('fullscreenchange', function() {
//             // 确保全屏模式下同样应用只读进度条
//             applyReadOnlyProgressBar();
//         });
        
//         // 禁止键盘方向键快进
//         player.on('keydown', function(event) {
//             // 37: 左箭头, 39: 右箭头
//             if (event.keyCode === 37 || event.keyCode === 39) {
//                 event.preventDefault();
//                 event.stopPropagation();
//             }
//         });
        
//         // 切换只读模式按钮
//         // document.getElementById('myVedio').addEventListener('click', function() {
//         //     if (this.textContent === '禁用进度条拖动') {
//         //         applyReadOnlyProgressBar();
//         //         this.textContent = '启用进度条拖动';
//         //     } else {
//         //         removeReadOnlyProgressBar();
//         //         this.textContent = '禁用进度条拖动';
//         //     }
//         // });
        
//         // 全屏切换按钮
//         // document.getElementById('toggle-fullscreen').addEventListener('click', function() {
//         //     if (player.isFullscreen()) {
//         //         player.exitFullscreen();
//         //     } else {
//         //         player.requestFullscreen();
//         //     }
//         // });

// })


</script>

<style scoped lang="less">
.video_player_container {
    position: relative;
    width: 100%;
    background-color: blue;

    .video-js {
        width: 100%;
        // height: 300px;
    }

    .cover_view {
        background-color: red;
        width: calc(100% - 100px);
        height: 40px;
        position: absolute;
        bottom: 0;
    }

* {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
      min-height: 100vh;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .container {
      max-width: 900px;
      width: 100%;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      overflow: hidden;
      padding: 25px;
    }
    
    header {
      text-align: center;
      margin-bottom: 25px;
      padding-bottom: 20px;
      border-bottom: 2px solid #eee;
    }
    
    h1 {
      color: #1a2a6c;
      font-size: 2.2rem;
      margin-bottom: 10px;
    }
    
    .subtitle {
      color: #555;
      font-size: 1.1rem;
      max-width: 700px;
      margin: 0 auto;
    }
    
    .component-container {
      position: relative;
      margin-bottom: 30px;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    }
    
    .video-wrapper {
      position: relative;
      padding-top: 56.25%; /* 16:9 Aspect Ratio */
    }
    
    .video-js {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    
    /* 确保时间显示可见 */
    .video-js .vjs-current-time,
    .video-js .vjs-duration {
      display: block !important;
      font-size: 0.9em;
    }
    
    .video-js .vjs-time-control {
      padding: 0 5px !important;
      min-width: 2em !important;
    }
    
    /* 禁用进度条拖动 - 通用样式 */
    .vjs-progress-control {
      pointer-events: none !important;
    }
    
    .vjs-progress-holder {
      cursor: default !important;
    }
    
    /* 隐藏滑块 */
    .vjs-play-progress:before {
      display: none !important;
    }
    
    .vjs-mouse-display {
      display: none !important;
    }
    
    /* 移动端特定样式 */
    @media (max-width: 768px) {
      .vjs-control-bar {
        font-size: 12px !important;
      }
      
      .vjs-button > .vjs-icon-placeholder:before {
        font-size: 1.2em;
        line-height: 2.2;
      }
      
      .vjs-volume-panel {
        display: none !important;
      }
      
      .container {
        padding: 15px;
        border-radius: 10px;
      }
      
      h1 {
        font-size: 1.8rem;
      }
    }
    
    .controls {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin: 20px 0;
    }
    
    .btn {
      padding: 12px 20px;
      background: #1a2a6c;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    
    .btn:hover {
      background: #0e1a4a;
      transform: translateY(-2px);
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    }
    
    .btn:active {
      transform: translateY(1px);
    }
    
    .btn-alt {
      background: #fdbb2d;
      color: #333;
    }
    
    .btn-alt:hover {
      background: #e6a61c;
    }
    
    .time-display {
      display: flex;
      justify-content: space-between;
      background: #f8f9fa;
      border-radius: 8px;
      padding: 15px;
      margin: 15px 0;
      font-size: 1.1rem;
      font-weight: bold;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .time-item {
      text-align: center;
      flex: 1;
    }
    
    .time-label {
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 5px;
    }
    
    .status {
      text-align: center;
      padding: 15px;
      margin: 20px 0;
      background: #e8f4ff;
      border-radius: 8px;
      font-weight: bold;
      color: #1a2a6c;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .mobile-tips {
      background: #fff8e6;
      border-radius: 8px;
      padding: 15px;
      margin: 20px 0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .mobile-tips h3 {
      color: #1a2a6c;
      margin-bottom: 10px;
      text-align: center;
    }
    
    .mobile-tips ul {
      padding-left: 20px;
    }
    
    .mobile-tips li {
      margin-bottom: 8px;
      color: #555;
    }
    
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #eee;
      color: #666;
      font-size: 0.9rem;
    }
}
</style>
