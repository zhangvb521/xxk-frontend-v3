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
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { BasicTable } from "@/components/Table";

const columns = ref([]);
const loadDataTable = async () => {};
const actionColumn = ref({});
const addRole = () => {};
</script>
<style lang="scss" scoped></style>
