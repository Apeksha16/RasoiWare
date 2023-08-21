import { Component, ElementRef, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../products.service';
import { GatewayService } from 'src/app/Utils/gateway.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/Utils/utility.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  public mrp: number = 0;
  genders: string[] = ['Male', 'Female'];
  brands: string[] = ['WonderChef', 'Borosil', 'Nike', 'Puma', 'Adidas'];

  sizes: string[] = ['28', '30', '32', '34', '38'];

  categories: string[] = [];
  prdCategory: string = '';
  categoryData: any;
  subCategories: string[] = [];
  public productForm: FormGroup;
  public prdouctId: string = '';
  public brandList: string[] = [];
  public productImages: any[] = [];
  public previewLocalImgs: any[] = [];

  constructor(
    private productService: ProductsService,
    private fb: FormBuilder,
    private router: Router,
    private elementRef: ElementRef,
    private loading: GatewayService,
    private utils: UtilityService
  ) {
    this.fetchAllCategory();
    this.fetchAllBrands();

    this.productForm = fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      mrp: ['', Validators.required],
      isDiscount: [false, Validators.required],
      discount: [
        { value: '', disabled: true },
        Validators.compose([
          Validators.pattern('^[1-9][0-9]{0,2}$'),
          Validators.min(1),
          Validators.max(1000),
        ]),
      ],
      brand: ['', Validators.required],
      stock: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      description: ['', Validators.required],
      specifications: ['', Validators.required],
      coverImage: ['', Validators.required],
    });
  }
  changeInDiscount(_event: any) {
    const discountControl = this.productForm.get('discount') as FormControl;
    discountControl.reset();
    if (this.productForm.get('isDiscount')?.value) {
      discountControl.enable();
      discountControl.setValidators(
        Validators.compose([
          Validators.required,
          Validators.pattern('^[1-9][0-9]{0,2}$'),
          Validators.min(1),
          Validators.max(1000),
        ])
      );
    } else {
      discountControl.disable();
      discountControl.clearValidators();
    }
    discountControl.updateValueAndValidity();
  }

  onInputChange(event: any) {
    const inputElement = event.target;
    const initialValue = inputElement.value;
    const numericValue = initialValue.replace(/[^0-9]/g, '');
    inputElement.value = numericValue;
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

  removeSpecialCharacters(event: any) {
    const inputElement = event.target;
    const initialValue = inputElement.value;
    const numericValue = initialValue.replace(/[^a-zA-Z0-9_\s%]/g, '');
    inputElement.value = numericValue;
  }

  onFileChange(event: any): void {
    const files: any[] = Array.from(event.files).slice(0, 10);
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSizeInBytes = 300 * 1024; // 300KB
    this.productImages = [];
    for (let i = 0; i < files.length; i++) {
      if (
        allowedTypes.includes(files[i].type) &&
        files[i].size < maxSizeInBytes
      ) {
        this.productImages.push(files[i]);
      }
    }
    this.previewImage();
  }

  previewImage() {
    this.previewLocalImgs = [];
    this.productImages.forEach((x) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewLocalImgs.push(e.target.result);
      };
      reader.readAsDataURL(x);
    });
  }

  onRemoveFile(i: number) {
    this.productImages.splice(i, 1);
    this.previewLocalImgs.splice(i, 1);
  }

  async onSaveProduct() {
    if (!this.productImages.length) {
      this.utils.showMessage('Please choose product images to upload.');
    } else if (!this.productForm.controls['coverImage'].valid) {
      this.utils.showMessage('Please choose cover image.');
    } else if (this.productForm.valid) {
      this.prdouctId = this.generatePrdId().message;
      let coverImgIndex = this.productForm.controls['coverImage'].value;
      let coverImage = this.productImages[coverImgIndex];
      let otherImages = this.productImages.filter(
        (_x, i) => i !== coverImgIndex
      );
      this.productService.uploadImages(this.prdouctId, otherImages);
      let coverImgLink = await this.productService.uploadImages(
        this.prdouctId,
        [coverImage]
      );
      this.productForm.get('coverImage')?.patchValue(coverImgLink[0]);
      this.productService
        .addProduct(this.prdouctId, this.productForm)
        .then((_res) => {
          this.router.navigate(['/products']);
          this.productImages = [];
          this.previewLocalImgs = [];
          this.utils.showMessage('Product Added Successfully');
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      this.utils.showMessage(
        'Please validate product information and Try Again!.'
      );
    }
  }

  getFinalAmt = () => {
    const isDist = this.productForm.get('isDiscount')?.value;
    if (isDist) {
      const dist = this.productForm.get('discount')?.value;
      let finalVal =
        this.productForm.get('mrp')?.value -
        (this.productForm.get('mrp')?.value * dist) / 100;
      return finalVal;
    } else {
      return this.productForm.get('mrp')?.value || 0;
    }
  };

  generatePrdId() {
    if (this.productForm.get('name')?.status != 'VALID') {
      return {
        status: false,
        message: 'Please enter valid Product Name.',
      };
    } else {
      const timeStamp = Date.now().toString().padStart(12, '0').slice(0, 12);
      const prdName = this.productForm
        .get('name')
        ?.value.replace(/\s/g, '')
        .padEnd(8, 'X')
        .slice(0, 8)
        .toUpperCase();
      return {
        status: true,
        message: prdName + timeStamp,
      };
    }
  }

  fetchAllBrands() {
    this.productService
      .fetchBrands()
      .then((res) => {
        this.brandList = res.name;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  fetchAllCategory() {
    this.productService
      .fetchAllCategories()
      .then((res) => {
        const categories: string[] = [];
        if (res.length) {
          res.forEach((res, i) => {
            categories.push(res.id);
          });
          this.categories = categories;
        }
        this.categoryData = res;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onSelectCategory(event: any) {
    this.prdCategory = event.value;
    this.categoryData.map((x: any) => {
      if (x.id === this.prdCategory) {
        this.subCategories = Object.keys(x.data);
      }
    });
  }

  onSelectSubCategory(event: any) {
    this.categoryData.map((x: any) => {
      if (x.id === this.prdCategory) {
      }
    });
  }
}
