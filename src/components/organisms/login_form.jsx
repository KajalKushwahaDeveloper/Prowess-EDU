import { useState, useEffect } from "react";
import InputFieldWithLabel from "../molecules/InputfieldWithLabel.jsx";
import Button from "../atoms/button.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authReducer.js";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Select Redux state
  const { data, loading, error } = useSelector((state) => state.auth);

  // Debugging logs
  console.log("Redux data:", data?.data?.user?.type);
  console.log("Redux error:", error);

  // Monitor the `data` property for navigation
  useEffect(() => {
    if (data?.status === 200) {
    localStorage.setItem("token",data?.data?.token)
      navigate("/admin");
    }
  }, [data, navigate]); // Dependency array ensures this runs when `data` changes

  const handleLogin = () => {
    const { email, password } = formData;
    console.log("Credentials:", email, password);

    if (!email || !password) {
      alert("Please fill in all fields");
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

        {loading && <p className="text-blue-600 text-center mb-4">Loading...</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="w-full">
          <Button label="Login" onClick={handleLogin} width="100%" backgroundColor="#004871" />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
