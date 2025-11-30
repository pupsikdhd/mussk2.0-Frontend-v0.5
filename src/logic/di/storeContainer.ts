// di/storeContainer.ts
import { container } from "tsyringe";
import {FingerPrintState} from "@/logic/infrastructure/fingerprint/fingerPrint.state";
import {AuthState} from "@/logic/infrastructure/auth/state/auth.state";

container.register(FingerPrintState, {useClass: FingerPrintState});
container.register(AuthState, {useClass: AuthState});

export { container };