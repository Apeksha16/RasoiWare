import { Component, Input } from '@angular/core';

export interface PrdCard {
  id: string,
  name: string,
  mrp: number,
  discount: number,
  category: string,
  coverImage:string
};

@Component({
  selector: 'app-prd-card',
  templateUrl: './prd-card.component.html',
  styleUrls: ['./prd-card.component.css']
})

export class PrdCardComponent {

  @Input() prdInfo: PrdCard = {
    id: '',
    name: '',
    mrp: 0,
    discount: 0,
    category: '',
    coverImage:''
  };

  constructor() {
    // this.prdInfo
  }

  ngOnInit() {
    // console.log(this.prdInfo);
  }


  onBuyProduct(id:string) {



  }

  getFinalPrice(discount:any, mrp:any) {
    return parseFloat(mrp) - ((parseFloat(discount) / 100) * parseFloat(mrp));
  }

}
