import { Component, OnInit } from '@angular/core';
import  { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // the messageService property must be public because you're about to bind to it in the template.
  //##### NOTE: Angular only binds to public component properties. #######
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
