import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Input("message") message: string = "";
  @Input("title") title: string | undefined;
  @Input("displayStyle") displayStyle = "none";

  constructor() {
  }

  ngOnInit(): void {
  }

  closePopup() {
    this.displayStyle = "none";
  }
}
