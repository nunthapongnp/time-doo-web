import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { RouterModule } from "@angular/router";
import { TableComponent } from "./components/datatable/table/table.component";
import { TableClientComponent } from "./components/datatable/table-client/table-client.component";
import {
    ColumnChangesService,
    NgxDatatableModule,
} from "@swimlane/ngx-datatable";
import { FormatDatePipe } from "./pipes/format-date.pipe";
import { TranslateModule } from "@ngx-translate/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BsModalService } from "ngx-bootstrap/modal";

@NgModule({
    declarations: [
        FormatDatePipe,
        SidebarComponent,
        TableComponent,
        TableClientComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgxDatatableModule,
        TranslateModule,
        ReactiveFormsModule,
    ],
    providers: [ColumnChangesService, BsModalService],
    exports: [
        CommonModule,
        RouterModule,
        NgxDatatableModule,
        FormatDatePipe,
        SidebarComponent,
        TableComponent,
        TableClientComponent,
        TranslateModule,
        ReactiveFormsModule,
    ],
})
export class SharedModule {}
