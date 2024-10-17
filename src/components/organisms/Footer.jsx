import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputField from "../atoms/inputField.jsx";
import Button from "../atoms/button.jsx";

// Yup validation schema
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Logging in with:", values);
        // Handle the login logic here
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="lg:h-screen flex items-center justify-center md:mt-4">
          <div className="bg-white p-8 md:p-0 w-full max-w-lg">
            <h1 className="text_color text-5xl mb-5 justify-start">
              Welcome <span className="text-black">Back!</span>
            </h1>
            <p className="text-xl mb-12 justify-start">Login to get started</p>

            {/* Email Field */}
            <div className="mb-4">
              <InputField
                input_Lable="Your Email"
                input_Lable_For="email"
                placeholder="Enter your email"
              >
                <Field name="email" type="email" className="w-full p-2 border rounded" />
              </InputField>
              {/* Display error for email */}
              <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <InputField
                input_Lable="Password"
                input_Lable_For="password"
                placeholder="Enter your password"
              >
                <Field name="password" type="password" className="w-full p-2 border rounded" />
              </InputField>
              {/* Display error for password */}
              <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-start my-6">
              <Field
                type="checkbox"
                id="remember"
                name="remember"
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <label htmlFor="remember" className="ml-2">
                Remember Me
              </label>
            </div>

            {/* Submit Button */}
            <div className="w-full">
              <Button label="Login" width="100%" type="submit" />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
