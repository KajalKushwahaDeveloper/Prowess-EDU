import React, { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function ResetPassword() {

     const [password, setPassword] = useState("");
     const [confirmPassword, setConfirmPassword] = useState("");
     const [message, setMessage] = useState("");
     const [isLoading, setIsLoading] = useState(false);

        const navigate = useNavigate();
        const location = useLocation();
        const email = location.state?.email;
        
    
        const toast = useRef(null);
    
    
      const handleSubmit = async(e)=>{
        e.preventDefault();

        if (password !== confirmPassword) {
          setMessage("Passwords do not match!");
          return;
        }


    try {
      const response = await fetch("https://rwtu9cjeni.execute-api.ap-south-1.amazonaws.com/dev/resetPassword?role=parent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email, 
          password,
      
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset successful!");
      } else {
        setMessage(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setMessage("Failed to reset password. Please try again later.");
    }
      }

  return (
    <div>
        <Toast ref={toast} className="custom-toast" />
           <div className="h-screen  flex items-center justify-center min-h-70 mx-4 ">
           <div className="flex flex-col items-center w-full max-w-md p-6 bg-white ">
            <h1 className="text-3xl font-semibold text-center mb-4">RESET PASSWORD</h1>
            <p className="text-center mb-4">please enter new password</p>
      
            <div className="card px-3 py-4 shadow-lg rounded-lg w-full border border-b-2">
                  <form onSubmit={handleSubmit}>
                    <div className="">
                      <div className="mb-10 ">
                        <InputText
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="p-inputtext-lg w-full bg-blue-100 py-2 rounded-md"
                          placeholder="  Enter new password"
                        />
                        <InputText
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}                       
                          className="p-inputtext-lg w-full bg-blue-100 py-2 rounded-md mt-2"
                          placeholder="  Confirm new password"
                          
                        />
                      </div>
                      
                  <Button label="Submit" className="w-full text-white card py-2 rounded-md flex justify-center items-center bg-[#004871]" />
              
              </div>
              </form>
              <div className="text-center ml-3">
              {message && <p>{message}</p>}
              </div>
              
            </div>
            </div>
            </div>
    </div>
  )
}

export default ResetPassword
