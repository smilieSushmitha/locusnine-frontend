import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserService} from '../_services/user.service';
import {UserModel} from '../_models/user.model';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  isEditUser = false;
  user: UserModel;
  addEditUserForm: FormGroup;
  constructor(private userService: UserService,
              public dialogRef: MatDialogRef<AddEditUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.addEditUserForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      isAdmin: new FormControl('true', [Validators.required]),
      mobileNumber: new FormControl('')
    });
  }

  ngOnInit() {
      console.log(this.data);
      if (this.data) {
        this.isEditUser = true;
        this.userService.getUser(this.data.id).subscribe(user => {
          this.user = user;
          this.addEditUserForm.setValue({
            name: this.user.name,
            email: this.user.email,
            isAdmin: this.user.isAdmin.toString(),
            mobileNumber: this.user.mobileNumber
          });
        }, err => {
          console.log(err);
        });
        // this.addEditUserForm.controls['email'].setValue(this.user.email);
        console.log('from edit user');
      } else {
        console.log('from add user');
      }
  }
 close() {
    this.dialogRef.close();
 }
 addUser() {
    this.userService.createUser(this.addEditUserForm.value)
      .subscribe();
    this.dialogRef.close();
 }
  editUser() {
    this.userService.editUser(this.data.id, this.addEditUserForm.value)
      .subscribe();
    this.dialogRef.close();
  }

}
