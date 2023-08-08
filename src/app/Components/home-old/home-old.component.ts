import { Component } from '@angular/core';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  QuerySnapshot,
  getDocs,
} from 'firebase/firestore';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home-old',
  templateUrl: './home-old.component.html',
  styleUrls: ['./home-old.component.css'],
})
export class HomeOldComponent {
  title = 'RasoiWare';
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  selectedValue: string = 'All Categories';
  arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  prdRate: number = 4.5;

  carouselInfo: any = [
    {
      image: 'assets/1.jpg',
      heading: 'This is First Heading',
      subHeading:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      image: 'assets/2.jpg',
      heading: 'This is Second Heading',
      subHeading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      image: 'assets/3.jpg',
      heading: 'This is Third Heading',
      subHeading: 'In non elit nec mauris eleifend placerat ac id nulla.',
    },
    {
      image: 'assets/4.jpg',
      heading: 'This is Fourth Heading',
      subHeading: 'Fusce non ante feugiat, vehicula arcu non, aliquet ligula.',
    },
  ];

  featuredCategory: any = [
    {
      img: 'assets/ftrd.png',
      name: 'Category Name',
      subHeading: [
        'Sub-Category Name 1',
        'Sub-Category Name 2',
        'Sub-Category Name 3',
        'Sub-Category Name 4',
      ],
    },
  ];

  // fireStore: any = getFirestore();

  constructor(config: NgbDropdownConfig) {}

  onDropdownChange(event: any) {
    console.log(event);
    this.selectedValue = event;
  }

  ariaValueText(current: number, max: number) {
    return `${current} out of ${max} hearts`;
  }

  ngOnInit() {
    // this.getCardsData();
  }

  async getCardsData() {
    try {
      const firestore = getFirestore();
      const docRef = doc(firestore, 'dashboard', 'cards');
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const cardData = docSnapshot.data();
        console.log('Card Data:', cardData);
        return cardData;
      } else {
        console.log('Document does not exist.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching card data:', error);
      return null;
    }
  }
}
