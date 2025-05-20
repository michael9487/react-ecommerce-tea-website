import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import dayjs from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const AdminCouponsModal = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    percent: 100,
    due_date: "",
    is_enabled: true,
  });

  // 當 Modal 開啟或 initialData 變動時，初始化表單資料
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        code: initialData.code || "",
        percent: initialData.percent || 100,
        due_date: initialData.due_date
          ? dayjs.unix(initialData.due_date).format("YYYY-MM-DD")
          : "",
        is_enabled: initialData.is_enabled === 1,
      });
    } else {
      setFormData({
        title: "",
        code: "",
        percent: 100,
        due_date: "",
        is_enabled: true,
      });
    }
  }, [initialData, open]);

  // 表單欄位變更處理
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 送出表單
  const handleSubmit = () => {
    // 簡單驗證
    if (!formData.title.trim()) {
      alert("請輸入標題");
      return;
    }
    if (!formData.code.trim()) {
      alert("請輸入優惠代碼");
      return;
    }
    if (isNaN(formData.percent) || formData.percent <= 0) {
      alert("折扣必須是大於 0 的數字");
      return;
    }
    if (!formData.due_date) {
      alert("請選擇到期日");
      return;
    }

    // 將日期轉成 UNIX timestamp
    const submitData = {
      ...formData,
      percent: Number(formData.percent),
      due_date: dayjs(formData.due_date).unix(),
      is_enabled: formData.is_enabled ? 1 : 0,
    };

    onSubmit(submitData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          {initialData ? "編輯優惠券" : "新增優惠券"}
        </Typography>

        <TextField
          label="標題"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="優惠代碼"
          name="code"
          value={formData.code}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="折扣(%)"
          name="percent"
          type="number"
          value={formData.percent}
          onChange={handleChange}
          fullWidth
          margin="normal"
          inputProps={{ min: 1, max: 100 }}
        />

        <TextField
          label="到期日"
          name="due_date"
          type="date"
          value={formData.due_date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.is_enabled}
              onChange={handleChange}
              name="is_enabled"
            />
          }
          label="是否啟用"
        />

        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose} sx={{ mr: 2 }}>
            取消
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            {initialData ? "更新" : "新增"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AdminCouponsModal;
