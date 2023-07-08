import { Injectable } from '@angular/core';
import { getFirestore,doc, getDoc, setDoc, updateDoc, collection,QuerySnapshot, getDocs } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  fireStore: any = getFirestore();

  constructor(){}

  async getCardsData() {
    const docRef = doc(getFirestore(), "dashboard",'cards');
    const collection = await getDoc(docRef);
    return collection.data();
  }

  async getAllDataFromCollection() {
       const dashboardCollectionRef = collection(this.fireStore, 'dashboard');
    const querySnapshot: QuerySnapshot<any> = await getDocs(dashboardCollectionRef);
    const documentIds: string[] = querySnapshot.docs.map((doc) => doc.data());
    return documentIds;
  }





  // getDocumentIdsFromCollection() {
  //   const dashboardCollectionRef = collection(this.fireStore, 'dashboard');
  //   const querySnapshot: QuerySnapshot<any> = await getDocs(dashboardCollectionRef);
  //   const documentIds: string[] = querySnapshot.docs.map((doc) => doc.id);
  //   return documentIds;
  // }

}
