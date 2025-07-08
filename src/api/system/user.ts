import { Alova } from '@/utils/http/alova/index';
import { useFetch } from '@vueuse/core';
import { UserInfoType } from '@/store/modules/user';

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return Alova.Get<UserInfoType>('/system/user/info', {
    meta: {
      isReturnNativeResponse: true,
    },
  });
}

/**
 * @description: 用户登录
 */
export async function login(params): Promise<string> {
  const { data } = await useFetch('/api/system/user/login').post(params).text();
  return data.value || '';
}

/**
 * @description: 用户修改密码
 */
export function changePassword(params, uid) {
  return Alova.Post(`/user/u${uid}/changepw`, { params });
}

/**
 * @description: 用户登出
 */
export function logout(params) {
  return Alova.Post('/login/logout', {
    params,
  });
}
