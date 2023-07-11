import { Injectable } from '@angular/core';
import { getFirestore,doc, getDoc, setDoc, updateDoc, collection,QuerySnapshot, getDocs } from "firebase/firestore";
import { GatewayService } from 'src/app/Utils/gateway.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  fireStore: any = getFirestore();

  constructor(
    private gatewayService:GatewayService
  ){}

  async getCardsData() {
    this.gatewayService.setLoading(true);
    const docRef = doc(getFirestore(), "dashboard",'cards');
    const collection = await getDoc(docRef);
    this.gatewayService.setLoading(false);
    return collection.data();
  }

  async getAllDataFromCollection() {
    this.gatewayService.setLoading(true);
    const dashboardCollectionRef = collection(this.fireStore, 'dashboard');
    const querySnapshot: QuerySnapshot<any> = await getDocs(dashboardCollectionRef);
    const documentIds: string[] = querySnapshot.docs.map((doc) => doc.data());
    this.gatewayService.setLoading(false);
    return documentIds;
  }





  // getDocumentIdsFromCollection() {
  //   const dashboardCollectionRef = collection(this.fireStore, 'dashboard');
  //   const querySnapshot: QuerySnapshot<any> = await getDocs(dashboardCollectionRef);
  //   const documentIds: string[] = querySnapshot.docs.map((doc) => doc.id);
  //   return documentIds;
  // }

}
