<template>
    <div class="video_player_container">
        <video id="myVideo" class="video-js vjs-big-play-centered" v-bind="$attrs" ref="refVideo" width="100%"
            :controls="props.controls" :loop="false" @play="handlePlay" @pause="handlePause" @ended="handleEnded"
            @loadedmetadataloadedmetadata="handleLoadedmetadata" @seeking="onSeeking" @seeked="onSeeked"
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
};

const onSeeked = (v) => {
}

const videoPause = () => {
    console.log('refVideo.value:', refVideo.value, isPlaying.value);

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
    // console.log('onTimeupdate-currentTime:', refVideo.value.currentTime);
    // timeNow = refVideo.value.currentTime;
    //   emit('update:currentTime', timeNow);

}

const setClick = () => {
    refVideo.value.currentTime = 10;
}


// 监听currentTime变化（从父组件）
// watch(() => timeNow, (newVal) => {
//   if (refVideo.value && Math.abs(refVideo.value.currentTime - newVal) > 0.5) {
//     refVideo.value.currentTime = newVal;
//   }
// });
let lastValidTime = 0;

onMounted(() => {
    // 初始化播放器
    player = videojs(refVideo.value, {
        controls: true,
        autoplay: false,
        aspectRatio: '16:9',
        preload: 'auto',
        // controlBar: {
        //   children: [
        //     'playToggle',
        //     'currentTimeDisplay',
        //     'progressControl',
        //     'durationDisplay',
        //     'fullscreenToggle'
        //   ],
        //   volumePanel: false
        // },
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


    refVideo.value.addEventListener('timeupdate', () => {
        console.log('add:', refVideo.value.currentTime);

        // 检测到用户快进（时间跳跃超过阈值）
        if (Math.abs(refVideo.value.currentTime - lastValidTime) > 2) {
            refVideo.value.currentTime = lastValidTime; // 强制跳回
        } else {
            lastValidTime = refVideo.value.currentTime;
        }
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
