<template>
    <div>
        <video id="myVideo" class="video-js" controlsList="noplaybackrate nodownload"  v-bind="$attrs" ref="refVideo" width="100%" 
            :controls="true" ></video>
    </div>
</template>

<script setup lang="ts">
const refVideo = ref<HTMLVideoElement | null>(null);
let value = 0;
setInterval(() => {
    let time = refVideo.value.currentTime;
    if (time - value > 1) {
        refVideo.value.currentTime = value;
    }
    value = refVideo.value.currentTime;
}, 500);
</script>

<style scoped>
.video-js {
    width: 100%;
    height: auto;
    
}

video::-webkit-media-controls-fullscreen-button {
        display: none;
    }
    /* //播放按钮 */
    video::-webkit-media-controls-play-button {
        display: none;
    }
    /* //进度条 */
    video::-webkit-media-controls-timeline {
        display: none;
    }
    /* //观看的当前时间 */
    video::-webkit-media-controls-current-time-display{
        display: none;            
    }
    /* //剩余时间 */
    video::-webkit-media-controls-time-remaining-display {
        display: none;            
    }
    /* //音量按钮 */
    video::-webkit-media-controls-mute-button {
        display: none;            
    }
    video::-webkit-media-controls-toggle-closed-captions-button {
        display: none;            
    }
    /* //音量的控制条 */
    video::-webkit-media-controls-volume-slider {
        display: none;            
    }
    /* //所有控件 */
    video::-webkit-media-controls-enclosure{ 
        display: none;
    }
</style>