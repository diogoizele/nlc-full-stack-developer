import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/auth.store";

export const Redirect = () => {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  return null;
};
