<template>
    <div class="video_learn_container wh-full">
        <NavBar />
        <div>
            <!-- <VideoPlayerCmp :src="urls[0]" controls /> -->
             <!-- <VideoPlayer :src="urls[0]" /> -->
              <!-- <VideoPlayerSelf :src="urls[0]" /> -->
            <!-- <AliyunPlayer :source="urls[0]" /> -->
            <VideoPlayer4 :src="currentUrl" @currentVideoPlayEnd="_currentVideoPlayEnd" />
        </div>
    </div>
</template>

<script setup lang="ts">
import AliyunPlayer from "@/components/AliyunPlayer.vue";
import NavBar from "@/components/NavBar/NavBar.vue";
import VideoPlayer from "@/components/VideoPlayer.vue";
import VideoPlayerCmp from "@/views/cmps/VideoPlayer.vue";
import VideoPlayer3 from "@/views/cmps/VideoPlayer3.vue";
import VideoPlayer4 from "@/views/cmps/VideoPlayer4.vue";
import VideoPlayerSelf from "@/views/cmps/VideoPlayerSelf.vue";

const urls = [
    "https://tv.cqxpxt.com/asset/c4136b15af3ade814ad7ffe8e56134d5/play_video/c636ec4be0dc0b5b9cd4c502aadde228.mp4",
    "https://tv.cqxpxt.com/asset/844100d2e5af8e7c5b46c49d4ba8fb8c/play_video/0c97aba47d98d4526d77b21e724bc881.mp4",
];
const currentUrl = ref(urls[1]);

const _currentVideoPlayEnd = () => {
    currentUrl.value = urls[0]
}
</script>

<style scoped lang="less">
.video_learn_container {
    background-color: var(--van-white);
}
</style>
