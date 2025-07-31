<template>
    <div class="video_player_container">
        <video id="myVideo" class="video-js vjs-big-play-centered" v-bind="$attrs" ref="refVideo" width="100%" 
            :controls="props.controls" :loop="false"
            @play="handlePlay"
            @pause="handlePause"
            @ended="handleEnded"
            @loadedmetadataloadedmetadata="handleLoadedmetadata"
            @seeking="onSeeking"
            @seeked="onSeeked"
            @timeupdate="onTimeupdate"></video>
        <!-- <div class="cover_view"></div> -->
         <button @click="setClick">设置</button>
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

let player = null;
const refVideo = ref<HTMLVideoElement | null>(null);
// 播放状态
const isPlaying = ref(false);
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
    console.log("推动结束:", v, refVideo.value.currentTime);
        // videoPause();

    if (timebefore !== refVideo.value.currentTime) {
                console.log('拖动结束赋值');

        refVideo.value.currentTime = timebefore;
    } else {
        if (!isPlaying.value) { // 暂停状态还原到暂停的时间
            refVideo.value.currentTime = timePauseTime;
        }
    }
}

const videoPause = () => {
    console.log('refVideo.value:',refVideo.value, isPlaying.value);
    
    // if (!refVideo.value) {
    //     return
    // }
    // if (isPlaying.value) {
    //     refVideo.value?.pause();
    // }
    refVideo.value?.pause();

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
    console.log('onTimeupdate-currentTime:', refVideo.value.currentTime);
    timeNow = refVideo.value.currentTime;
      emit('update:currentTime', timeNow);

}

const setClick = () => {
    refVideo.value.currentTime = 10;
}


// 监听currentTime变化（从父组件）
watch(() => timeNow, (newVal) => {
  if (refVideo.value && Math.abs(refVideo.value.currentTime - newVal) > 0.5) {
    refVideo.value.currentTime = newVal;
  }
});

onMounted(() => {

      // 初始化播放器
      player = videojs(refVideo.value, {
        controls: true,
                    aspectRatio: '16:9',

        // sources: [{
        //   src: 'https://vjs.zencdn.net/v/oceans.mp4', // 替换为你的视频地址
        //   type: 'video/mp4'
        // }],
        // 自定义控制栏配置
        // controlBar: {
        //   // 隐藏"更多设置"按钮（三个点）
        //   children: {
        //     settingsButton: false,
        //     // 隐藏不需要的组件
        //     volumePanel: false, // 可选：隐藏音量控制
        //     currentTimeDisplay: false, // 可选：隐藏当前时间
        //     timeDivider: false, // 可选：隐藏时间分隔符
        //     durationDisplay: false, // 可选：隐藏总时长
        //     progressControl: { // 禁用进度条交互
        //       seekBar: false
        //     }
        //   }
        // }
      });

})

// 清理事件监听
onBeforeUnmount(() => {
});
</script>

<style scoped lang="less">
.video_player_container {
    position: relative;
    width: 100%;
    background-color: blue;

    .cover_view {
        background-color: red;
        width: calc(100% - 100px);
        height: 40px;
        position: absolute;
        bottom: 0;
    }
}
</style>
