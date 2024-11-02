import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { login } from '@/State/Auth/Action';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { encryptData } from '@/utils/cryptoUtils'; // Import encryption function

const SigninForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [emailWarning, setEmailWarning] = useState("");
    const [passwordWarning, setPasswordWarning] = useState("");

    const form = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    // Regular expression to validate allowed characters
    const regex = /^[a-zA-Z0-9!@#+-.]+$/;

    const onSubmit = (data) => {
        // Encrypt the password before sending
        const encryptedData = {
            email: encryptData(data.email),
            password: encryptData(data.password)
        };

        dispatch(login({ data: encryptedData, navigate }));
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;

        // Validate email
        if (!regex.test(value)) {
            setEmailWarning("Invalid email! Only allowed characters: !, @, #, +, -, .");
            form.setValue("email", value.replace(/[^a-zA-Z0-9!@#+-.]/g, '')); // Remove invalid characters
        } else {
            setEmailWarning("");
            form.setValue("email", value);
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;

        // Validate password
        if (!regex.test(value)) {
            setPasswordWarning("Invalid password! Only allowed characters: !, @, #, +, -, .");
            form.setValue("password", value.replace(/[^a-zA-Z0-9!@#+-.]/g, '')); // Remove invalid characters
        } else {
            setPasswordWarning("");
            form.setValue("password", value);
        }
    };

    return (
        <div>
            <h1 className="text-xl font-bold text-center pb-3">Login</h1>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <div>
                    <Input
                        {...form.register("email")}
                        className="border w-full border-gray-700 p-5"
                        placeholder="Email"
                        onChange={handleEmailChange}
                        onBlur={() => setEmailWarning("")} // Clear warning on focus out
                    />
                    {emailWarning && <p className="text-red-500 text-sm">{emailWarning}</p>}
                </div>

                {/* Password Field with Eye Icon Toggle */}
                <div className="relative">
                    <Input
                        {...form.register("password")}
                        type={showPassword ? "text" : "password"}
                        className="border w-full border-gray-700 p-5"
                        placeholder="Password"
                        onChange={handlePasswordChange}
                        onBlur={() => setPasswordWarning("")} // Clear warning on focus out
                    />
                    <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    />
                    {passwordWarning && <p className="text-red-500 text-sm">{passwordWarning}</p>}
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full py-5" disabled={emailWarning || passwordWarning}>
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default SigninForm;
