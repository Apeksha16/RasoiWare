import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GatewayService } from 'src/app/Utils/gateway.service';
import { UtilityService } from 'src/app/Utils/utility.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnDestroy, OnInit {
  public categories: string[] = [];
  public prdCategory: string = '';
  public categoryData: any;
  public subCategories: string[] = [];
  public productForm: FormGroup;
  public brandList: string[] = [];
  public productImagesOnLocal: any[] = [];
  private productId: string = '';
  private subscription: Subscription;
  public productImgLink: string[] = [];
  public isAllImagesUploaded: boolean = false;
  private isValueChanges: boolean = false;
  private productFormCopy: { [key: string]: any } = {};

  constructor(
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private prodService: ProductsService,
    private loading: GatewayService,
    private utilService: UtilityService
  ) {
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
    });
    this.subscription = router.url.subscribe((x) => {
      this.productId = decodeURI(x[1].path);
      this.fetchProductDetails();
    });
    this.productForm.valueChanges.subscribe((_event) => {
      this.isValueChanges = true;
    });

    // Object.keys(this.productForm.controls).forEach((fieldName) => {
    //   const formControl = this.productForm.get(fieldName);
    //   if (formControl) {
    //     formControl.valueChanges.subscribe((newValue) => {
    //       const prevValue = this.productFormCopy[fieldName];
    //       if (newValue !== prevValue) {
    //         this.isValueChanges = true;
    //       } else {
    //         this.isValueChanges = false;
    //       }
    //     });
    //   }
    // });
  }

  ngOnInit() {
    this.fetchAllBrands();
    this.fetchAllCategory();
  }

  fetchAllProductImages() {
    this.prodService
      .getAllImagesForId(this.productId)
      .then((res) => {
        this.productImgLink = res;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  fetchAllBrands() {
    this.prodService
      .fetchBrands()
      .then((res) => {
        this.brandList = res.name;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  fetchAllCategory() {
    this.prodService
      .fetchAllCategories()
      .then((res) => {
        const categories: string[] = [];
        if (res.length) {
          res.forEach((res, i) => {
            categories.push(res.id);
          });
          this.categories = categories;
        }
        let selectedCat: any = {
          value: this.productForm.controls['category'].value,
        };
        this.categoryData = res;
        this.onSelectCategory(selectedCat);
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

  fetchProductDetails() {
    this.prodService
      .fetchProductDetails(this.productId)
      .then((x: any) => {
        let productInfo = x.data;
        this.productForm.setValue({
          name: productInfo.name,
          category: productInfo.category,
          subCategory: productInfo.subCategory,
          mrp: productInfo.mrp,
          isDiscount: productInfo.isDiscount,
          discount:
            productInfo.discount != undefined ? productInfo.discount : '',
          brand: productInfo.brand,
          description: productInfo.description,
          stock: productInfo.stock,
          specifications: productInfo.specifications,
        });
        this.productForm.controls['discount'].enable();
        this.isValueChanges = false;
        this.productFormCopy = { ...this.productForm.getRawValue() };
        this.fetchAllProductImages();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onDiscountChange() {
    this.productForm.patchValue({ discount: '' });
    if (this.productForm.value['isDiscount']) {
      this.productForm.controls['discount'].enable();
    } else {
      this.productForm.controls['discount'].disable();
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

  onAddImages(event: any): void {
    const files: any[] = Array.from(event.files).slice(0, 10);
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSizeInBytes = 300 * 1024; // 300KB
    this.productImagesOnLocal = [];
    for (let i = 0; i < files.length; i++) {
      if (
        allowedTypes.includes(files[i].type) &&
        files[i].size < maxSizeInBytes
      ) {
        this.productImagesOnLocal.push(files[i]);
      }
    }
  }

  async onUploadImage() {
    if (this.productImagesOnLocal.length) {
      let response = await this.prodService.uploadImages(
        this.productId,
        this.productImagesOnLocal
      );
      response.forEach((x) => {
        this.productImgLink.push(x);
      });
      this.productImagesOnLocal = [];
    } else {
      this.utilService.showMessage('Please select product images.');
    }
  }

  onRemoveProductImage(link: string) {
    this.prodService
      .removeImage(link)
      .then((res: any) => {
        this.productImgLink.splice(
          this.productImgLink.findIndex((x) => x === link),
          1
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async onUpdateProduct() {
    if (this.productImagesOnLocal.length) {
      this.utilService.showMessage(
        'Please upload selected Images then, Try again.'
      );
    } else if (!this.productImgLink.length) {
      this.utilService.showMessage('Please upload product images.');
    } else if (this.productForm.valid) {
      if (this.isValueChanges) {
        await this.prodService.onUpdateProduct(
          this.productId,
          this.productForm.value
        );
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
