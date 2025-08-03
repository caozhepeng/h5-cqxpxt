<template>
    <div id="empty">
        <van-empty :description="props.title" :image="props.image" class="cus-empty-container">
            <van-button v-if="props.showLoadBtn" @click="reloadClick" round type="default" class="bottom-button">{{ props.btnTitle }}</van-button>
        </van-empty>
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps({
        title: {
            type: String,
            default: '暂无数据,尝试重新加载'
        },
        // 图片类型，可选值为 error network search，支持传入图片 URL
        image: {
            type: String,
            default: 'default'
        },
        showLoadBtn: {
            type: Boolean,
            default: true,
        },
        btnTitle: {
            type: String,
            default: '重新加载'
        },
    });
    const emit = defineEmits(['_reloadClick'])
    const reloadClick = () => {
        emit('_reloadClick')
    }
</script>

<style scoped lang="less">
    #empty {
        height: 100%;
        width: 100%;
        flex-grow: 1;
    }
    .cus-empty-container {
        padding-top: 100px;
        padding-bottom: 50px;
    }

    .bottom-button {
        width: 100px;
        height: 40px;
    }
</style>