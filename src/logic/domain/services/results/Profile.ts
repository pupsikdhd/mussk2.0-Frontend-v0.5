import {ProfileResponse} from "@/logic/domain/api/response/Profile";


export type ProfileResult  =
    | { status: 'success'; data:  ProfileResponse }
    | { status: 'notfound' };
