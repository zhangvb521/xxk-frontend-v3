<template>
  <div>
    <n-card :bordered="false" class="mt-4 proCard">
      <BasicTable
        :columns="columns"
        pagination
        :request="loadDataTable"
        :row-key="(row) => row.id"
        ref="actionRef"
        :actionColumn="actionColumn"
      >
        <template #tableTitle>
          <n-button type="primary" @click="addRole">
            <template #icon>
              <n-icon>
                <PlusOutlined />
              </n-icon>
            </template>
            新增角色
          </n-button>
        </template>

        <template #action>
          <TableAction />
        </template>
      </BasicTable>
    </n-card>

    <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" :title="editRoleTitle">
      <div class="py-3 menu-list">
        <n-tree
          block-line
          cascade
          checkable
          :virtual-scroll="true"
          :data="treeData"
          :expandedKeys="expandedKeys"
          :checked-keys="checkedKeys"
          style="max-height: 950px; overflow: hidden"
          @update:checked-keys="checkedTree"
          @update:expanded-keys="onExpandedKeys"
        />
      </div>
      <template #action>
        <n-space>
          <n-button type="info" ghost icon-placement="left" @click="packHandle">
            全部{{ expandedKeys.length ? '收起' : '展开' }}
          </n-button>

          <n-button type="info" ghost icon-placement="left" @click="checkedAllHandle">
            全部{{ checkedAll ? '取消' : '选择' }}
          </n-button>
          <n-button type="primary" :loading="formBtnLoading" @click="confirmForm">提交</n-button>
        </n-space>
      </template>
    </n-modal>
    <CreateModal ref="createModalRef" />
    <EditModal ref="editModalRef" />
  </div>
</template>

<script lang="tsx" setup>
  import type { ListDate } from '@/api/system/menu';
  import { getRoleList } from '@/api/system/role';
  import { Role, RoleFilterDto } from '@/api/system/types';
  import { BasicTable, TableAction } from '@/components/Table';
  import { getTreeAll } from '@/utils';
  import { PlusOutlined } from '@vicons/antd';
  import { useMessage } from 'naive-ui';
  import { onMounted, onUnmounted, reactive, ref, unref } from 'vue';
  import CreateModal from './CreateModal.vue';
  import EditModal from './EditModal.vue';
  import { columns } from './columns';

  const message = useMessage();
  const actionRef = ref();
  const createModalRef = ref();
  const editModalRef = ref();
  const showModal = ref(false);
  const formBtnLoading = ref(false);
  const checkedAll = ref(false);
  const editRoleTitle = ref('');
  const treeData = ref<ListDate[]>([]);
  const expandedKeys = ref<string[]>([]);
  const checkedKeys = ref<string[]>(['console', 'step-form']);
  const params = reactive<RoleFilterDto>({
    roleName: '',
    pageNum: 1,
    pageSize: 20,
  });

  const actionColumn = reactive({
    width: 250,
    title: '操作',
    key: 'action',
    fixed: 'right',
    render(record: Role) {
      const actions = [
        {
          label: '菜单权限',
          size: 'small',
          type: 'primary',
          quaternary: true,
          onClick: handleMenuAuth.bind(null, record),
        },
        {
          label: '编辑',
          size: 'small',
          type: 'success',
          quaternary: true,
          onClick: handleEdit.bind(null, record),
          // auth: ['basic_list'],
        },
        {
          label: '删除',
          size: 'small',
          type: 'error',
          quaternary: true,
          onClick: handleDelete.bind(null, record),
        },
      ];

      return <TableAction actions={actions}></TableAction>;
    },
  });

  const loadDataTable = async (res: any) => {
    let _params = {
      ...unref(params),
      ...res,
    };
    return await getRoleList(_params);
  };

  function addRole() {
    createModalRef.value.openModal();
  }

  function reloadTable() {
    actionRef.value.reload();
  }

  function confirmForm(e: any) {
    e.preventDefault();
    formBtnLoading.value = true;
    setTimeout(() => {
      showModal.value = false;
      message.success('提交成功');
      reloadTable();
      formBtnLoading.value = false;
    }, 200);
  }

  function handleEdit(record: Recordable) {
    console.log('点击了编辑', record);
    editModalRef.value.showModal(record);
  }

  function handleDelete(record: Recordable) {
    console.log('点击了删除', record);
    message.info('点击了删除');
  }

  function handleMenuAuth(record: Recordable) {
    editRoleTitle.value = `分配 ${record.name} 的菜单权限`;
    checkedKeys.value = record.menu_keys;
    showModal.value = true;
  }

  function checkedTree(keys) {
    checkedKeys.value = [checkedKeys.value, ...keys];
  }

  function onExpandedKeys(keys) {
    expandedKeys.value = keys;
  }

  function packHandle() {
    if (expandedKeys.value.length) {
      expandedKeys.value = [];
    } else {
      expandedKeys.value = treeData.value.map((item: any) => item.key) as [];
    }
  }

  function checkedAllHandle() {
    if (!checkedAll.value) {
      checkedKeys.value = getTreeAll(treeData.value);
      checkedAll.value = true;
    } else {
      checkedKeys.value = [];
      checkedAll.value = false;
    }
  }

  // onMounted(async () => {
  //   // const treeMenuList = await getMenuList();
  //   // treeData.value = treeMenuList?.ie;
  //   // loadDataTable(params);
  // });

  // onUnmounted(() => {
  //   actionRef.value = null;
  //   createModalRef.value = null;
  //   editModalRef.value = null;
  // });
</script>

<style lang="less" scoped></style>
