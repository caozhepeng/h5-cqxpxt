<template>
    <div class="video_player_container">
        <video v-bind="$attrs" id="myVideo" :src="currentUrl"
            controlsList="noplaybackrate nodownload nofullscreen" 
            disablePictureInPicture playsinline webkit-playsinline x5-video-player-type="h5" x5-playsinline
            ref="refVideo" width="100%" 
            :controls="true" :autoplay="true" :loop="false"
            @timeupdate="onTimeupdate" @ended="onEnded" class="video-js"  >
            
        </video>
<!-- 
        <div style="margin: 20px; width: 100px; height: 40px; background-color: goldenrod;">
            <span style="color: blue; font-size: 15px;">{{ testvalue + '' }}</span>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { showToast } from 'vant';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const emit = defineEmits(['currentVideoPlayEnd']);
const refVideo = ref<HTMLVideoElement | null>(null);
const urls = [
    "https://tv.cqxpxt.com/asset/c4136b15af3ade814ad7ffe8e56134d5/play_video/c636ec4be0dc0b5b9cd4c502aadde228.mp4",
    "https://tv.cqxpxt.com/asset/844100d2e5af8e7c5b46c49d4ba8fb8c/play_video/0c97aba47d98d4526d77b21e724bc881.mp4",
];

const currentUrl = ref(urls[1]);
const currentVideoPlayEnd = () => {
    currentUrl.value = urls[0]
}
let player = null;
// let value = 0;
// setInterval(() => {
//     let time = refVideo.value.currentTime;
//     if (time - value > 1) {
//         refVideo.value.currentTime = value;
//     }
//     value = refVideo.value.currentTime;
// }, 500);
let count = 0;
let interval = null;
interval = setInterval(() => {
    if (refVideo.value) {
        if (refVideo.value.played) {
            ++count;
        }
    }
}, 500);

let lastValidTime = 0;

const testvalue = ref(0);

/** 当目前的播放位置已更改时 */
const onTimeupdate = () => {
    console.log('-----------');
    return
    if (count < 10) {
        showToast(count + '');
    } else {
        // if (refVideo.value.played) {
        //     refVideo.value.pause();
        //     toggleFullscreen();
        // }
        // count = 0;
    }
    testvalue.value += 1;
        // 设置倍速为1，使其设置倍速失效
        if (refVideo.value.playbackRate > 1) {
            refVideo.value.playbackRate = 1
        }
        // 检测到用户快进（时间跳跃超过阈值）
        if (Math.abs(refVideo.value.currentTime - lastValidTime) > 1) {
            refVideo.value.currentTime = lastValidTime; // 强制跳回
        } else {
            lastValidTime = refVideo.value.currentTime;
        }
}

// 切换全屏
const toggleFullscreen = () => {
    if (!player) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        // 这句在iOS中微信浏览器和自带浏览器中起了作用
        if (document.webkitFullscreenElement) {
            refVideo.value.webkitExitFullscreen();
        }
        // exitFullScreen();
    }
    if (!player) return;
    if (player.isFullscreen()) {
        player.exitFullscreen();
    } else {
        // player.requestFullscreen();
    }
};


const onTimeupdateWithVideoJs = () => {
    console.log('player.currentTime---:', player.currentTime());
    
    if (count < 2) {
        showToast('22222222222222');
    }
    testvalue.value += 1;
    // 设置倍速为1，使其设置倍速失效
    // if (refVideo.value.playbackRate > 1) {
    //     refVideo.value.playbackRate = 1
    // }
    // 检测到用户快进（时间跳跃超过阈值）
    if (Math.abs(player.currentTime() - lastValidTime) > 1) {
        player.currentTime(lastValidTime); // 强制跳回
        console.log('禁止快进');
    } else {
        lastValidTime = player.currentTime();
    }
}

const onEnded = () => {
    lastValidTime = 0
    console.log('0000000000jieshu');
    
    alert('1');
            // emit('currentVideoPlayEnd');
    currentVideoPlayEnd();
}

const initVedioPlayer = () => {
    player = videojs(refVideo.value, {
        controls: true,
        autoplay: false,
        aspectRatio: '16:9',
        preload: 'auto',
        // playbackRates: [1],
        controlBar: { // 设置控制条组件
            //  设置控制条里面组件的相关属性及显示与否
            'remainingTimeDisplay':false, // 剩余时间显示

            currentTimeDisplay: false, // 可选：隐藏当前时间
            timeDivider: false, // 可选：隐藏时间分隔符
            durationDisplay: false, // 可选：隐藏总时长
            progressControl: { // 禁用进度条交互
              seekBar: true
            },

            // 音量竖着空字，移动端可能无效
            volumePanel: {
                inline: false,
            },

            /* 使用children的形式可以控制每一个控件的位置，以及显示与否 */
            // children: [
            //     {name: 'playToggle'}, // 播放按钮
            //     // {name: 'currentTimeDisplay'}, // 当前已播放时间
            //     {name: 'progressControl'}, // 播放进度条

            //     { name: 'currentTimeDisplay' },
            //     { name: 'timeDivider' },
            //     { name: 'durationDisplay' },

    

            //     // {name: 'durationDisplay'}, // 总时间
            //     // { // 倍数播放
            //     //     name: 'playbackRateMenuButton',
            //     //     'playbackRates': [1]
            //     // },
            //     // {
            //     //     name: 'volumePanel', // 音量控制
            //     //     inline: false, // 不使用水平方式
            //     // },
            //     // {name: 'FullscreenToggle'} // 全屏
            // ]
        },
        // controlBar: {
        //     children: [
        //     'playToggle',
        //     'currentTimeDisplay',
        //     'progressControl',
        //     'durationDisplay',
        //     // 'fullscreenToggle'
        //     ],
        //     volumePanel: false
        // },
        // sources: [{
        //     src: 'https://vjs.zencdn.net/v/oceans.mp4',
        //     type: 'video/mp4'
        // }],
        nativeControlsForTouch: false,
        userActions: {
            doubleClick: false,
            hotkeys: false
        }
    });
    player.on('timeupdate', onTimeupdateWithVideoJs);


    // refVideo.value.addEventListener('timeupdate', () => {
    //     console.log('add:', refVideo.value.currentTime);
    //     showToast('122');

    // });
}
onMounted(() => {
    // initVedioPlayer();
    //  refVideo.value.addEventListener('timeupdate', () => {
    // });

})

onBeforeUnmount(() => {
    if (interval) {
        clearInterval(interval);
    }
})

</script>

<style scoped>
.video-js {
    width: 100%;
    height: auto;
}

.video_player_container {
    position: relative;
    width: 100%;
}
video::-webkit-media-controls-picture-in-picture-button {
  display: none !important;
}

video::-moz-media-controls-picture-in-picture-button {
  display: none !important;
}

</style>