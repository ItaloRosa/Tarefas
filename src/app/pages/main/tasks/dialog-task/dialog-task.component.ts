import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import moment from 'moment';
import { TaskModel } from '../model/task.model';

@Component({
  selector: 'app-dialog-task',
  templateUrl: './dialog-task.component.html',
  styleUrl: './dialog-task.component.scss'
})
export class DialogTaskComponent implements OnInit {

  form: FormGroup = this.initForm();
  editTask = false;
  loading = false;
  addOnBlur = true;
  tags: Array<string> = [];
  announcer = inject(LiveAnnouncer);
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public taskData: TaskModel,
  ) {
    if(!taskData) this.editTask = true;
  }

  ngOnInit(): void {
    if (this.taskData.id) {
      this.form = this.initForm(this.taskData)
      this.tags = this.taskData.tags;
    }
  }

  initForm(taskData?: TaskModel): FormGroup {
    return this.fb.group({
      titulo: [
        (taskData?.titulo ? taskData.titulo : ''),
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      descricao: [
        (taskData?.descricao ? taskData.descricao : ''),
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(600),
        ]),
      ],
      responsavel: [
        (taskData?.responsavel ? taskData.responsavel : ''),
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(30),
        ]),
      ],
      status: [
        (taskData?.status ? taskData.status : ''),
        Validators.compose([
          Validators.required,
        ]),
      ],
    });
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.form.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`Removed ${tag}`);
    }
  }

  edit(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(tag);
      return;
    }

    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index] = value;
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    const taskData: TaskModel = this.form.getRawValue();
    taskData.tags = this.tags;

    if (!this.taskData) {
      taskData.dataCriacao = moment().format();
    } else {
      taskData.id = this.taskData.id;
    }

    this.dialogRef.close(taskData);
  }

}
