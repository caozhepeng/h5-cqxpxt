import { PageEnum } from "@/enums/pageEnum";
import type { RouteRecordRaw } from "vue-router";

const Layout = () => import('@/layout/index.vue')

const routeModuleList: Array<RouteRecordRaw> = [
  {
    path: PageEnum.BASE_HOME,
    name: PageEnum.BASE_HOME_NAME,
    meta: {
      title: "",
      innerPage: false,
      keepAlive: false,
    },
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: PageEnum.PAGE_LEARN,
    name: PageEnum.PAGE_LEARN_NAME,
    meta: {
      title: "视频学习",
      innerPage: false,
      keepAlive: false,
    },
    component: () => import("@/views/home/learn/index.vue"),
  },
  {
    path: PageEnum.PAGE_VIDEO_LEARN,
    name: PageEnum.PAGE_VIDEO_LEARN_NAME,
    meta: {
      title: "视频学习",
      innerPage: false,
      keepAlive: false,
    },
    component: () => import("@/views/home/learn/video-learn/index.vue"),
  },


  {
    path: '/example',
    name: 'Example',
    redirect: '/example/index',
    meta: {
      title: '示例',
      icon: 'i-material-symbols:award-star',
    },
    children: [
      {
        path: 'index',
        name: 'ExamplePage',
        meta: {
          keepAlive: false,
        },
        component: () => import('@/views/example/index.vue'),
      },
    ],
  },
];

export default routeModuleList;
