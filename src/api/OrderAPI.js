import api from "./Api";

const apiPath = "supercurry";

//取得訂單列表
export async function fetchOrders(page = 1) {
  try {
    const response = await api.get(`/api/${apiPath}/admin/orders?page=${page}`);
    return {
      orders: response.data.orders || [],
      pagination: response.data.pagination || {
        total_pages: 1,
        current_page: 1,
      },
      success: response.data.success,
      message: response.data.message,
    };
  } catch (error) {
    return {
      orders: [],
      pagination: { total_pages: 1, current_page: 1 },
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}

// 修改訂單
export async function updateOrder(id, orderData) {
  try {
    const response = await api.put(`/api/${apiPath}/admin/order/${id}`, {
      data: orderData,
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

// 刪除訂單
export async function deleteOrder(id) {
  try {
    const response = await api.delete(`/api/${apiPath}/admin/order/${id}`);
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
