import {AuthInfoResponse} from "@/logic/domain/api/response/AuthInfo";

export type AuthInfoResult  =
    | { status: 'success'; data:  AuthInfoResponse }
    | { status: 'unauthorized' };