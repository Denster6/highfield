import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HighfieldService } from '../services/highfield.service';
import { IUserData } from '../models/userdata';
import { TableModule } from 'primeng/table';

@Component({
  standalone: true,
  imports: [TableModule,DatePipe],
  templateUrl: './users.component.html',
  styleUrl:'./users.component.css'
})
export class UsersComponent implements OnInit{
  public pageTitle = 'Users';
  userData! : IUserData[];
  totalAge: number = 0;

  constructor(
    private service: HighfieldService
    )
  {}

  async ngOnInit() {
    await this.getData();
  }

  async getData(){
    const data = await this.service.getData();
    if(data != null)
    {
      this.userData = data;
      this.userData.map(x => x.age = this.getAge(x.dob))
    }else{
      this.userData = [];
    }  
  }

  getAge(dob: Date)
  {
    var todayDate=new Date();
    var dob = new Date(dob);
    var age = todayDate.getFullYear() - dob.getFullYear();
    if(todayDate.getMonth() < dob.getMonth())
      {
        age--
      }
    if(todayDate.getMonth() == dob.getMonth() && (todayDate.getDate() < dob.getDate()))
      {
        age--
      }
      this.totalAge+= age
    return age
  }
}
