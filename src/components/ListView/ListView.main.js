//主js：用于初始数据公用方法的编写
import {nextTick,reactive,ref} from 'vue'

// let props;//属性传值
// let context;//上下文
// let gp;//getCurrentInstance().appContext.config.globalProperties;//全局工具
// let defalutvanListRef;//列表组件
// let itemRefs=[];//列表item集合
// //
// export default{
//     //入口:必须最先调用
//     useMain:(p,c,getCurrentInstance)=>{
//         props=p; 
//         context=c; 
//         gp=getCurrentInstance().appContext.config.globalProperties;
//         itemRefs=[];//列表item集合
//         console.log("itemRefs:",itemRefs.length,itemRefs);
//     },

//     property:{//属性用于外部引用
//         defalutvanListRef,//列表组件
//         itemRefs,//列表item集合
//     },
//     fun:{//方法暴露属性
//         //===================事件==============
//         onRefresh:()=>{
//             console.log("onRefresh");
//             context.emit("refresh");
//         },
//         onLoad:()=>{
//             console.log("onLoad");
//             context.emit("load")
//         },

//         //===================其他方法==============
//         /**设置item组件ref */
//         setItemRefFun:el => {
//             if (el) {
//                 itemRefs.push(el);
//             }
//             console.log("itemRefs22:",itemRefs.length,itemRefs);
//         },
//     },
// }

export default function useMain(p,c,getCurrentInstance){
    let props=p;//属性传值
    let context=c;//上下文
    let gp=getCurrentInstance().appContext.config.globalProperties;//getCurrentInstance().appContext.config.globalProperties;//全局工具
    let defalutvanListRef=ref("null");//列表组件
    let itemRefs=[];//列表item集合

    return {
        //==================属性===============
        defalutvanListRef,//列表组件
        itemRefs,//列表item集合
        //==================属性===============


        //==================方法===============
        onRefresh:()=>{
            console.log("onRefresh");
            context.emit("refresh");
        },
        onLoad:()=>{
            console.log("onLoad");
            context.emit("load")
        },

        /**设置item组件ref */
        setItemRefFun:el => {
            if (el) {
                itemRefs.push(el);
            }
            // console.log("itemRefs22:",itemRefs.length,itemRefs);
        },
        //==================方法===============
    }
}