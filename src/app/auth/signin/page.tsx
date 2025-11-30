
import LoginForm from "@/app/auth/signin/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title:"Вход",
    description:"MUSSK"
}
export default function Login(){
    return (
        <LoginForm/>
    )
}