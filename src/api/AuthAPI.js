import api from "./Api";

// 登入
export const signin = (username, password) => {
  return api.post("/admin/signin", { username, password });
};

// 登出
export const signout = () => {
  return api.post("/logout");
};

// 檢查登入狀態
export const checkLogin = () => {
  return api.post("/api/user/check");
};
