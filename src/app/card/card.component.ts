import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  cards = [
    { imageUrl: 'assets/appliances.png', category: 'Appliances' },
    { imageUrl: 'assets/cooking.png', category: 'Cooking' },
    { imageUrl: 'assets/cutlery.png', category: 'Cutlery' },

  ];

}
