import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
// import { FORGOT_PASSWORD } from "../services/constant";
// import { Link } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toast = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Toast ref={toast} className="custom-toast" />
      <div className="h-screen  flex items-center justify-center min-h-70 mx-4 ">
        <div className="flex flex-col items-center w-full max-w-md p-6 bg-white ">
          <h1 className="text-3xl font-semibold text-center mb-4">
            FORGET PASSWORD
          </h1>
          <p className="text-center mb-4">please enter your email</p>

          <div className="card px-3 py-4 shadow-lg rounded-lg w-full border border-b-2">
            <form onSubmit={handleSubmit}>
              <div className="">
                <div className="mb-9 mt-2">
                  <InputText
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    keyfilter="email"
                    className="p-inputtext-lg w-full bg-blue-100 py-2 rounded-md"
                    placeholder="  Enter your registered email"
                  />
                </div>

                <Button
                  label="Submit"
                  className="w-full text-white card py-2 rounded-md flex justify-center items-center bg-[#004871]"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;