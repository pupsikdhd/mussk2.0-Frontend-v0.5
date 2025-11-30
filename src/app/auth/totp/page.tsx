import {Metadata} from "next";
import TOTPForm from "@/app/auth/totp/TOTPForm";


export const metadata: Metadata = {
    title: "Проверка личности",
    description: "MUSSK"
}
export default function TOTP(){
    return <><TOTPForm/></>;
}