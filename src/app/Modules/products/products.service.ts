import { Injectable } from '@angular/core';
import { GatewayService } from 'src/app/Utils/gateway.service';
import { getFirestore,doc, getDoc, setDoc, updateDoc, collection,QuerySnapshot, getDocs } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  fireStore: any = getFirestore();


  constructor(
    private gateway:GatewayService
  ) { }


  async fetchAllCategories() {
    this.gateway.setLoading(true);
    const dashboardCollectionRef = collection(this.fireStore, 'category');
    const querySnapshot: QuerySnapshot<any> = await getDocs(dashboardCollectionRef);
    const documents: any[] = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        data: doc.data()
      }
    });
    this.gateway.setLoading(false);
    return documents;

  }

}
