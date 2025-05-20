import axios from "axios";

const api_name = "https://vue-course-api.hexschool.io";
const api_path = "supercurry";

//取得購物車列表
export const getCart = async () => {
  try {
    const response = await axios.get(`${api_name}/api/${api_path}/cart`);
    return {
      success: true,
      carts: response.data.data.carts || [],
      total: response.data.data.total,
      final_total: response.data.data.final_total,
    };
  } catch (error) {
    console.error("取得購物車失敗", error);
    return {
      success: false,
      carts: [],
      total: 0,
      final_total: 0,
      message: error.response?.data?.message || "取得購物車失敗",
    };
  }
};

//加入購物車
export const addToCart = async (product_id, qty) => {
  try {
    const response = await axios.post(`${api_name}/api/${api_path}/cart`, {
      data: {
        product_id,
        qty,
      },
    });
    return response.data;
  } catch (error) {
    console.error("加入購物車失敗", error);
    return {
      success: false,
      message: error.response?.data?.message || "加入購物車失敗",
    };
  }
};

//刪除購物車產品
export const deleteCartItem = async (id) => {
  try {
    const response = await axios.delete(
      `${api_name}/api/${api_path}/cart/${id}`
    );
    if (response.data.success) {
      return { success: true, message: response.data.message };
    } else {
      return { success: false, message: response.data.message || "刪除失敗" };
    }
  } catch (error) {
    console.error("刪除購物車商品錯誤", error);
    return { success: false, message: error.message || "網路錯誤" };
  }
};

//套用優惠券
export const applyCoupon = async (code) => {
  try {
    const response = await axios.post(`${api_name}/api/${api_path}/coupon`, {
      data: { code },
    });
    if (response.data.success) {
      return {
        success: true,
        message: response.data.message,
        finalTotal: response.data.data.final_total,
      };
    } else {
      return {
        success: false,
        message: response.data.message || "套用優惠券失敗",
      };
    }
  } catch (error) {
    console.error("套用優惠券錯誤", error);
    return {
      success: false,
      message: error.message || "網路錯誤，請稍後再試",
    };
  }
};

//送出及建立訂單
export const submitOrder = async (payload) => {
  try {
    // payload 範例格式：
    // {
    //   data: {
    //     user: { name, email, tel, address },
    //     message: "留言內容"
    //   }
    // }
    const response = await axios.post(
      `${api_name}/api/${api_path}/order`,
      payload
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.response?.data?.messages ||
        error.message ||
        "網路錯誤，請稍後再試",
    };
  }
};

//取得訂單
export const getOrderDetail = async (orderId) => {
  try {
    const response = await axios.get(
      `${api_name}/api/${api_path}/order/${orderId}`
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || error.message || "取得訂單資料失敗",
    };
  }
};

//確認付款
export const payOrder = async (orderId) => {
  try {
    const response = await axios.post(
      `${api_name}/api/${api_path}/pay/${orderId}`
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "付款失敗，請稍後再試",
    };
  }
};
