import api from "./Api";

const apiPath = "supercurry";

//取得優惠券列表
export async function getCoupons(page = 1) {
  try {
    const response = await api.get(`/api/${apiPath}/admin/coupons`, {
      params: { page },
    });
    return {
      success: response.data.success,
      coupons: response.data.coupons,
      pagination: response.data.pagination,
      messages: response.data.messages || [],
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}

//新建優惠券
export async function createCoupon(data) {
  try {
    // percent 預設為 100，且強制轉數字
    const percentNum = Number(data.percent);
    const submitData = {
      ...data,
      percent: isNaN(percentNum) || percentNum <= 0 ? 100 : percentNum,
    };

    const response = await api.post(`/api/${apiPath}/admin/coupon`, {
      data: submitData,
    });
    return {
      success: response.data.success,
      message: response.data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}

// 修改優惠券
export async function updateCoupon(id, data) {
  try {
    const percentNum = Number(data.percent);
    const submitData = {
      ...data,
      percent: isNaN(percentNum) || percentNum <= 0 ? 100 : percentNum,
    };

    const response = await api.put(`/api/${apiPath}/admin/coupon/${id}`, {
      data: submitData,
    });
    return {
      success: response.data.success,
      message: response.data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}

// 刪除優惠券
export async function deleteCoupon(id) {
  try {
    const response = await api.delete(`/api/${apiPath}/admin/coupon/${id}`);
    return {
      success: response.data.success,
      message: response.data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}
