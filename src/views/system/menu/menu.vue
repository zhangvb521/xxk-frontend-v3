<template>
  <div>
    <n-card :bordered="false">
      <n-button type="primary" @click="openCreateDrawer()">新增菜单</n-button>
    </n-card>
    <n-card :bordered="false">
      <n-data-table :data="treeData" :row-key="(row: any) => row.id" :columns="columns" />
    </n-card>
    <CreateDrawer ref="createDrawerRef" :title="drawerTitle" />
  </div>
</template>
<script lang="tsx" setup>
import type { ListDate } from "@/api/system/menu";
import { getMenuList } from "@/api/system/menu";
import { getTreeItem } from "@/utils";
import { DataTableColumns, NButton, useDialog, useMessage } from "naive-ui";
import { computed, onMounted, reactive, ref, unref, useTemplateRef } from "vue";
import CreateDrawer from "./CreateDrawer.vue";

const columns: DataTableColumns<ListDate> = [
  {
    type: "selection",
  },
  {
    title: "菜单名称",
    key: "menuName",
  },
  {
    title: "菜单权限",
    key: "permission",
  },
  {
    title: "菜单类型",
    key: "menuType",
    render: (row: ListDate) => {
      return row.menuType === 1 ? "目录" : row.menuType === 2 ? "菜单" : "按钮";
    },
  },
  {
    title: "操作",
    key: "action",
    render: (row: ListDate) => {
      return (
        <>
          <NButton quaternary size="small" type="primary" onClick={() => selectAddMenu(row.id)}>
            新增
          </NButton>
          <NButton quaternary size="small" type="success" onClick={() => selectAddMenu(row.id)}>
            编辑
          </NButton>

          <NButton quaternary size="small" type="error" onClick={() => handleDel(row)}>
            删除
          </NButton>
        </>
      );
    },
  },
];
const formRef: any = ref(null);
const createDrawerRef = useTemplateRef("createDrawerRef");
const message = useMessage();
const dialog = useDialog();

let treeItemKey = ref([]);

let expandedKeys = ref([]);

const treeData = ref<ListDate[]>([]);

const loading = ref(true);
const isEditMenu = ref(false);
const treeItemTitle = ref("");
const drawerTitle = ref("");

const isAddSon = computed(() => {
  return !treeItemKey.value.length;
});

const addMenuOptions = ref([
  {
    label: "添加顶级菜单",
    key: "home",
    disabled: false,
  },
  {
    label: "添加子菜单",
    key: "son",
    disabled: isAddSon,
  },
]);

const formParams = reactive({
  type: 1,
  label: "",
  subtitle: "",
  path: "",
  auth: "",
  openType: 1,
});

function selectAddMenu(key: string) {
  drawerTitle.value = key === "home" ? "添加顶栏菜单" : `添加子菜单：${treeItemTitle.value}`;
  openCreateDrawer();
}

function openCreateDrawer() {
  createDrawerRef.value?.openDrawer();
}

function selectedTree(keys) {
  if (keys.length) {
    const treeItem = getTreeItem(unref(treeData), keys[0]);
    treeItemKey.value = keys;
    treeItemTitle.value = treeItem.label;
    Object.assign(formParams, treeItem);
    isEditMenu.value = true;
  } else {
    isEditMenu.value = false;
    treeItemKey.value = [];
    treeItemTitle.value = "";
  }
}

function handleDel(row: ListDate) {
  if (row.children.length > 0) {
    message.error("请先删除子菜单");
    return;
  }
  dialog.info({
    title: "提示",
    content: `您确定想删除此菜单吗?`,
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: () => {
      message.success("删除成功");
    },
    onNegativeClick: () => {
      message.error("已取消");
    },
  });
}

function handleReset() {
  const treeItem = getTreeItem(unref(treeData), treeItemKey.value[0]);
  Object.assign(formParams, treeItem);
}

function formSubmit() {
  formRef.value.validate((errors: boolean) => {
    if (!errors) {
      message.error("抱歉，您没有该权限");
    } else {
      message.error("请填写完整信息");
    }
  });
}

function packHandle() {
  if (expandedKeys.value.length) {
    expandedKeys.value = [];
  } else {
    expandedKeys.value = unref(treeData).map((item: any) => item.key as string) as [];
  }
}

onMounted(async () => {
  const treeMenuList = await getMenuList();
  const keys = treeMenuList.map((item) => item.id);
  Object.assign(formParams, keys);
  treeData.value = treeMenuList;
  loading.value = false;
});

function onExpandedKeys(keys) {
  expandedKeys.value = keys;
}
</script>
