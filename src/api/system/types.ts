export interface LoginDto {
  username: string;
  password: string;
}

export interface UserInfo {
  id: string;
  loginName: string;
  nickName: string;
  avatar: string;
  phone: string;
  menuList: any[];
}

export interface Role {
  id: string;
  roleName: string;
  useable: string;
  remarks: string;
}
export interface PageQuery {
  pageNum: number;
  pageSize: number;
}

export interface RoleFilterDto extends PageQuery {
  roleName: string;
}

export interface PageResult<T> {
  total: number;
  totalPage: number;
  items: T[];
}
