import { useState } from "react";
import InputFieldWithLabel from "../molecules/InputfieldWithLabel.jsx";
import Button from "../atoms/button.jsx";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/adminDashboard');  // Navigate to the admin dashboard route
  };
  // Array to store input field formData
  const inputFields = [
    {
      labelText:"Email",
      label: "Email",
      name: "Email",
      placeholder: "Enter your Email",
      type: "email",
      value: formData.email,
      maxLength: 30,
      width: "100%",
    },
    {
      labelText:"Password",
      label: "Password",
      name: "password",
      placeholder: "Enter your passwordasdasd",
      type: "password",
      value: formData.password,
      maxLength: 30,
      width: "100%",
    },
  ];

  return (
    <>
      <div className="lg:h-screen flex items-center justify-center">
        <div className="bg-white p-8 md:p-0 w-full max-w-lg">
          <h1 className="text_color text-5xl mb-5 text-center md:justify-start">
            Welcome <span className="text-black">Back!</span>
          </h1>
          <p className="text-xl mb-12 text-center md:justify-start">Login to get started</p>
          {inputFields.map((inputFieldsData, index) => {
            return (
              <div key={index} className="mb-4">
                <InputFieldWithLabel
                 labelText={inputFieldsData.labelText}
                  input_Lable={inputFieldsData.input_Lable}
                  input_Lable_For={inputFieldsData.input_Lable_For}
                  placeholder={inputFieldsData.placeholder}
                  value={formData[inputFieldsData.name]}
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
            );
          })}

          <div className="flex items-center justify-start mt-6 mb-10">
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
          <div className="w-full">
            <Button label="Login" onClick={handleLogin} width="100%" backgroundColor="#004871" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
