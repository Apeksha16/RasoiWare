import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  public prdouctId: string = '';
  public brandList: string[] = [];
  public productImages: any[] = [];
  private productId: string = '';
  private subscription: Subscription;
  private productImgLink: string[] = [];
  public isAllImagesUploaded: boolean = false;

  constructor(
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private prodService: ProductsService
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
      images: [[], Validators.required],
      specifications: ['', Validators.required],
    });
    this.subscription = router.url.subscribe((x) => {
      this.productId = decodeURI(x[1].path);
      this.fetchProductDetails();
    });
  }

  ngOnInit() {
    this.fetchAllBrands();
    this.fetchAllCategory();
  }

  fetchAllBrands() {
    this.prodService
      .fetchBrands()
      .then((res) => {
        console.log(res);
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
        console.log(res);
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
    console.log(this.subCategories);
  }

  fetchProductDetails() {
    this.prodService
      .fetchProductDetails(this.productId)
      .then((x: any) => {
        console.log(x);
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
          images: productInfo.images,
          specifications: productInfo.specifications,
        });
        this.productForm.controls['discount'].enable();
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
