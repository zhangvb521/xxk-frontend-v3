import { Alova } from '@/utils/http/alova/index';
export interface ListDate {
  id: string;
  parentId: string;
  menuName: string;
  sort: string;
  permission: string;
  remarks: string;
  menuType: number;
  path: string;
  children: ListDate[];
}

/**
 * @description: 根据用户id获取用户菜单
 */
export function adminMenus() {
  return Alova.Get('/menus');
}

/**
 * 获取tree菜单列表
 * @param params
 */
export function getMenuList(params?) {
  return Alova.Get<ListDate[]>('/system/menu/selectTree', {
    params,
  });
}
