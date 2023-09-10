import { Component , OnInit , ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthServiceService } from '../auth-service.service';
import { MatDatepicker } from '@angular/material/datepicker';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  formGroup: FormGroup= new FormGroup({
    email: new FormControl('',[Validators.required]),
    loginPassword: new FormControl('',[Validators.required]),
    employeeCode: new FormControl('',[Validators.required]),
    fullName: new FormControl('',[Validators.required]),
    designation: new FormControl('',[Validators.required]),
    mobileNumber: new FormControl('',[Validators.required]),
    dateOfBirth: new FormControl('',[Validators.required]),
    dateOfJoining: new FormControl('',[Validators.required]),
    availableStatus: new FormControl('',[Validators.required])
  });
  @ViewChild('dobPicker') dobPicker!: MatDatepicker<any>;
  @ViewChild('dojPicker') dojPicker!: MatDatepicker<any>;
  statuses = [
    { value: 'Active', viewValue: 'Active' },
    { value: 'Inactive', viewValue: 'Inactive' }
  ];
  constructor(private authService: AuthServiceService) {}
  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.formGroup = new FormGroup({
      email: new FormControl('',[Validators.required]),
      loginPassword: new FormControl('',[Validators.required]),
      employeeCode: new FormControl('',[Validators.required]),
      fullName: new FormControl('',[Validators.required]),
      designation: new FormControl('',[Validators.required]),
      mobileNumber: new FormControl('',[Validators.required]),
      dateOfBirth: new FormControl('',[Validators.required]),
      dateOfJoining: new FormControl('',[Validators.required]),
      availableStatus: new FormControl('',[Validators.required])
    })
  }
  registerProcess(){
    if(this.formGroup.valid){
      this.authService.register(this.formGroup.value).subscribe(result =>{
        if(result.success){
          console.log(result);
          alert(result.message);
        }else{
          alert(result.message);
        }
      })
    }
  }
}
