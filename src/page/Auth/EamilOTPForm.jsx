import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';

import { useNavigate } from 'react-router-dom';
import { verifyOtp } from '@/State/Auth/Action';

const EmailOTPForm = () => {
    const [value, setValue] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = () => {
        console.log("Submitted OTP:", value);
        dispatch(verifyOtp(value, navigate)); // dispatch verifyOtp with OTP and navigate
    };

    return (
        <div className="flex justify-center">
            <div className="space-y-5 mt-10 w-full">
                <Dialog>
                    <DialogTrigger>
                        <Button>Send OTP</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Enter OTP</DialogTitle>
                        </DialogHeader>
                        <div className="py-5 flex gap-10 justify-center items-center">
                            <InputOTP 
                                value={value}
                                onChange={(val) => setValue(val)}
                                maxLength={6}
                            >
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                            <Button onClick={handleSubmit} className="w-[10rem]">
                                Submit
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default EmailOTPForm;
