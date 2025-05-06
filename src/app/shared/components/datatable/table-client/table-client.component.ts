import {
    Component,
    ContentChild,
    ContentChildren,
    Input,
    QueryList,
    SimpleChanges,
    ViewChild,
} from "@angular/core";
import {
    ColumnMode,
    SortType,
    DataTableColumnDirective,
    DatatableComponent,
    DatatableRowDetailDirective,
    SelectionType,
    TableColumn,
} from "@swimlane/ngx-datatable";
import { Page } from "../page.model";

@Component({
    selector: "app-table-client",
    templateUrl: "./table-client.component.html",
    styleUrl: "./table-client.component.scss",
    standalone: false,
})
export class TableClientComponent {
    @Input() rows: any[] = [];
    @Input() sortable = true;
    @Input() pagination: boolean = true;
    @Input() page = new Page();
    pageSizes = Array.from(Array(20).keys()).map((v, i) => 10 + i * 10);
    messages = {
        totalMessage: "รายการ",
        emptyMessage: `
      <div class="text-center text-secondary">
        <span>ไม่พบข้อมูล</span>
      </div>
    `,
    };
    columnMode = ColumnMode;
    sortType = SortType;
    selectionType = SelectionType;

    @ViewChild(DatatableComponent, { static: true })
    datatable!: DatatableComponent;
    @ContentChildren(DataTableColumnDirective)
    columns!: QueryList<DataTableColumnDirective<any>>;
    @ContentChild(DatatableRowDetailDirective, { static: false })
    rowDetail!: DatatableRowDetailDirective;

    ngOnInit() {
        if (!this.pagination) this.page = { index: 0 } as Page;
        else if (!this.page) this.page = new Page();

        const hasSize = this.pageSizes.find(
            (value) => value === Number(this.page.size),
        );
        if (!hasSize && Number(this.page.size) % 10 !== 0) {
            this.pageSizes.push(Number(this.page.size));
            this.pageSizes.sort((a, b) => a - b);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["page"]) {
            this.onPage({ offset: this.page.index });
        }
    }

    ngAfterContentInit() {
        this.datatable.columns = this.columns.map(
            (column) =>
                ({
                    cellTemplate: column.cellTemplate,
                    headerTemplate: column.headerTemplate,
                    name: column.name,
                    prop: column.prop,
                    flexGrow: column.flexGrow,
                    canAutoResize: column.canAutoResize,
                    resizeable: column.resizeable,
                    sortable: column.sortable,
                    draggable: column.draggable,
                    width: column.width,
                    headerClass: column.headerClass,
                    cellClass: column.cellClass,
                    headerCheckboxable: column.headerCheckboxable,
                    checkboxable: column.checkboxable,
                } as TableColumn),
        );
        this.datatable.rowDetail = this.rowDetail;
    }

    onPageSize(value: any) {
        this.page.index = 0;
        this.page.size = Number(value);
    }

    onPage(event: { offset: any }, focus?: boolean): void {
        this.page.index = event.offset;
        this.datatable.offset = this.page.index;
    }
}
