import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedMemberRoute = ({ children }) => {
  const { isCustomerLoggedIn, isAuthChecked } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthChecked && !isCustomerLoggedIn) {
      navigate("/liff-login");
    }
  }, [isCustomerLoggedIn, isAuthChecked, navigate]);

  if (!isAuthChecked) {
    return <p>驗證中，請稍候...</p>; // 或使用 Spinner
  }

  return isCustomerLoggedIn ? children : null;
};

export default ProtectedMemberRoute;
