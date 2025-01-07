import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import InputFieldWithLabel from "../molecules/InputfieldWithLabel";
import { Button } from "primereact/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgot_password } from "../../features/auth/forgotPasswordReducer";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.passwordSharedApi);
  const location = useLocation();
  const role = location.state?.role;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.warn("Please enter your email.");
      return;
    }

    try {
      const payload = { email };
      await dispatch(forgot_password({ role, payload })).unwrap();

      toast.success("Password reset link sent to your email.", );

      navigate("/otp", { state: { role: role, email: email } });
      setEmail("");
    } catch (err) {
      toast.error(err  || "Failed to send password reset link.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-semibold text-center mb-4">
          Forget Password
        </h1>
        <p className="text-center mb-4">Please enter your email.</p>
        <div className="card px-3 py-8 w-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-9 mt-2">
              <InputFieldWithLabel
                type="email"
                className="p-inputtext-lg w-full bg-blue-100 py-2 rounded-md"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button
              label={loading ? "Submitting..." : "Submit"}
              className="w-full text-white py-2 rounded-md flex justify-center items-center bg-[#004871]"
              disabled={loading}
            />
            <p className="text-center mt-3 cursor-pointer">
              Back to
              <span
                className="text-[#004871] underline"
                onClick={() => navigate(-1)}
              >
                {" "}
                Login{" "}
              </span>
              page
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
