import { Component , OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import {DexieService} from '../service/dexie.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private dexieService: DexieService) {
  }

  addForm: FormGroup = new FormGroup({}); //new FormGroup, Bugfix for Angular version 16.0.0
  userExists: boolean = false; // for showing error messages

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      salary: ['', Validators.required]
    });

  }

  onSubmit() {
    this.userService.createUser(this.addForm.value).subscribe(
      (data) => alert(data.message),
      (error) => {
        //TODO Insert random Database id or uuid
        this.addForm.value.id = 100;
        console.log(this.addForm.value);
        this.dexieService.users.put(this.addForm.value).then(
          (success) => console.log("Offline: Saving product to database"),
          (error) => console.error(error)
        )
      }
    );
  }
}
