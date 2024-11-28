import { useState, useEffect } from "react";
import InputFieldWithLabel from "../molecules/InputfieldWithLabel.jsx";
import Button from "../atoms/button.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authReducer.js";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Select Redux state
  const { data, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (data?.status === 200) {
      localStorage.setItem("token", data?.data?.token);
      localStorage.setItem("data", JSON.stringify(data?.data?.user));
      
      toast.success(data?.data?.message || "Login successful!", { autoClose: 1000 });
  
      // Navigate after toast
      setTimeout(() => {
        navigate("/admin");
      }, 1000); // Delay of 1 second
    } else if (error) {
      toast.error(error || "Login failed. Please try again.");
    }
  }, [data, error, navigate]);
  

  const handleLogin = () => {
    const { email, password } = formData;

    if (!email || !password) {
      // alert("Please fill in all fields");
      toast.warning("Please fill in all fields");
      return;
    }

    // Dispatch the login action
    dispatch(login({ email, password }));
  };


  const inputFields = [
    {
      labelText: "Email",
      label: "Email",
      name: "email",
      placeholder: "Enter your Email",
      type: "email",
      value: formData.email,
      maxLength: 30,
      width: "100%",
    },
    {
      labelText: "Password",
      label: "Password",
      name: "password",
      placeholder: "Enter your password",
      type: "password",
      value: formData.password,
      maxLength: 30,
      width: "100%",
    },
  ];

  return (
    <div className="lg:h-screen flex items-center justify-center">
    <ToastContainer />
      <div className="bg-white p-8 md:p-0 w-full max-w-lg">
        <h1 className="text_color text-4xl md:text-5xl mb-5 text-center md:justify-start">
          Welcome <span className="text-black">Back!</span>
        </h1>
        <p className="text-xl mb-12 text-center md:justify-start">Login to get started</p>

        {inputFields.map((inputFieldsData, index) => (
          <div key={index} className="mb-4">
            <InputFieldWithLabel
              labelText={inputFieldsData.labelText}
              placeholder={inputFieldsData.placeholder}
              value={inputFieldsData.value}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [inputFieldsData.name]: e.target.value,
                })
              }
              width={inputFieldsData.width}
              maxLength={inputFieldsData.maxLength}
              name={inputFieldsData.name}
            />
          </div>
        ))}

        <div className="flex items-center justify-between mt-6 mb-10">
          <div className="flex items-center justify-start">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <label htmlFor="remember" className="ml-2">
              Remember Me
            </label>
          </div>
          <div className="text-[#004871]">
            <p>Forgot password?</p>
          </div>
        </div>

        <div className="w-full">
          <Button  label={
              loading ? (
                <FaSpinner className="animate-spin text-white mx-auto text-3xl" />
              ) : (
                "Login"
              )
            } onClick={handleLogin} width="100%" backgroundColor="#004871" />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
