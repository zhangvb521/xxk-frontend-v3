import { Alova } from '@/utils/http/alova/index';
import { PageResult, Role, RoleFilterDto } from './types';

/**
 * @description: 角色列表
 */
export function getRoleList(params: RoleFilterDto) {
  return Alova.Get<PageResult<Role>>('/system/role/getByPage', { params });
}
