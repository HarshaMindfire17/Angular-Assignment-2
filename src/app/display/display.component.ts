import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  constructor() { }
  @Input() user;
  @Input() url;
  ngOnInit(): void {
    console.log(this.user);
  }
 
}
