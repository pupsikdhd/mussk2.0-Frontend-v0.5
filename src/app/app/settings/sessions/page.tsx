import {Metadata} from "next";
import {SessionsPage} from "@/app/app/settings/sessions/SessionPage";

export const metadata: Metadata = {
    title:"Сессии",
    description:"MUSSK"
}

export default function Sessions(){
    return<>
        <SessionsPage/>
    </>
}