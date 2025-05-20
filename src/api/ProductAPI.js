import api from "./Api";

const apiPath = "supercurry";

//撈產品列表
export async function fetchProducts(page = 1) {
  try {
    const response = await api.get(
      `/api/${apiPath}/admin/products?page=${page}`
    );
    return {
      products: response.data.products || [],
      pagination: response.data.pagination || {
        total_pages: 1,
        current_page: 1,
      },
      success: response.data.success,
      message: response.data.message,
    };
  } catch (error) {
    return {
      products: [],
      pagination: { total_pages: 1, current_page: 1 },
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}

//新增產品
// 建立新產品
export async function createProduct(productData) {
  try {
    const response = await api.post(`/api/${apiPath}/admin/product`, {
      data: productData,
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

// 修改更新產品
export async function updateProduct(id, productData) {
  try {
    const response = await api.put(`/api/${apiPath}/admin/product/${id}`, {
      data: productData,
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

// 刪除產品
export async function deleteProduct(productId) {
  try {
    const response = await api.delete(
      `/api/${apiPath}/admin/product/${productId}`
    );
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

//上傳產品圖片
export async function uploadImage(file) {
  try {
    const formData = new FormData();
    formData.append("file-to-upload", file);

    const response = await api.post(`/api/${apiPath}/admin/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      success: response.data.success,
      imageUrl: response.data.imageUrl,
      message: response.data.message || "",
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || "上傳失敗",
    };
  }
}
