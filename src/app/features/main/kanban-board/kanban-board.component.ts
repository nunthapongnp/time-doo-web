import { Component } from "@angular/core";
import { Column, KanbanBoardService, Task } from "./kanban-board.service";
import { SharedModule } from "../../../shared/shared.module";
import { ActivatedRoute } from "@angular/router";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { emptyTextValidator } from "../../../shared/validators/empty-text.validator";

@Component({
    selector: "app-kanban-board",
    imports: [SharedModule],
    templateUrl: "./kanban-board.component.html",
    styleUrl: "./kanban-board.component.scss",
})
export class KanbanBoardComponent {
    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private kanbanBoardService: KanbanBoardService,
    ) {}

    projectId = 0;
    columns: Column[] = [];
    form!: FormGroup;

    get columnsForm() {
        return this.form.get("columns") as FormArray;
    }

    getTasksForm(columnIndex: number) {
        return this.columnsForm.at(columnIndex).get("tasks") as FormArray;
    }

    ngOnInit() {
        this.createForm();
        this.projectId = Number(this.route.snapshot.paramMap.get("projectId"));
        this.loadData(this.projectId);
    }

    loadData(projectId: number) {
        this.kanbanBoardService
            .getColumnsWithTasksByProject(projectId ?? 0)
            .subscribe((res) => {
                this.columns = res.data;
                this.columns.forEach((col) => {
                    this.columnsForm.push(this.createColumnForm(col));
                });
            });
    }

    createForm() {
        this.form = this.fb.group({
            columns: this.fb.array([]),
        });
    }

    createColumnForm(column: Column) {
        return this.fb.group({
            id: [column.id],
            projectId: [column.projectId],
            name: [
                column.name,
                [
                    Validators.required,
                    Validators.maxLength(100),
                    emptyTextValidator,
                ],
            ],
            position: [column.position],
            tasks: this.fb.array(
                column.tasks.map((task) => this.createTaskForm(task)),
            ),
        });
    }

    createTaskForm(task: Task) {
        return this.fb.group({
            id: [task.id],
            projectId: [task.projectId],
            columnId: [task.columnId],
            title: [
                task.title,
                [
                    Validators.required,
                    Validators.maxLength(250),
                    emptyTextValidator,
                ],
            ],
            description: [task.description, [Validators.maxLength(250)]],
            assigneeId: [task.assigneeId],
            dueDate: [task.dueDate],
            position: [task.position],
        });
    }

    addColumn() {
        let column = {
            id: 0,
            projectId: this.projectId,
            position: this.columnsForm.length + 1,
            tasks: [] as Task[],
        } as Column;
        this.columnsForm.push(this.createColumnForm(column));
    }

    saveColumn(columnIndex: number) {
        let column = this.columnsForm.at(columnIndex);
        if (column.valid) {
            this.kanbanBoardService
                .addColumn(this.projectId, column.value)
                .subscribe(
                    (res) => {
                        column.patchValue(res.data);
                        this.toastr.success(
                            "column has been created",
                            "Success!",
                        );
                    },
                    (err) => {
                        this.toastr.error(
                            err.error.error,
                            "Failed to create column!",
                        );
                    },
                );
        }
    }

    removeColumn(columnIndex: number) {
        this.columnsForm.removeAt(columnIndex);
    }

    addTask(columnIndex: number) {
        let task = {
            id: 0,
            projectId: this.columnsForm.at(columnIndex).value.projectId,
            columnId: this.columnsForm.at(columnIndex).value.id,
            position: this.getTasksForm(columnIndex).length + 1,
        } as Task;
        this.getTasksForm(columnIndex).push(this.createTaskForm(task));
    }

    saveTask(columnIndex: number, taskIndex: number) {
        let task = this.getTasksForm(columnIndex).at(taskIndex);
        if (task.valid) {
            this.kanbanBoardService
                .addTask(this.columnsForm.at(columnIndex).value.id, task.value)
                .subscribe(
                    (res) => {
                        task.patchValue(res.data);
                        this.toastr.success(
                            "task has been created",
                            "Success!",
                        );
                    },
                    (err) => {
                        this.toastr.error(
                            err.error.error,
                            "Failed to create task!",
                        );
                    },
                );
        }
    }

    removeTask(columnIndex: number, taskIndex: number) {
        this.getTasksForm(columnIndex).removeAt(taskIndex);
    }

    haveNewColumn() {
        return this.columnsForm.controls.some(
            (x) => !x.value.id || !(x.value.id > 0),
        );
    }

    haveNewTask(columnIndex: number) {
        return this.getTasksForm(columnIndex).controls.some(
            (x) => !x.value.id || !(x.value.id > 0),
        );
    }
}
