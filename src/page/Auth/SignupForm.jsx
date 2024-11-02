import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { register } from '@/State/Auth/Action';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { encryptData } from '@/utils/cryptoUtils'; // Import your encryption function

const SignupForm = () => {
    const dispatch = useDispatch();
    const form = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirm_password: "",
        },
    });

    const [passwordStrength, setPasswordStrength] = useState('');
    const [isMatch, setIsMatch] = useState(true);
    const [emailWarning, setEmailWarning] = useState("");
    const [passwordWarning, setPasswordWarning] = useState("");

    // Regular expression to validate allowed characters
    const regex = /^[a-zA-Z0-9!@#+-.]*$/;

    // Function to check password strength
    const checkPasswordStrength = (password) => {
        const lengthCriteria = password.length >= 8;
        const numberCriteria = /[0-9]/.test(password);
        const uppercaseCriteria = /[A-Z]/.test(password);
        const lowercaseCriteria = /[a-z]/.test(password);
        const specialCharCriteria = /[!@#$%^&*]/.test(password);

        const criteriaCount = [lengthCriteria, numberCriteria, uppercaseCriteria, lowercaseCriteria, specialCharCriteria].filter(Boolean).length;

        if (criteriaCount < 2) {
            setPasswordStrength('Weak');
        } else if (criteriaCount < 4) {
            setPasswordStrength('Medium');
        } else {
            setPasswordStrength('Strong');
        }
    };

    // Check for password and confirm password match
    useEffect(() => {
        const { password, confirm_password } = form.getValues();
        setIsMatch(password === confirm_password);
    }, [form.watch('password'), form.watch('confirm_password')]);

    const onSubmit = (data) => {
        const encryptedData = {
            ...data,
            password: encryptData(data.password), // Encrypt the password
            confirm_password: encryptData(data.confirm_password), // Optional: Encrypt confirm password if needed
        };
        dispatch(register(encryptedData));
        console.log(encryptedData);
    };

    const handleInputChange = (e, field) => {
        const value = e.target.value;

        // Validate input
        if (!regex.test(value)) {
            if (field === 'email') {
                setEmailWarning("Invalid email! Only allowed characters: !, @, #, +, -, .");
            } else if (field === 'password') {
                setPasswordWarning("Invalid password! Only allowed characters: !, @, #, +, -, .");
            }

            // Remove invalid characters
            const validValue = value.replace(/[^a-zA-Z0-9!@#+-.]/g, '');
            form.setValue(field, validValue);
        } else {
            // Clear warning if the value is valid
            if (field === 'email') {
                setEmailWarning("");
            } else if (field === 'password') {
                setPasswordWarning("");
                checkPasswordStrength(value); // Check strength on valid input
            }
            form.setValue(field, value);
        }
    };

    return (
        <div>
            <h1 className="text-xl font-bold text-center pb-3">Create New Account</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className="border w-full border-gray-700 p-5"
                                        placeholder="Full Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className="border w-full border-gray-700 p-5"
                                        placeholder="Email"
                                        {...field}
                                        onChange={(e) => handleInputChange(e, 'email')}
                                    />
                                </FormControl>
                                <FormMessage />
                                {emailWarning && <div className="text-red-500 text-sm">{emailWarning}</div>}
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="password"
                                        className="border w-full border-gray-700 p-5"
                                        placeholder="Password"
                                        {...field}
                                        onChange={(e) => handleInputChange(e, 'password')}
                                    />
                                </FormControl>
                                <FormMessage />
                                <div className={`mt-2 text-sm ${passwordStrength === 'Weak' ? 'text-red-500' : passwordStrength === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>
                                    Password Strength: {passwordStrength}
                                </div>
                                {passwordWarning && <div className="text-red-500 text-sm">{passwordWarning}</div>}
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirm_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="password"
                                        className={`border w-full border-gray-700 p-5 ${isMatch ? '' : 'border-red-500'}`} // Highlight mismatch
                                        placeholder="Confirm Password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                {!isMatch && <div className="mt-2 text-red-500 text-sm">Passwords do not match</div>}
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full py-5" disabled={!isMatch || emailWarning || passwordWarning}>
                        Submit
                    </Button>

                </form>
            </Form>
        </div>
    );
};

export default SignupForm;
