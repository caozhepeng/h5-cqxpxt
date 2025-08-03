<template>
  <van-nav-bar
    v-bind="$attrs"
    :title="computedTitle"
    :left-text="leftText"
    :right-text="rightText"
    :left-arrow="showLeftArrow"
    @click-left="handleLeftClick"
    :safe-area-inset-top="false"
    fixed
    placeholder
  >
    <template #left>
      <i v-if="showLeftArrow" class="i-ic:sharp-arrow-back-ios" text-xl />
      <slot v-if="$slots.left" name="left"></slot>
    </template>
    <template #title v-if="$slots.title">
      <slot name="title"></slot>
    </template>
    <template #right v-if="$slots.right">
      <slot name="right"></slot>
    </template>
  </van-nav-bar>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const computedTitle = computed(() => 
  props.title || String(route.meta?.title || '')
)

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  leftText: {
    type: String,
    default: ''
  },
  rightText: {
    type: String,
    default: ''
  },
  showLeftArrow: {
    type: Boolean,
    default: true
  },
  isCustomBack:{ // 是否自定义返回，和back事件配合使用
      type: Boolean,
      default: false,
  },
  backUrl: {
    type: String,
    default: ''
  },
})

const emit = defineEmits(['leftClick'])

const handleLeftClick = () => {
  if (props.backUrl) {
    router.push(props.backUrl)
  } else {
    if (props.isCustomBack) {
      emit('leftClick')
    } else {
      router.back()
    }
  }
}

</script>

<style lang="less" scoped>
</style>
