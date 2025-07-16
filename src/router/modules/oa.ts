import { renderIcon } from "@/utils";
import { Layout } from "../constant";
import { RouteRecordRaw } from "vue-router";
import { SettingOutlined } from "@vicons/antd";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/oa",
    name: "OAManagement",
    component: Layout,
    meta: {
      title: "办公管理",
      icon: renderIcon(SettingOutlined),
      sort: 5,
    },
    children: [
      {
        path: "training",
        name: "TrainingManagement",
        meta: {
          title: "培训管理",
        },
        component: () => import("@/views/oa/training/index.vue"),
      },
      {
        path: "system",
        name: "setting-system",
        meta: {
          title: "保修管理",
        },
        component: () => import("@/views/setting/system/system.vue"),
      },
    ],
  },
];

export default routes;
