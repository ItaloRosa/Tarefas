import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

const DEMO_PARAMS = {
  EMAIL: 'hello@balta.io',
  PASSWORD: '1234',
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AppMaterialModule],
  providers: [UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  errors: any = [];
  loading = false;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: [
        DEMO_PARAMS.EMAIL,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      pass: [
        DEMO_PARAMS.PASSWORD,
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
