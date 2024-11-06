import React from 'react';
import { useForm } from 'react-hook-form';
import { encryptData } from '@/utils/cryptoUtils';
import { forgotPassword } from '@/State/Auth/Action';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LoadingSpinner from '@/components/LoadingSpinner';


const ForgotPasswordForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector(state => state.auth);

    const form = useForm({
        defaultValues: {
            email: "",           
        }
    });

    const onSubmit = (data) => {
        const encryptedData = { email: encryptData(data.email) };
        dispatch(forgotPassword(encryptedData, navigate));
        console.log("Data", encryptedData);
    };

    return (
        <div>
            <h1 className="text-xl font-bold text-center pb-3">Forgot Password</h1>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            className="border w-full border-gray-700 p-5"
                                            placeholder="Enter your Email" {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full py-5">
                            Submit
                        </Button>
                    </form>
                </Form>
            )}
        </div>
    );
};

export default ForgotPasswordForm;
