import {Component, OnInit, ViewChild} from '@angular/core';
import {AddEditUserComponent} from './add-edit-user/add-edit-user.component';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserService} from './_services/user.service';
import {UserModel} from './_models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  users: UserModel[];
  dataSource: MatTableDataSource<UserModel[]>;
  displayedColumns: string[] = ['name', 'email', 'isAdmin', 'status', 'action'];
  status: string[] = ['active', 'pending', 'inactive'];
  title = 'locusnine-project';
  constructor(private userService: UserService,
              private  dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getUserList();
  }

  showModal() {
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      height: '500px',
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(res => this.getUserList());
  }

  getUserList() {
    this.userService.getUsers()
      .subscribe(users => {
        console.log(users);
        this.dataSource = new MatTableDataSource<UserModel[]>(users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.users = users;
      }, err => {
        console.log(err);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editUser(userId) {
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      height: '500px',
      width: '500px',
      data: { id: userId }
      }
    );
    dialogRef.afterClosed().subscribe(res => this.getUserList());
  }

  deleteUser(userId) {
    this.userService.deleteUser(userId).subscribe(res => this.getUserList());
  }


}
