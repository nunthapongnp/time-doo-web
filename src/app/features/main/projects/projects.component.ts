import { Component, TemplateRef } from "@angular/core";
import { ProjectsService, Project } from "./projects.service";
import { RouterLink } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { emptyTextValidator } from "../../../shared/validators/empty-text.validator";
import { TranslateModule } from "@ngx-translate/core";

@Component({
    selector: "app-projects",
    imports: [SharedModule, RouterLink, ReactiveFormsModule, TranslateModule],
    templateUrl: "./projects.component.html",
    styleUrl: "./projects.component.scss",
    providers: [BsModalService],
})
export class ProjectsComponent {
    constructor(
        private fb: FormBuilder,
        private projectService: ProjectsService,
        private modalService: BsModalService,
    ) {}

    modalRef?: BsModalRef;
    projects: Project[] = [];
    form!: FormGroup;

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
            console.log(this.form.value);
        }
    }
}
