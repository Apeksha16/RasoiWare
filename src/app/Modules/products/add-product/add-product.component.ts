import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  public mrp: number = 0;
  categories: string[] = [];
  prdCategory: string = '';
  categoryData: any;
  subCategories: string[] = [];
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

  public productForm: FormGroup;

  constructor(
    private productService: ProductsService,
    private fb: FormBuilder,
    private elementRef: ElementRef
  ) {
    this.fetchAllCategory();

    this.productForm = fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      mrp: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])],
      isDiscount: [false, Validators.required],
      discount: [{ value: '', disabled: true }, Validators.compose([Validators.pattern('^[1-9][0-9]{0,2}$'), Validators.min(1), Validators.max(1000)])],
      stock: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])],
      description: ['', Validators.required],
      images: [null, [Validators.required, this.validateImageFiles]],
      specifications: ['', Validators.required]
    });

    // this.productForm.get('isDiscount')?.valueChanges.subscribe(checked => {
    //   const numericFieldControl:FormControl = this.productForm.get('isDiscount') as FormControl;
    //   if (checked) {
    //     numericFieldControl.enable();
    //     numericFieldControl.setValidators([Validators.required]);
    //   } else {
    //     numericFieldControl.disable();
    //     numericFieldControl.clearValidators();
    //   }
    //   numericFieldControl.updateValueAndValidity();
    // });

  }
  changeInDiscount(_event: any) {
    const discountControl = this.productForm.get('discount') as FormControl;
    discountControl.reset();
    if(this.productForm.get('isDiscount')?.value)
    {
      discountControl.enable();
      discountControl.setValidators(Validators.compose([Validators.required,Validators.pattern('^[1-9][0-9]{0,2}$'), Validators.min(1), Validators.max(1000)]));
    }
    else {
      discountControl.disable();
      discountControl.clearValidators();
    }
    discountControl.updateValueAndValidity();
  }

  onSubmit() {
    console.log(this.productForm);
  }

  onInputChange(event: any): void {
    const input = event.target.value;
    const cleanedInput = this.removeSpecialCharacters(input);
    event.target.value = cleanedInput;
  }

  onPaste(event: ClipboardEvent): void {
    const pastedText = event?.clipboardData?.getData('text/plain');
    const cleanedInput = this.removeSpecialCharacters(pastedText);
    const inputElement = this.elementRef.nativeElement.querySelector('input');
    setTimeout(() => {
      inputElement.value = cleanedInput;
    });
    event.preventDefault();
  }

  removeSpecialCharacters(input: any): string {
    return input.replace(/[^a-zA-Z0-9_\s%]/g, '');
  }

  onFileChange(event: any): void {
    const files = event.target.files;
    this.productForm.patchValue({ imageFiles: files });
  }

  validateImageFiles(control: FormControl): { [key: string]: any } | null {
    const files:any[] = control.value;
    if (files && files.length > 5) {
      return { maxFiles: true };
    }
    if (control.value != null && control.value != undefined)
    {
      for (const file of files) {
        if (!file.type.startsWith('image/')) {
          return { fileType: true };
        }
        if (file.size > 1048576) {
          return { fileSize: true };
        }
      }
      }
    return null;
  }

  fetchAllCategory() {
    this.productService.fetchAllCategories().then(res => {
      console.log(res);
      const categories: string[] = [];
      if(res.length)
      {
        res.forEach((res, i) => {
          categories.push(res.id);
        })
        this.categories = categories;
      }
      this.categoryData = res;
    }).catch((e) => {
      console.log(e)
    })
  }

  onSelectCategory(event:any) {
    this.prdCategory = event.value;
    this.categoryData.map((x:any) => {
      if (x.id === this.prdCategory) {
        this.subCategories = Object.keys(x.data);
      }
    })
    console.log(this.subCategories);
  }

  onSelectSubCategory(event:any) {
    this.categoryData.map((x: any) => {
      if (x.id === this.prdCategory)
      {
          console.log(x.data[event.value]);
      }
    })
  }

}

