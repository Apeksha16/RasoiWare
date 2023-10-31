import { Injectable } from '@angular/core';
import { getFirestore,collection,doc, getDoc, getDocs, query, limit, orderBy, where } from 'firebase/firestore';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
@Injectable({
  providedIn: 'root',
})
export class FireService {
  constructor() { }

  fireStore: any = getFirestore();

  get WindowRef() {
    return window;
  }

  transformProdResponse(res: any[]) {
    let tempRes:any[] = [];
    res.forEach(x => {
      let y = x.data;
      y['id'] = x.id;
      tempRes.push(y);
    });
    return tempRes;
  }

  async sendOtp(mobNo: string) {
    const auth = getAuth();

    const appVerify = new RecaptchaVerifier(
      'sign-in-btn',
      {
        size: 'invisible',
      },
      auth
    );
    appVerify.render();

    const confirmationResult = await signInWithPhoneNumber(
      auth,
      mobNo,
      appVerify
    );
    console.log(confirmationResult);
  }

  async getCategoryInfo(category: string) {
    try {
      const collectionRef = collection(this.fireStore, 'category');
      const documentId = category;
      const documentRef = doc(collectionRef, documentId);

      const docSnapshot = await getDoc(documentRef);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        console.log(data);
        return data;
      } else {
        return { message: 'Document does not exist' };
      }
    } catch (error) {
      return { message: 'Error fetching document: ' + error };
    }
  }

  async getTypeOfProducts(type: string, limitNum: number) {
    try {
      const latestQuery = query(collection(this.fireStore, 'products'),where(type, '==',true), limit(limitNum));
      const querySnapshot = await getDocs(latestQuery);
      const productsData: any[] = [];

       querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        const data = doc.data();
        const documentId = doc.id;
        productsData.push({ id: documentId, data });
      }
       });
       console.log(productsData);
       return productsData;
    } catch (error) {
      return { message: 'Error fetching document: ' + error };
    }
  }

  async getOneCatProducts(category: string, limitNum: number) {
    try {
      const latestQuery = query(collection(this.fireStore, 'products'),where('category', '==',category.toLowerCase()), limit(limitNum));
      const querySnapshot = await getDocs(latestQuery);
      const productsData: any[] = [];

       querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        const data = doc.data();
        const documentId = doc.id;
        productsData.push({ id: documentId, data });
      }
       });
       console.log(productsData);
       return productsData;
    } catch (error) {
      return { message: 'Error fetching document: ' + error };
    }
  }

  async getAllBrands() {
    try {
      const collectionRef = collection(this.fireStore, 'brands');
      const documentId = 'brandList';
      const documentRef = doc(collectionRef, documentId);
      const docSnapshot = await getDoc(documentRef);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data()['name'];
        return data;
      } else {
        return { message: 'Document does not exist' };
      }
    } catch (error) {
      return { message: 'Error fetching document: ' + error };
    }
  }

}
