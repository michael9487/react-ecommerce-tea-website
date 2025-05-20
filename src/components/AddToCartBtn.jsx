import React, { useState } from "react";
import { Button, CircularProgress, Snackbar } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

const apiPath = "https://vue-course-api.hexschool.io";
const customPath = "supercurry";

const AddToCartBtn = ({
  productId,
  qty = 1,
  onSuccess,
  variant = "contained",
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddToCart = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiPath}/api/${customPath}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            product_id: productId,
            qty,
          },
        }),
      });

      if (!response.ok) throw new Error("加入購物車失敗");
      const data = await response.json();

      if (data.success && onSuccess) {
        onSuccess(data.data);
      }
    } catch (err) {
      setError(err.message || "發生未知錯誤");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant={variant}
        onClick={handleAddToCart}
        disabled={loading}
        startIcon={loading && <CircularProgress size={20} />}
        {...props}
      >
        {loading ? "加入中..." : "加入購物車"}
      </Button>

      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError(null)}
        message={
          <span style={{ display: "flex", alignItems: "center" }}>
            <ErrorIcon color="error" sx={{ mr: 1 }} />
            {error}
          </span>
        }
      />
    </>
  );
};

export default AddToCartBtn;
