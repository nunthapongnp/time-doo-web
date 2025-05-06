import { NgModule } from "@angular/core";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { AppTranslateLoader } from "./translate-loader";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

export function createTranslateLoader(http: HttpClient, path: string) {
    return new AppTranslateLoader(http, path);
}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "/api/v1/locale/", "");
}

@NgModule({
    exports: [TranslateModule],
})
export class I18nModule {
    static forPath(path: string) {
        return TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient) =>
                    createTranslateLoader(http, path),
                deps: [HttpClient],
            },
        });
    }

    static forRoot() {
        return TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        });
    }
}

export function provideI18n() {
    return [
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient) =>
                    createTranslateLoader(http, ""),
                deps: [HttpClient],
            },
        }).providers!,
    ];
}
