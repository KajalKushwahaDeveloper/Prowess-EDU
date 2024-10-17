import { useState } from "react";
import InputField from "../atoms/inputField.jsx";
import Button from "../atoms/button.jsx";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // Array to store input field formData
  const inputFields = [
    {
      label: "Email",
      name: "Email",
      placeholder: "Enter your Email",
      type: "email",
      value: formData.email,
      maxLength: 30,
      width: "100%",
    },
    {
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
    <>
      <div className="lg:h-screen flex items-center justify-center">
        <div className="bg-white p-8 md:p-0 w-full max-w-lg">
          <h1 className="text_color text-5xl mb-5 justify-start">
            Welcome <span className="text-black">Back!</span>
          </h1>
          <p className="text-xl mb-12 justify-start">Login to get started</p>
          {inputFields.map((inputFieldsData, index) => {
            return (
              <div key={index} className="mb-4">
                <InputField
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

          <div className="flex items-center justify-start my-6">
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
            <Button label="Login" width="100%" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
