import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@src/@/components/ui/input-otp";

export default function OTP({ value, onChange }) {
    const handleChange = (event) => {
        // console.log(event); 
        if (typeof onChange === "function") {
            onChange(event);
        }
    };
    return (
        <InputOTP
            maxLength={6}
            value={value}
            onChange={onChange}
            pattern={REGEXP_ONLY_DIGITS}
        >
            <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
            </InputOTPGroup>
        </InputOTP>
    );
}
