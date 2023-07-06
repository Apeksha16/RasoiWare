import { Component } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { inject } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface SubCategory {
  name: string;
}

@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.css']
})
export class AddProductCategoryComponent {

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  subcategories: SubCategory[] = [{ name: 'Power Banks' }, { name: 'Mobile Phones' }, { name: 'Laptops' }];

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.subcategories.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(subcategory: SubCategory): void {
    const index = this.subcategories.indexOf(subcategory);

    if (index >= 0) {
      this.subcategories.splice(index, 1);

      this.announcer.announce(`Removed ${subcategory}`);
    }
  }

  edit(fruit: SubCategory, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.subcategories.indexOf(fruit);
    if (index >= 0) {
      this.subcategories[index].name = value;
    }
  }
}

