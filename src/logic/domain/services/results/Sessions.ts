import {SessionResponse} from "@/logic/domain/api/response/Session";

export type SessionsResult =
    | { status: 'success'; data: SessionResponse[] }
    | { status: 'unauthorized' };

