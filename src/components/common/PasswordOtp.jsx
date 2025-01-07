import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "primereact/button";
import { InputOtp } from "primereact/inputotp";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verify_otp } from "../../features/auth/forgotPasswordReducer";
import { Icons } from "../../assets/icons";

function PasswordOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const email = location.state?.email;
  const role = location.state?.role;
  const { loading } = useSelector((state) => state.passwordSharedApi);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.warn("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const payload = { email, otp };
      await dispatch(verify_otp({ role, payload })).unwrap();

      toast.success("OTP verified successfully. Redirecting...");
      navigate("/resetPassword", { state: { role: role, email: email } });
      setOtp("");
    } catch (err) {
      toast.error(err || "Failed to verify OTP. Please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold text-center mb-4">Enter OTP</h1>
        <p className="text-center text-gray-600 mb-6">
          Please enter the 6-digit OTP sent to your email.
        </p>
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className=" flex justify-center">
                <InputOtp
                  value={otp}
                  onChange={(e) => setOtp(e.value)}
                  length={6}
                  className=" w-full p-4 shadow-lg rounded-lg border border-gray-300 text-lg"
                />
              </div>
            </div>
            <Button
              label={loading ? "Submitting..." : "Submit"}
              className="w-full text-white py-3 rounded-md bg-[#004871] hover:bg-[#003456]  mt-2"
              disabled={loading}
            />
            <p className="text-right mt-3 cursor-pointer flex items-center justify-end gap-2 text-[#004871] text-md">
              <i
                className={`${Icons.leftArrow} text-md flex-shrink-0`}
                style={{ fontSize: "1rem" }} // Adjust the size of the icon
              ></i>
              <span
                className="text-[#004871] underline text-md"
                onClick={() => navigate(-1)}
                style={{ fontSize: "1rem" }} // Ensure the text size matches the icon
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

export default PasswordOtp;
