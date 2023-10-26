import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class DataService {

  latestProducts: any[] = [];
  popularProducts: any[] = [];
  categoryData: any = {};

  constructor() { }


}
