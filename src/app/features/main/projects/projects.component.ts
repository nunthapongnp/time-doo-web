import { Component, TemplateRef } from "@angular/core";
import { ProjectsService, Project } from "./projects.service";
import { SharedModule } from "../../../shared/shared.module";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { emptyTextValidator } from "../../../shared/validators/empty-text.validator";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-projects",
    imports: [SharedModule],
    templateUrl: "./projects.component.html",
    styleUrl: "./projects.component.scss",
})
export class ProjectsComponent {
    constructor(
        private fb: FormBuilder,
        private projectService: ProjectsService,
        private modalService: BsModalService,
        private toastr: ToastrService,
    ) {}

    modalRef?: BsModalRef;
    projects: Project[] = [];
    form!: FormGroup;
    deletePorjectId = 0;

    ngOnInit() {
        this.createForm();
        this.loadData();
    }

    createForm() {
        this.form = this.fb.group({
            name: [
                "",
                [
                    Validators.required,
                    Validators.maxLength(250),
                    emptyTextValidator,
                ],
            ],
            description: ["", [Validators.maxLength(250)]],
        });
    }

    loadData() {
        this.projectService.getAllProjects().subscribe((res) => {
            this.projects = res.data;
        });
    }

    openModalAddProject(template: TemplateRef<void>) {
        this.form.reset();
        this.modalRef = this.modalService.show(template, {
            class: "modal-lg",
            ignoreBackdropClick: true,
            keyboard: false,
        });
    }

    closeModalAddProject() {
        this.modalRef?.hide();
        this.form.reset();
    }

    addProject() {
        if (this.form.valid) {
            this.projectService.addProject(this.form.value).subscribe(
                (res) => {
                    this.loadData();
                    this.toastr.success("project has been created", "Success!");
                },
                (err) => {
                    this.toastr.error(
                        err.error.error,
                        "Failed to create project!",
                    );
                },
            );
            this.closeModalAddProject();
        }
    }

    setDeleteProjectId(projectId: number) {
        this.deletePorjectId = projectId;
    }

    clearDeleteProjectId() {
        this.deletePorjectId = 0;
    }

    openModalDeleteProject(template: TemplateRef<void>, projectId: number) {
        this.setDeleteProjectId(projectId);
        this.modalRef = this.modalService.show(template, {
            class: "modal-sm",
        });
    }

    closeModalDeleteProject() {
        this.modalRef?.hide();
        this.clearDeleteProjectId();
    }

    deleteProject() {
        this.projectService.deleteProject(this.deletePorjectId).subscribe(
            (_) => {
                this.loadData();
                this.toastr.success("project has been deleted", "Success!");
            },
            (err) => {
                this.toastr.error(err.error.error, "Failed to delete project!");
            },
        );
        this.closeModalDeleteProject();
    }
}
