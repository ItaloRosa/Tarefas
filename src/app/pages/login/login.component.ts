import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { UserInterface } from '../../interfaces/user.interface';
import { UserService } from '../../services/user/user.service';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AppMaterialModule],
  providers: [UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.initLoginForm();
  }

  ngOnInit(): void {
    this.userService.deslogar();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      pass: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.loginForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  submit() {
    if (this.loginForm.invalid) return;
    const usuario = this.loginForm.getRawValue() as UserInterface;

    this.userService.logar(usuario).subscribe((response) => {
      if (!response.sucesso) {
        this.alert();
      }
    });
  }

  private alert() {
    Swal.fire({
      icon: 'error',
      title: 'Falha na autenticação',
      text: 'Usuário ou senha incorretos.',
    });
  }
}
