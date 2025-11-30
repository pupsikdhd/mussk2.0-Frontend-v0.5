import {Metadata} from "next";
import LogoutPage from "@/app/app/settings/logout/LogoutPage";

export const metadata: Metadata = {
    title:"Выход"
};

export default function Logout(){
    return <>
        <LogoutPage/>
    </>
}