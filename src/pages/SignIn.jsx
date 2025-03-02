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
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center">
      <div className="p-6 max-w-md w-full bg-white shadow-lg rounded-lg">
        <h1 className="text-center text-xl font-semibold mb-4">Sign In</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <Label value="Email" />
            <TextInput
              type="email"
              placeholder="name@company.com"
              id="email"
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <Label value="Password" />
            <TextInput
              type="password"
              placeholder="********"
              id="password"
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
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

        {/* Error Message */}
        {errorMessage && <Alert className="mt-5" color="failure">{errorMessage}</Alert>}
      </div>
    </div>
  );
}
