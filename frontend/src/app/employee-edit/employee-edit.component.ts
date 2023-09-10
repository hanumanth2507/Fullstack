import { Component , OnInit , ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthServiceService } from '../auth-service.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit{
  formGroup: FormGroup= new FormGroup({
    fullName: new FormControl('',[Validators.required]),
    designation: new FormControl('',[Validators.required]),
    mobileNumber: new FormControl('',[Validators.required]),
    availableStatus: new FormControl('',[Validators.required])
  });
  statuses = [
    { value: 'Active', viewValue: 'Active' },
    { value: 'Inctive', viewValue: 'Inctive' }
  ];
  constructor(private authService: AuthServiceService, private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.formGroup = new FormGroup({
      fullName: new FormControl('',[Validators.required]),
      designation: new FormControl('',[Validators.required]),
      mobileNumber: new FormControl('',[Validators.required]),
      availableStatus: new FormControl('',[Validators.required])
    })
  }
  editProcess() {
    if (this.formGroup.valid) {
      const id = this.route.snapshot.paramMap.get('id');
      this.authService.employeesEdit({ id: id, ...this.formGroup.value }).subscribe(result => {
        if (result.success) {
          console.log(result);
          alert(result.message);
        } else {
          alert(result.message);
        }
      });
    }
  }
}
