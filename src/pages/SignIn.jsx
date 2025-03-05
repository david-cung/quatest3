import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value.trim() });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the required fields"));
    }

    try {
      dispatch(signInStart());
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        return dispatch(signInFailure(data.message));
      }

      localStorage.setItem("token", data.data.accessToken);
      dispatch(signInSuccess(data));
      navigate("/dashboard", { replace: true });
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4f4f4",
      }}
    >
      <div
        style={{
          padding: "32px",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
          minWidth: "400px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "24px", color: "#333", marginBottom: "16px" }}>
          Đăng nhập
        </h1>

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
          onSubmit={handleSubmit}
        >
          {/* Email */}
          <div style={{ textAlign: "left" }}>
            <Label style={{ fontSize: "16px", fontWeight: "500" }} value="Email" />
            <TextInput
              type="email"
              placeholder="name@company.com"
              id="email"
              onChange={handleChange}
              style={{
                padding: "12px",
                fontSize: "16px",
                borderRadius: "6px",
                border: "1px solid #bbb",
                outline: "none",
                backgroundColor: "#f8f9fa",
                color: "#333",
                width: "100%",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#007bff")}
              onBlur={(e) => (e.target.style.borderColor = "#bbb")}
            />
          </div>

          {/* Password */}
          <div style={{ textAlign: "left" }}>
            <Label style={{ fontSize: "16px", fontWeight: "500" }} value="Mật khẩu" />
            <TextInput
              type="password"
              placeholder="********"
              id="password"
              onChange={handleChange}
              style={{
                padding: "12px",
                fontSize: "16px",
                borderRadius: "6px",
                border: "1px solid #bbb",
                outline: "none",
                backgroundColor: "#f8f9fa",
                color: "#333",
                width: "100%",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#007bff")}
              onBlur={(e) => (e.target.style.borderColor = "#bbb")}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px",
              fontSize: "18px",
              fontWeight: "bold",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span style={{ paddingLeft: "8px" }}>Đang tải...</span>
              </>
            ) : (
              "Đăng nhập"
            )}
          </Button>
        </form>

        {/* Error Message */}
        {errorMessage && (
          <Alert style={{ marginTop: "16px", color: "#d9534f" }}>
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
}
