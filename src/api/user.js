import http from "../util/request";

//获取用户管理数据
export async function getUsersData(params) {
  try {
    return await http({
      method: "get",
      url: "/user/getUserData",
      params: params,
    });
  } catch (err) {
    console.log(err.message);
  }
}

//新增一名用户
export async function createUser(user) {
  try {
    return await http({
      method: "post",
      url: "user/createUser",
      data: user,
    });
  } catch (err) {
    console.log(err);
  }
}

//删除一名用户
export async function deleteUser(id) {
  try {
    return await http({
      method: "post",
      url: "user/deleteUser",
      data: {
        id,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

//更新一名用户信息
export async function update(user) {
  try {
    return await http({
      method: "post",
      url: "user/update",
      data: user,
    });
  } catch (err) {
    console.log(err);
  }
}
