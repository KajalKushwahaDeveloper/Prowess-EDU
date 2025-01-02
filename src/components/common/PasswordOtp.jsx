import React, { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { Button } from 'primereact/button';
import { InputOtp } from 'primereact/inputotp'; // Ensure this library supports `length` or similar props
import { useNavigate } from "react-router-dom";

function PasswordOtp() {
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const toast = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Entered OTP:", otp);
        // Add logic to verify the OTP
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
                </div>
            </div>
        </div>
    );
}

export default PasswordOtp;
