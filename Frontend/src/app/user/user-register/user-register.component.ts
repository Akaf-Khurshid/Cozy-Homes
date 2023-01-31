import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators, FormBuilder } from '@angular/forms';
import { UserForRegister } from 'src/app/model/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registrationForm: FormGroup
  user:UserForRegister;
  userSubmitted: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertifyService: AlertifyService,
  ){}

  ngOnInit(){
    // this.registrationForm = new FormGroup({
    //   userName: new FormControl(null, Validators.required),
    //   email: new FormControl(null, [Validators.required, Validators.email]),
    //   password: new FormControl(null, [Validators.required, Validators.minLength(8), ]),
    //   confirmPassword: new FormControl(null, [Validators.required]),
    //   mobile: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
    // }, this.matchingPasswords);
    this.createRegistrationForm();
  }

  createRegistrationForm(){
    this.registrationForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      mobile: [null, Validators.required],
    }, {validators: this.matchingPasswords})
  }
  // passwordMatchingValidator(fg: FormGroup): Validators{
  //   return fg.get('password')?.value === fg.get('confirmPassword')?.value ? true : {notMatched: true};
  // }

  public matchingPasswords(c: AbstractControl): ValidationErrors | null {
    const password = c.get(['password']);
    const confirmPassword = c.get(['confirmPassword']);

    if (password?.value !== confirmPassword?.value) {
      return { mismatchedPasswords: true };
    }
    return null;
  }

  //getter methods
  get userName(){
    return this.registrationForm.get('userName') as FormControl;
  }

  get email(){
    return this.registrationForm.get('email') as FormControl;
  }

  get password(){
    return this.registrationForm.get('password') as FormControl;
  }

  get confirmPassword(){
    return this.registrationForm.get('confirmPassword') as FormControl;
  }

  get mobile(){
    return this.registrationForm.get('mobile') as FormControl;
  }

  onSubmit(){
    console.log(this.registrationForm);
    this.userSubmitted = true;
    if(this.registrationForm.valid){
      // this.user = Object.assign(this.user, this.registrationForm.value);
      this.authService.registerUser(this.userData()).subscribe( (response: any) =>{
        console.log(response);
        this.registrationForm.reset();
        this.userSubmitted = false;
        this.alertifyService.success('Congrats, you are successfully registered');
      }, error => {
        console.log(error);
        this.alertifyService.error(error.error);
      });
    }
    else{
      this.alertifyService.error('Kindly provide the required fields');
    }
  }

  userData(): UserForRegister{
    return this.user = {
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      mobile: this.mobile.value
    }
  }

}
