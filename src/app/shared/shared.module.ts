import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { RouterModule } from "@angular/router";
import { TableClientComponent } from "./components/datatable/table-client/table-client.component";
import {
    ColumnChangesService,
    NgxDatatableModule,
} from "@swimlane/ngx-datatable";
import { FormatDatePipe } from "./pipes/format-date.pipe";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsModalService } from "ngx-bootstrap/modal";
import { ConfirmModalComponent } from "./components/modal/confirm-modal/confirm-modal.component";
import { NgSelectModule, NgDropdownPanelService } from "@ng-select/ng-select";
import { SelectComponent } from "./components/select/select.component";

@NgModule({
    declarations: [
        FormatDatePipe,
        SidebarComponent,
        TableClientComponent,
        ConfirmModalComponent,
        SelectComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgxDatatableModule,
        TranslateModule,
        ReactiveFormsModule,
        NgSelectModule,
        FormsModule,
    ],
    providers: [ColumnChangesService, BsModalService, NgDropdownPanelService],
    exports: [
        CommonModule,
        RouterModule,
        NgxDatatableModule,
        FormatDatePipe,
        SidebarComponent,
        TableClientComponent,
        TranslateModule,
        ReactiveFormsModule,
        ConfirmModalComponent,
        NgSelectModule,
        FormsModule,
        SelectComponent,
    ],
})
export class SharedModule {}
