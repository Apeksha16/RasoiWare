import { Injectable } from '@angular/core';
import { GatewayService } from 'src/app/Utils/gateway.service';
import { getFirestore,doc, getDoc, setDoc, updateDoc, collection,QuerySnapshot, getDocs } from "firebase/firestore";
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes, uploadBytesResumable } from 'firebase/storage';

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

  async uploadImages(prdId:string,file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const storage = getStorage();
      const storeRef = storageRef(storage, `products/${prdId}/${file.name}`);
      const uploadTask = uploadBytesResumable(storeRef, file);

      uploadTask.on('state_changed', {
        next: async (snapshot) => {
          console.log('image---',snapshot);
        },
        error: (error) => {
          console.log(error);
          reject(error);
        },
        complete: async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('url---',downloadURL);
          resolve(downloadURL);
        }
      });
    });
  }

}
