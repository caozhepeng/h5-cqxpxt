<!--下拉刷新上拉加载的列表组件-->
<template>
    <van-pull-refresh v-model="optionConfig.refreshing" @refresh="onRefresh" class="lyout_ListView">
        <van-list
            v-if="listData && listData.length"
            ref="defalutvanListRef"
            v-model:loading="optionConfig.loading"
            :finished="optionConfig.finished"
            v-model:error="optionConfig.error"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="immediateCheck"
            >
            <div class="defalut_lyout_ListView_item_kuang">
                <div class="defalut_lyout_ListView_item" :ref="setItemRefFun" :key="'defalut_lyout_ListView_item_key'+index" v-for="(item,index) in listData">
                    <slot name="item" v-bind="{item:item,index:index}"></slot>
                </div>
                <slot name="other"></slot>
            </div>
        </van-list>
        <Empty v-else-if="optionConfig.finished" :showLoadBtn="false" title="暂无数据" />
    </van-pull-refresh>
</template>

<script>
    // import main from "./ListView.main"
    import useMain from "./ListView.main"
    import useCheckdIsLoadOffset from "./ListView.checkdIsLoadOffset"
    import {onBeforeUpdate,onUpdated,onMounted,toRef, ref, reactive,getCurrentInstance, toRefs,defineExpose, isRef, watch, isReactive} from 'vue'
    import Empty from '../../components/Empty/EmptyDataView.vue'

    export default {
        props:{
            listData:{
                type:Array,
                default:()=>{
                    return [];
                }
            },
            isAutoOffset:{//isAutoOffset为true时，配置得optionConfig.offset无效
                type:Boolean,
                default:true
            },
            immediateCheck:{
                type:Boolean,
                default:false
            },
            optionConfig:{
                type:Object,
                default:()=>{
                    return {
                        refreshing:false,//是否正在刷新
                        loading:false,//是否正在加载
                        finished:false,//是否完成加载（就是还能不能加载数据）
                        offset:200,//滚动条与底部距离小于 offset 时触发load事件
                        error:false,
                    };
                }
            },
            pagination:{
                type:Object,
                default:()=>{
                    return {
                        currentPage: 1,
                        pageSize: 10,
                        total: 0,
                    };
                }
            },
            boxId:{//list框id
                type:String,
                default:"",
            },
        },
        components:{Empty},
        emits: ['refresh','load'],
        expose: ['checkdIsLoadOffsetFun'],//暴露给$ref调用
        setup(props,context){
            // getCurrentInstance()。 当前实例，能获取全部东西。只能在 setup 或生命周期钩子中调用。
            const gp=getCurrentInstance().appContext.config.globalProperties;//全局工具
            const {listData,isAutoOffset,optionConfig,pagination,boxId}=toRefs(props);//属性传值
            const {defalutvanListRef,itemRefs,setItemRefFun,onRefresh,onLoad}=useMain(props,context,getCurrentInstance);
            const {checkdIsLoadFun,autoOffsetFun}=useCheckdIsLoadOffset(itemRefs,optionConfig);

            // console.log("optionConfig:",isReactive(optionConfig),isRef(optionConfig));
            // watch(optionConfig,(val)=>{
            //     console.log("optionConfig:",val);
            // });

            // =====================方法====================
            /**检查是否加载 he 自适应offset */
            const checkdIsLoadOffsetFun=()=>{
                let listViewKuangEl=gp.$utils.isNoNullAll(boxId.value)?document.getElementById(boxId.value):null;
                checkdIsLoadFun(defalutvanListRef,listViewKuangEl,optionConfig.value,onLoad);
                autoOffsetFun(itemRefs,optionConfig.value);
            };

            // defineExpose({//暴露给$refs使用，vue3.2版本
            //     checkdIsLoadOffsetFun,
            // });
            return {//暴露给其他模板使用
                defalutvanListRef,
                onRefresh:onRefresh,
                onLoad:onLoad,
                checkdIsLoadOffsetFun:checkdIsLoadOffsetFun,
                setItemRefFun:setItemRefFun,
            }
        },
    }
</script>

<style lang="scss" scoped src="./ListView.scss">
</style>
