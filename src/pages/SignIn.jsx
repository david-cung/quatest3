import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      const res = await fetch("/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        return dispatch(signInFailure(data.message || "Login failed"));
      }

      localStorage.setItem("token", data.data.accessToken);
      dispatch(signInSuccess(data));
      navigate("/dashboard", { replace: true });
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100">
      {/* Header */}
      <header className="w-full bg-white shadow-md p-4 text-center font-semibold text-lg">
        My Website
      </header>

      {/* Main Content */}
      <main className="flex-1 flex justify-center items-center">
        <div className="p-5 max-w-3xl w-full mx-auto bg-white shadow-lg rounded-lg">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="********"
                id="password"
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {errorMessage && (
            <Alert className="mt-5" color="blue">
              {errorMessage}
            </Alert>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white shadow-md p-4 text-center text-sm">
        © 2025 My Website. All rights reserved.
      </footer>
    </div>
  );
}
