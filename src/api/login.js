import http from "../util/request";

export async function loginIn(lognInfo) {
  try {
    return await http({
      method: "get",
      url: "/login/loginIn",
      params: lognInfo,
    });
  } catch (err) {
    console.log(err.message);
  }
}
