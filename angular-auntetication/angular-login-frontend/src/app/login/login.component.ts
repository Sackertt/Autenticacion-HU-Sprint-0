import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private router: Router,
    private loginService: LoginService,
  ) {}

  username: string = '';
  password: string = '';
  errorMessage: string = '';
  loggedInUser: string = '';
  loading : boolean = false;

  OnClick() {
    
    this.loading = true;
    if (!this.username || !this.password) {
      // Mostrar mensaje de error y salir temprano si hay campos vacíos
      setTimeout(() => {
        this.loading = false;
        this.showEmptyFieldsError();
      }, 1000);
      
      return;
    };

    this.loginService.userLogin(this.username, this.password).subscribe(
      response => {
        setTimeout(() => {
          this.loading = false;
          this.showSuccessMessage();
        }, 2000);
      },
      error => {
        setTimeout(() => {
          this.loading = false;
          this.showErrorMessage();
        }, 2000);
      },
      
    );
    

    
    
    
  }

  showEmptyFieldsError() {
    const emptyFieldsErrorElement = document.getElementById('emptyFieldsError');
    const errorMessageElement = document.getElementById('errorMessage');
    const successMessageElement = document.getElementById('successMessage');

    if (errorMessageElement) errorMessageElement.style.display = 'none';
    if (successMessageElement) successMessageElement.style.display = 'none';
    if (emptyFieldsErrorElement) emptyFieldsErrorElement.style.display = 'block';
  }

  showSuccessMessage() {
    const errorMessageElement = document.getElementById('errorMessage');
    const successMessageElement = document.getElementById('successMessage');
    const loggedInUserElement = document.getElementById('loggedInUser');
    const emptyFieldsErrorElement = document.getElementById('emptyFieldsError');

    if (errorMessageElement) errorMessageElement.style.display = 'none';
    if (emptyFieldsErrorElement) emptyFieldsErrorElement.style.display = 'none';
    if (successMessageElement) successMessageElement.style.display = 'block';
    if (loggedInUserElement) loggedInUserElement.textContent = this.username;
  }

  showErrorMessage() {
    const errorMessageElement = document.getElementById('errorMessage');
    const successMessageElement = document.getElementById('successMessage');
    const emptyFieldsErrorElement = document.getElementById('emptyFieldsError');

    if (emptyFieldsErrorElement) emptyFieldsErrorElement.style.display = 'none';
    if (successMessageElement) successMessageElement.style.display = 'none';
    if (errorMessageElement) errorMessageElement.style.display = 'block';
  }

  
}
