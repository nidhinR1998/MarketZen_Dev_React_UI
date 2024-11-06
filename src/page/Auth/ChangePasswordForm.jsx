import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { changePassword } from '@/State/Auth/Action';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { encryptData } from '@/utils/cryptoUtils';
import { useNavigate } from 'react-router-dom';

const ChangePasswordForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const form = useForm({
        defaultValues: {
            password: "",
            confirm_password: "",
        },
    });

    const [passwordStrength, setPasswordStrength] = useState('');
    const [isMatch, setIsMatch] = useState(true);
    const [emailWarning, setEmailWarning] = useState("");
    const [passwordWarning, setPasswordWarning] = useState("");

    const regex = /^[a-zA-Z0-9!@#+-.]*$/;

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

    useEffect(() => {
        const { password, confirm_password } = form.getValues();
        setIsMatch(password === confirm_password);
    }, [form.watch('password'), form.watch('confirm_password')]);

    const onSubmit = (data) => {
        const encryptedData = {
            ...data,
            password: encryptData(data.password),
            confirm_password: encryptData(data.confirm_password),
        };
        dispatch(changePassword(encryptedData, navigate));
        console.log(encryptedData);
    };

    const handleInputChange = (e, field) => {
        const value = e.target.value;

        if (!regex.test(value)) {
            if (field === 'password') {
                setPasswordWarning("Invalid password! Only allowed characters: !, @, #, +, -, .");
            }

            const validValue = value.replace(/[^a-zA-Z0-9!@#+-.]/g, '');
            form.setValue(field, validValue);
        } else {
            if (field === 'password') {
                setPasswordWarning("");
                checkPasswordStrength(value);
            }
            form.setValue(field, value);
        }
    };

    return (
        <div className='h-screen relative authContainer'>
            <div className='absolute top-0 right-0 left-0 bottom-0 bg-[#030712] bg-opacity-50'>
                <div className='bgBlure absolute top-1/2 left-1/2 transform 
                    -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center 
                    items-center h-[35rem] w-[30rem] rounded-md z-50 bg-black 
                    bg-opacity-50 shadow-2xl shadow-white px-10'>
                    <div className="w-full">
                        <h1 className="text-xl font-bold text-center pb-3">Change Password</h1>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
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
                                                    className={`border w-full border-gray-700 p-5 ${isMatch ? '' : 'border-red-500'}`}
                                                    placeholder="Confirm Password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                            {!isMatch && <div className="mt-2 text-red-500 text-sm">Passwords do not match</div>}
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full py-5" disabled={!isMatch || passwordStrength === 'Weak' || passwordWarning}>
                                    Submit
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordForm;
