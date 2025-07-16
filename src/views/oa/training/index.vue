<template>
  <div class="training-management">
    <!-- 搜索栏 -->
    <div class="search-bar">
      <n-form inline :model="searchForm" label-placement="left" class="demo-form-inline">
        <n-form-item label="培训主题" path="topic">
          <n-input v-model:value="searchForm.topic" placeholder="请输入培训主题"></n-input>
        </n-form-item>
        <n-form-item label="培训时间" path="trainingTime">
          <n-date-picker
            v-model:value="searchForm.trainingTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </n-date-picker>
        </n-form-item>
        <n-form-item>
          <n-button type="primary" @click="handleSearch">查询</n-button>
          <n-button @click="resetSearch">重置</n-button>
        </n-form-item>
      </n-form>
    </div>
    <n-card :bordered="false" class="mt-4">
      <BasicTable
        :columns="columns"
        :request="getList"
        :row-key="(row) => row.id"
        ref="actionRef"
        :actionColumn="actionColumn"
      >
        <template #tableTitle>
          <n-button type="primary" @click="handleAdd">新增培训</n-button>
          <n-button type="error" @click="handleDelete" class="ml-5">批量删除</n-button>
        </template>
      </BasicTable>
    </n-card>
    <CreateModal ref="createModalRef" />
    <EditModal ref="editModalRef" />
  </div>
</template>

<script lang="tsx" setup>
import { deleteTraining, getTrainingList } from "@/api/oa/training";
import { ActionItem, BasicTable, TableAction } from "@/components/Table";
import { useDialog, useMessage } from "naive-ui";
import { onMounted, reactive, ref } from "vue";
import CreateModal from "./CreateModal.vue";
import EditModal from "./EditModal.vue";
const columns = [
  {
    title: "培训主题",
    key: "topic",
  },
  {
    title: "培训内容",
    key: "content",
  },
  {
    title: "培训时间",
    key: "trainingTime",
  },
  {
    title: "培训地点",
    key: "location",
  },
  {
    title: "参与人员",
    key: "participants",
  },
];

const actionColumn = reactive({
  width: 250,
  title: "操作",
  key: "action",
  fixed: "right",
  render(record: any) {
    const actions: ActionItem[] = [
      {
        label: "查看",
        size: "small",
        type: "primary",
        quaternary: true,
        onClick: handleView.bind(null, record),
      },
      {
        label: "编辑",
        size: "small",
        type: "success",
        quaternary: true,
        onClick: handleEdit.bind(null, record),
        // auth: ['basic_list'],
      },
      {
        label: "删除",
        size: "small",
        type: "error",
        quaternary: true,
        onClick: handleDelete.bind(null, record),
      },
    ];

    return <TableAction actions={actions}></TableAction>;
  },
});
const message = useMessage();
const dialog = useDialog();
interface TDto {
  topic?: string;
  trainingTime: [number, number];
}

const searchForm = reactive<TDto>({
  topic: "",
  trainingTime: [Date.now(), Date.now()],
});

// const trainingTime = ref<[number, number]>([Date.now(), Date.now()]);

// 查看详情弹窗
const viewDialogVisible = ref(false);
const currentItem = ref({});

// 获取列表数据
const getList = async () => {
  const params = {
    ...searchForm,
  };

  return await getTrainingList(params);
};

// 搜索
const handleSearch = () => {
  getList();
};

// 重置搜索
const resetSearch = () => {
  searchForm.topic = "";
  searchForm.trainingTime = [Date.now(), Date.now()];
  handleSearch();
};

// 查看详情
const handleView = (row) => {
  currentItem.value = { ...row };
  viewDialogVisible.value = true;
};

// 新增
const handleAdd = () => {
  createModalRef.value?.openModal();
};

// 编辑
const handleEdit = (row: any) => {
  editModalRef.value?.showModal(row);
};

// 删除
const handleDelete = (row) => {
  dialog.warning({
    title: "确认删除该培训记录吗？",
    // content: "确认删除该培训记录吗2222？",
    positiveText: "确定",
    negativeText: "取消",
    onNegativeClick() {},
    onPositiveClick() {
      deleteTraining(row.id)
        .then(() => {
          message.success("删除成功");
          getList();
        })
        .catch((error) => {
          console.error("删除失败：", error);
          message.error("删除失败");
        });
    },
  });
};
const createModalRef = ref();
const editModalRef = ref();

// 生命周期钩子
onMounted(() => {
  getList();
});
defineOptions({ name: "TrainingManagement" });
</script>

<style lang="less" scoped>
.training-management {
  padding: 20px;

  .search-bar {
    margin-bottom: 20px;
    background: #fff;
    padding: 20px;
    border-radius: 4px;
  }

  .operation-bar {
    margin-bottom: 20px;
  }

  .pagination-container {
    margin-top: 20px;
    text-align: right;
  }

  .detail-content {
    .detail-item {
      margin-bottom: 15px;

      .label {
        display: inline-block;
        width: 100px;
        color: #606266;
      }

      .value {
        color: #333;
      }
    }

    .attachment-list {
      margin-top: 10px;

      .attachment-item {
        display: inline-flex;
        align-items: center;
        margin-right: 20px;
        margin-bottom: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
