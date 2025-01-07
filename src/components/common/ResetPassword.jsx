import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "primereact/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reset_password } from "../../features/auth/forgotPasswordReducer";
import InputFieldWithLabel from "../molecules/InputfieldWithLabel";
import { Icons } from "../../assets/icons";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const email = location.state?.email;
  const role = location.state?.role;

  // Role-based dashboard routes
  const roleRoutes = {
    admin: "/",
    teacher: "/teacherLogin",
    student: "/studentLogin",
    parent: "/parentLogin",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.warn("Please fill both password fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.warn("Passwords do not match.");
      return;
    }

    try {
      const payload = { email, password };

      // Dispatch the reset_password action
      await dispatch(reset_password({ role, payload })).unwrap();

      toast.success("Password has been reset successfully.");
      setPassword("");
      setConfirmPassword("");

      // Navigate to the appropriate dashboard
      const dashboardRoute = roleRoutes[role] || "/";
      navigate(dashboardRoute);
    } catch (err) {
      toast.error(err || "Failed to reset password.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center w-full max-w-lg p-8 bg-white shadow-xl rounded-xl">
        <h1 className="text-4xl font-semibold text-center mb-4 text-gray-800">
          Reset Password
        </h1>
        <p className="text-center mb-6 text-gray-600">
          Please enter your new password below.
        </p>

        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <InputFieldWithLabel
                type="password"
                className="p-inputtext-lg w-full p-4 bg-blue-50 rounded-lg border border-gray-300"
                labelText="Password"
                name="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-8">
              <InputFieldWithLabel
                name="confirmPassword"
                type="password"
                className="p-inputtext-lg w-full p-4 bg-blue-50 rounded-lg border border-gray-300"
                labelText="Confirm Password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              label="Submit"
              className="w-full text-white py-3 rounded-lg bg-[#004871] hover:bg-[#003355]"
            />
            <p className="text-right mt-3 cursor-pointer flex items-center justify-end gap-2 text-[#004871] text-md">
              <i
                className={`${Icons.leftArrow} text-md flex-shrink-0`}
                style={{ fontSize: "1rem" }}
              ></i>
              <span
                className="text-[#004871] underline text-md"
                onClick={() => navigate(-1)}
                style={{ fontSize: "1rem" }}
              >
                Back
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
