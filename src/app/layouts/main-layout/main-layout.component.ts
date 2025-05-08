import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { I18nModule } from "../../core/i18n/i18n.module";
import { setTheme } from "ngx-bootstrap/utils";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-main-layout",
    imports: [RouterOutlet, SharedModule, I18nModule],
    templateUrl: "./main-layout.component.html",
    styleUrl: "./main-layout.component.scss",
})
export class MainLayoutComponent {
    constructor(private translate: TranslateService) {
        setTheme("bs5");
        this.translate.use(localStorage.getItem("lang") ?? "th");
    }
}
