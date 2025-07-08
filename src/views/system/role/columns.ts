import { h } from 'vue';
import { NTag } from 'naive-ui';

export const columns = [
  {
    title: '角色名称',
    key: 'roleName',
  },
  {
    title: '说明',
    key: 'remarks',
  },
  {
    title: '是否默认角色',
    key: 'isDefault',
    render(row) {
      return h(
        NTag,
        {
          type: row.isDefault ? 'success' : 'error',
        },
        {
          default: () => (row.isDefault ? '是' : '否'),
        }
      );
    },
  },
  {
    title: '创建时间',
    key: 'createTime',
  },
];
