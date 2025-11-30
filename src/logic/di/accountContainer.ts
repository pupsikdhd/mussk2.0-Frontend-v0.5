// di/accountContainer.ts
import { container } from "tsyringe";

import {SessionsApiService} from "@/logic/infrastructure/auth/sessions/sessions.api";
import {SessionsService} from "@/logic/services/auth/sessions.service";
import {AuthApiService} from "@/logic/infrastructure/auth/auth.api";
import {AuthService} from "@/logic/services/auth/Auth.service";
import { TOTPService } from "../services/auth/totp.service";
import { ProfileService } from "../services/Profile/profile.service";
import {ProfileApiService} from "@/logic/infrastructure/profile/profile.api";


container.registerSingleton(SessionsApiService);
container.registerSingleton(SessionsService);
container.registerSingleton(TOTPService);

container.registerSingleton(ProfileService);
container.registerSingleton(ProfileApiService);

container.registerSingleton(AuthApiService);
container.registerSingleton(AuthService);

export { container };
