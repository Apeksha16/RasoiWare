import { Injectable } from '@angular/core';
import { GatewayService } from 'src/app/Utils/gateway.service';
import { getFirestore,doc, getDoc, setDoc, updateDoc, collection,QuerySnapshot, getDocs, DocumentSnapshot } from "firebase/firestore";
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { Form, FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  fireStore: any = getFirestore();
  fireStorage: any = getStorage();


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

  async fetchBrands(): Promise<any | undefined> {
    this.gateway.setLoading(true);
    const brandDocRef = doc(this.fireStore, 'brands', 'brandList');
    try {
    this.gateway.setLoading(false);
    const docSnapshot: DocumentSnapshot<any> = await getDoc(brandDocRef);
      if (docSnapshot.exists()) {
        const brandData = docSnapshot.data();
        return brandData;
      } else {
        return [];
      }
    } catch (error) {
    this.gateway.setLoading(false);
    console.error('Error fetching category by ID:', error);
      return [];
    }
  }

  async uploadImages(prdId:string,file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const storeRef = storageRef(this.fireStorage, `products/${prdId}/${file.name}`);
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

  async addProduct(id:string,productForm:FormGroup) {
    const productsCollectionRef = collection(this.fireStore, 'products');
    // Get the form values
    const productData = productForm.value
    try {
      // Save the product data to Firestore
      const productDocRef = doc(productsCollectionRef, id);
      await setDoc(productDocRef, productData);
      console.log('Product saved successfully!');
    } catch (error) {
      console.error('Error saving product:', error);
    }
  }

  async fetchAllProducts() {
    this.gateway.setLoading(true);
    const dashboardCollectionRef = collection(this.fireStore, 'products');
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
