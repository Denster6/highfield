import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { IUserData } from '../models/userdata';
import { HighfieldService } from '../services/highfield.service';
import { IColour } from '../models/colour';

@Component({
  standalone: true,
  imports: [NgFor],
  templateUrl: './report.component.html'
})
export class ReportComponent implements OnInit{
  public pageTitle = 'Favourite Colours';
  userData! : IUserData[];
  colours! : IColour[];
  display! : string[];

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
      const group = data.reduce((acc: any, curr) => {
        let key = curr.favouriteColour;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(curr);
        return acc;
      }, {});

      this.colours = Object.keys(group).map(key => ({
        description: key,
        total: group[key].length
      }));

      this.colours.sort(
        function(a, b) {          
           if (a.total === b.total) {
              return a.description.localeCompare(b.description);
           }
           return b.total > a.total ? 1 : -1;
        });

      }else{
      this.userData = [];
    }  
  }
}
