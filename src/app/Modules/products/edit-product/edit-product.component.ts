import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GatewayService } from 'src/app/Utils/gateway.service';
import { UtilityService } from 'src/app/Utils/utility.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { A, COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable, map, startWith } from 'rxjs';
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
  private productId: string = '';
  private subscription: Subscription;
  public productImgLink: string[] = [];
  public productImagesOnLocal: any[] = [];
  public previewLocalImgs: any[] = [];
  private prevCoverImg: string = '';
  public filters: any[] = [];
  private isOnInit: boolean = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedFilters: any[] = [];
  keyWordInput: string = '';
  filteredKeyFilters!: any[];

  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;

  constructor(
    private actvRouter: ActivatedRoute,
    private router: Router,
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
      isMostSelling: [false],
      isPopular: [false],
      isLatest: [false],
      brand: ['', Validators.required],
      stock: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      description: ['', Validators.required],
      specifications: ['', Validators.required],
      coverImage: ['', Validators.required],
      filters: [],
    });
    this.subscription = actvRouter.url.subscribe((x) => {
      this.productId = decodeURI(x[1].path);
      this.fetchProductDetails();
    });
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
            categories.push(res.id.toUpperCase());
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
      if (x.id.toUpperCase() === this.prdCategory) {
        this.subCategories = x.data['subCategory'];
        if (this.subCategories.length) {
          this.productForm.controls['subCategory'].addValidators(
            Validators.required
          );
        } else {
          this.productForm.controls['subCategory'].removeValidators(
            Validators.required
          );
        }
        this.getFiltersInArray(x.data.filters);
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
          category: productInfo.category.toUpperCase(),
          subCategory: productInfo.subCategory.toUpperCase(),
          mrp: productInfo.mrp,
          isDiscount: productInfo.isDiscount,
          discount: productInfo.discount || '',
          isMostSelling: productInfo.isMostSelling || false,
          isPopular: productInfo.isPopular || false,
          isLatest: productInfo.isLatest || false,
          brand: productInfo.brand,
          description: productInfo.description,
          stock: productInfo.stock,
          specifications: productInfo.specifications,
          coverImage: productInfo.coverImage,
          filters: productInfo.filters || [],
        });
        this.productForm.controls['discount'].enable();
        this.prevCoverImg = this.productForm.controls['coverImage'].value;
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
    this.previewImage();
  }

  previewImage() {
    this.previewLocalImgs = [];
    this.productImagesOnLocal.forEach((x) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewLocalImgs.push(e.target.result);
      };
      reader.readAsDataURL(x);
    });
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

  onRemoveImgOnLocal(index: number) {
    this.productImagesOnLocal.splice(index, 1);
    this.previewLocalImgs.splice(index, 1);
    if (this.productForm.controls['coverImage'].value == index) {
      this.productForm.controls['coverImage'].patchValue('');
    }
  }

  onRemoveImgFromServer(link: string) {
    this.prodService
      .removeImage(link)
      .then((res: any) => {
        this.productImgLink.splice(
          this.productImgLink.findIndex((x) => x === link),
          1
        );
        if (this.productForm.controls['coverImage'].value == link) {
          this.productForm.controls['coverImage'].patchValue('');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async onUpdateProduct() {
    if (!this.productImagesOnLocal.length && !this.productImgLink.length) {
      this.utilService.showMessage('Please choose product images to upload.');
    } else if (this.productForm.valid) {
      let coverImgIndex = this.productForm.controls['coverImage'].value;
      if (coverImgIndex.toString().length <= 2) {
        let coverImage = this.productImagesOnLocal[coverImgIndex];
        let otherImages = this.productImagesOnLocal.filter(
          (_x, i) => i !== coverImgIndex
        );
        this.prodService.uploadImages(this.productId, otherImages);
        let coverImgLink = await this.prodService.uploadImages(this.productId, [
          coverImage,
        ]);
        this.productForm.get('coverImage')?.patchValue(coverImgLink[0]);
      }
      if (this.filters.length) {
        let selectedFilters = this.filteredKeyFilters.filter((x) => x.selected);
        this.productForm.controls['filters'].setValue(selectedFilters);
      }
      this.prodService
        .onUpdateProduct(this.productId, this.productForm)
        .then((_res) => {
          this.router.navigate(['/products']);
          this.productImagesOnLocal = [];
          this.previewLocalImgs = [];
          this.utilService.showMessage('Product Updated Successfully');
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      this.utilService.showMessage(
        'Please validate product information and Try Again!.'
      );
    }
  }

  async deleteProductById() {
    this.prodService
      .deleteProduct(this.productId, this.productForm)
      .then(
        (_res) => {
          this.router.navigate(['/products']);
          this.utilService.showMessage('Product has been deleted successfully');
        },
        (err) => {
          console.log(err);
        }
      )
      .catch((err) => {
        console.log(err);
      });
  }

  getFiltersInArray(filter: any) {
    if (filter != undefined) {
      Object.keys(filter).forEach((x) => {
        filter[x].forEach((item: string) => {
          this.filters.push({ type: x, value: item, selected: false });
        });
      });
    }
    this.filteredKeyFilters = this.filters;
    if (this.isOnInit) {
      this.isOnInit = false;
      this.productForm.controls['filters']?.value.forEach((x: any) => {
        this.filteredKeyFilters.map((fil) => {
          if (x.value?.toLowerCase() == fil.value.toLowerCase()) {
            fil.selected = true;
          }
        });
      });
    }
  }

  // delhi gate se peeche mudd jana gate no 3 se dariyaganj ki taraf

  // vaha se poochna hai golcha cinema kaha hai

  onFilterInputChange(event: any) {
    console.log(event);
    this.filteredKeyFilters = this.filters.filter((x: any) =>
      x.value.toLowerCase().includes(event.toLowerCase())
    );
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.filterInput.nativeElement.value = '';
    this.filteredKeyFilters.find((x) => {
      if (x.value.toLowerCase() == event.option.viewValue.toLowerCase()) {
        x.selected = true;
        return;
      }
    });
  }

  removeKeyword(i: number) {
    this.filteredKeyFilters[i].selected = false;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}