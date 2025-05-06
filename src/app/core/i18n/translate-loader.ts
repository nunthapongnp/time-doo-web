import { TranslateLoader, TranslationObject } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import th from "./th.json";
import en from "./en.json";

export class AppTranslateLoader implements TranslateLoader {
    constructor(private http: HttpClient, private currentPath: string) {}

    getTranslation(lang: string): Observable<TranslationObject> {
        return new Observable((observer) => {
            observer.next(lang === "th" ? th : en);
            observer.complete();
        });
    }
}
