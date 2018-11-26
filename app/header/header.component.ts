import { Component, OnInit } from '@angular/core';
import { PageBoolService } from '../page-bool.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  message: boolean;
  buttonText = "About";

  constructor(private data: PageBoolService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
  }

  newBool() {
    this.message = !this.message;

    if (this.message === false){
      this.buttonText = "Back";
    } else {
      this.buttonText = "About";
    }
    
    this.data.changeBool(this.message);
  }


}
