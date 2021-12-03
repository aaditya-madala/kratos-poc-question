import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationUrl: string = 'http://127.0.0.1:4433/self-service/registration/browser';
  registrationFlowObject$: Observable<any>;
  form: FormGroup;
  response: any;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder) {
    this.registrationFlowObject$ = this.http.get<any>(this.registrationUrl);
    this.form = this.fb.group({
      'csrf_token': [''],
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  submitForm(url: string) {
    var formData: any = new FormData();
    formData.append("csrf_token", this.form.get('csrf_token')?.value);
    formData.append("traits.email", this.form.get('email')?.value);
    formData.append("password", this.form.get('password')?.value);
    formData.append("traits.name.first", this.form.get('firstName')?.value);
    formData.append("traits.name.last", this.form.get('lastName')?.value);
    formData.append("method", 'password');

    this.http.post(url, formData).subscribe((response: any) => {
      this.response = response;
    });
  }

}
