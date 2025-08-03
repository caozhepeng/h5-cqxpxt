<!-- 网络学习主页 -->
<template>
    <div class="wh-full">
        <NavBar />
        <van-button @click="reloadClick" round type="default"></van-button>
        
        <!-- <input type="file" accept="image/*" @change="handleFileChange"> -->
    </div>
</template>
<script setup lang="ts">
import NavBar from "@/components/NavBar/NavBar.vue";
import { PageEnum } from "@/enums/pageEnum";
const router = useRouter();

function handleFileChange(event) {
    const file = event.target.files[0];
    console.log("file:", file);

    if (file) {
        // 读取文件内容
        const reader = new FileReader();
        reader.onload = (e) => {
            console.log("e:", e);

            // const imageUrl = e.target.result;
            // 在这里处理图片，例如显示在页面上
            // this.imageUrl = imageUrl;
        };
        reader.readAsDataURL(file);
    }
}

const reloadClick = () => { 
    router.push({
        path: PageEnum.PAGE_VIDEO_LEARN,
    });
};
</script>

<style scoped></style>
