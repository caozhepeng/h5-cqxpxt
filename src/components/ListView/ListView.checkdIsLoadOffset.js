//用于检查是否加载 he 自适应offset
// ============================方法===========================
function autoOffset(itemRefs,optionConfig){//自适应offset
    // console.log("autoOffset:",itemRefs,optionConfig);
    let listItemEl=undefined;
    if(Array.isArray(itemRefs)){
        listItemEl=itemRefs[0];
    }
    if(listItemEl){
        // nextTick(() => {
            // console.log("自适应offset");
            let listItemHeight=listItemEl.offsetHeight;
            // console.log("item的高度:",listItemHeight);
            if(!isNaN(Number(listItemHeight))&&Number(listItemHeight)>0){
                optionConfig.offset= listItemHeight/2;
            }
        // });
    }
};

function checkdIsLoad(defalutvanListRef,listViewKuangEl,optionConfig,onLoad){//检查是否加载
    // console.log("defalutvanListRef:",listViewKuangEl.offsetHeight,defalutvanListRef,defalutvanListRef.value.$el.offsetHeight);
    if(!optionConfig.finished&&defalutvanListRef&&defalutvanListRef.value!=null&&listViewKuangEl){
        // nextTick(() => {
            // console.log("手动检查是否加载");
            //框的高度
            let vanListKuangHeight=listViewKuangEl.offsetHeight;
            //列表的高度
            let vanListHeight=defalutvanListRef.value.$el.offsetHeight;
            // console.log("vanListKuangHeight:",vanListKuangHeight);
            // console.log("vanListHeight:",vanListHeight);
            if(onLoad&&!isNaN(Number(vanListKuangHeight))&&!isNaN(Number(vanListHeight))&&Number(vanListHeight)<=Number(vanListKuangHeight)){
                onLoad();
            }
        // });
    }
};

import {nextTick,onMounted,reactive,ref} from 'vue'

/**检查是否加载 he 自适应offset */
export default function useCheckdIsLoadOffset(itemRefs,optionConfig){
    // nextTick(() => {
    //     checkdIsLoad(defalutvanListRef,listViewKuangEl,optionConfig,onLoad);
    //     autoOffset(itemRefs,optionConfig);
    // });

    /**自适应offset*/
    let autoOffsetFun=(itemRefs,optionConfig)=>{
        nextTick(() => {
            autoOffset(itemRefs,optionConfig);
        });
    };

    return {
        /**检查是否加载*/
        checkdIsLoadFun:(defalutvanListRef,listViewKuangEl,optionConfig,onLoad)=>{
            nextTick(() => {
                checkdIsLoad(defalutvanListRef,listViewKuangEl,optionConfig,onLoad);
            });
        },

        /**自适应offset*/
        autoOffsetFun,
    }
}