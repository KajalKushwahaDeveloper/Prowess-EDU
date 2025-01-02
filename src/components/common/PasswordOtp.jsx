import React, { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { Button } from 'primereact/button';
import { InputOtp } from 'primereact/inputotp'; // Ensure this library supports `length` or similar props
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function PasswordOtp() {
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;


    const toast = useRef(null);

    const handleSubmit =async (e) => {
        e.preventDefault();
        console.log("Entered OTP:", otp);
        // Add logic to verify the OTP


        try {
            const payload = {
              email,
              otp
            };
            const response = await fetch("https://rwtu9cjeni.execute-api.ap-south-1.amazonaws.com/dev/verifyOtp?role=parent", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            });
            const responseData = await response.json();
            if (responseData.status === 200) {
              toast?.current?.show({
                severity: "success",
                summary: "Success",
                detail:
                  "A password is correct. Please check to reset your password.",
                life: 3000,
              });
              setTimeout(() => {
                navigate("/resetPassword", { state: { email } });
              }, 2000);
            } else {
              toast?.current?.show({
                severity: "warn",
                summary: "warning",
                detail: "OTP is not correct",
                life: 3000,
              });
            }
          } 
          catch (error) {
            toast?.current?.show({
              severity: "error",
              summary: "Error",
              detail: error.message,
              life: 3000,
            });
          }

    };

    return (
        <div>
            <Toast ref={toast} className="custom-toast" />
            <div className="h-screen flex items-center justify-center min-h-70 mx-4">
                <div className="flex flex-col items-center w-full max-w-md p-6 bg-white">
                    <h1 className="text-3xl font-semibold text-center mb-4">ENTER OTP</h1>
                    <p className="text-center mb-4">Please enter your OTP</p>

                    <div className="card px-3 py-4 shadow-lg rounded-lg w-full border border-b-2">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-12">
                                <div className="card flex justify-center items-center mt-3">
                                    <InputOtp 
                                        value={otp} 
                                        onChange={(e) => setOtp(e.value)} 
                                        length={6} 
                                        
                                      
                                    />
                                </div>
                            </div>
                            <Button 
                                label="Submit" 
                                className="w-full  card py-2 rounded-md flex justify-center items-center text-white bg-[#004871]" 
                            />
                        </form>
                    </div>
                    <p className="mt-6">An OTP has been sent to: <span className="text-blue-500 font-bold">{email}</span></p>
                </div>
            </div>
        </div>
    );
}

export default PasswordOtp;
