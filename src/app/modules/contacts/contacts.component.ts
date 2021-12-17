import { Component } from '@angular/core';

@Component({
  selector: 'flower-valley-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  public photos = [
    'assets/images/mocks/contacts/1.png',
    'assets/images/mocks/contacts/2.png',
    'assets/images/mocks/contacts/3.png',
    'assets/images/mocks/contacts/4.png',
    'assets/images/mocks/contacts/5.png',
    'assets/images/mocks/contacts/6.png',
  ];
}