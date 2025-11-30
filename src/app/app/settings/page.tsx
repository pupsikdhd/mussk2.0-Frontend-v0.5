import {Metadata} from "next";
import SettingsPage from "@/app/app/settings/SettingsPage";

export const metadata : Metadata = {
    title :"Настройки"
};

export default function Settings(){
    return <>
        <SettingsPage/>
    </>
}