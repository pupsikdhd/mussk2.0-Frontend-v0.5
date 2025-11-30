
import {StartEnablingTOTPResponse} from "@/logic/domain/api/response/TOTPEnabling";

export type StartEnablingTOTPResult =
    | { status: 'success'; data: StartEnablingTOTPResponse }
    | { status: 'unauthorized' };