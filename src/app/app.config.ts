import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideAnimations } from "@angular/platform-browser/animations";
import { routes } from "./app.routes";
import {
    HTTP_INTERCEPTORS,
    provideHttpClient,
    withInterceptorsFromDi,
} from "@angular/common/http";
import { JwtInterceptor } from "./core/interceptors/jwt.interceptor";
import { provideToastr } from "ngx-toastr";
import { provideTranslateService } from "@ngx-translate/core";
import { provideI18n } from "./core/i18n/i18n.module";

export const appConfig: ApplicationConfig = {
    providers: [
        provideTranslateService(),
        provideI18n(),
        provideAnimations(), // required animations providers
        provideToastr(), // Toastr providers
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true,
        },
    ],
};
