import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  public mrp: number = 0;

  categories: string[] = [
    'Computer',
    'PowerBank',
    'Mobile Phones',
    'Headphones',
    'Pen Drives',
  ];
  subCategories: string[] = [
    'Samsung',
    'Apple',
    'Vivo',
    'Motorola',
    'BlackBerry',
  ];
  genders: string[] = [
    'Male',
    'Female',
  ];
  brands: string[] = [
    'WonderChef',
    'Borosil',
    'Nike',
    'Puma',
    'Adidas',
  ];

  sizes: string[] = [
    '28',
    '30',
    '32',
    '34',
    '38',
  ];
}

