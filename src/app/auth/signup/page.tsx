import {Metadata} from "next";
import RegisterPage from "@/app/auth/signup/RegisterForm";

export const metadata: Metadata = {
    title: 'Регистрация',
}
export default function SignUp() {
    return<>
        <RegisterPage/>
    </>
}