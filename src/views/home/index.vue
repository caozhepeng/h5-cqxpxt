<!-- 主页 -->
<template>
    <div class="home_container h-full">
        <button @click="clickToLearn">学习</button>
    </div>
</template>

<script setup lang="ts">
import { PageEnum } from "@/enums/pageEnum";

const router = useRouter();

const clickToLearn = () => {
    router.push({
        path: PageEnum.PAGE_LEARN,
    });
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
