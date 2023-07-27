import { Injectable } from '@angular/core';
import { GatewayService } from 'src/app/Utils/gateway.service';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  QuerySnapshot,
  getDocs,
  DocumentSnapshot,
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  ref as storageRef,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import { Form, FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  fireStore: any = getFirestore();
  fireStorage: any = getStorage();

  constructor(private gateway: GatewayService) {}

  async fetchAllCategories() {
    this.gateway.setLoading(true);
    const dashboardCollectionRef = collection(this.fireStore, 'category');
    const querySnapshot: QuerySnapshot<any> = await getDocs(
      dashboardCollectionRef
    );
    const documents: any[] = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        data: doc.data(),
      };
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

  async uploadImages(prdId: string, files: File[]): Promise<string[]> {
    const uploadPromises: Promise<string>[] = [];
    for (const file of files) {
      const storeRef = ref(this.fireStorage, `products/${prdId}/${file.name}`);
      const uploadTask = uploadBytesResumable(storeRef, file);
      this.gateway.setLoading(true);
      const uploadPromise = new Promise<string>((resolve, reject) => {
        uploadTask.on('state_changed', {
          next: async (snapshot) => {
            // Track upload progress if needed
          },
          error: (error) => {
            console.log(error);
            this.gateway.setLoading(false);
            reject(error);
          },
          complete: async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            // console.log('url---', downloadURL);
            this.gateway.setLoading(false);
            resolve(downloadURL);
          },
        });
      });
      uploadPromises.push(uploadPromise);
    }

    try {
      const downloadURLs = await Promise.all(uploadPromises);
      return downloadURLs;
    } catch (error) {
      console.error('Error uploading images:', error);
      this.gateway.setLoading(false);
      return [];
    }
  }

  async removeImage(link: string) {
    this.gateway.setLoading(true);

    try {
      const fileRef = ref(this.fireStorage, link);
      await deleteObject(fileRef);
      this.gateway.setLoading(false);
      console.log('Image deleted successfully!');
    } catch (error) {
      console.error('Error deleting image:', error);
      this.gateway.setLoading(false);
    }
  }

  async updateProductImages(productId: string, newValue: any): Promise<void> {
    const documentRef = doc(this.fireStore, 'products', productId);
    this.gateway.setLoading(true);
    try {
      const dataToUpdate = { ['images']: newValue };
      await updateDoc(documentRef, dataToUpdate);
      console.log('Document field updated successfully!');
      this.gateway.setLoading(false);
    } catch (error) {
      console.error('Error updating document field:', error);
      this.gateway.setLoading(false);
    }
  }

  async addProduct(id: string, productForm: FormGroup) {
    const productsCollectionRef = collection(this.fireStore, 'products');
    // Get the form values
    this.gateway.setLoading(true);
    const productData = productForm.value;
    try {
      // Save the product data to Firestore
      const productDocRef = doc(productsCollectionRef, id);
      await setDoc(productDocRef, productData);
      console.log('Product saved successfully!');
      this.gateway.setLoading(false);
    } catch (error) {
      console.error('Error saving product:', error);
      this.gateway.setLoading(false);
    }
  }

  async fetchProductDetails(productId: string) {
    const productDocRef = doc(this.fireStore, 'products', productId);
    this.gateway.setLoading(true);
    try {
      const productSnapshot = await getDoc(productDocRef);
      this.gateway.setLoading(false);
      if (productSnapshot.exists()) {
        const productData = productSnapshot.data();
        return {
          id: productSnapshot.id,
          data: productData,
        };
      } else {
        this.gateway.setLoading(false);
        console.log('Product not found.');
        return [];
      }
    } catch (error) {
      this.gateway.setLoading(false);
      console.error('Error fetching product:', error);
      return [];
    }
  }

  async getAllImagesForId(prdId: string) {
    try {
      this.gateway.setLoading(true);
      const mainFolderRef = ref(this.fireStorage, 'products');
      const listResult = await listAll(mainFolderRef);
      const subfolder = listResult.prefixes.find(
        (prefix) => prefix.name === prdId
      );
      if (subfolder) {
        const subfolderListResult = await listAll(subfolder);
        const downloadURLs = await Promise.all(
          subfolderListResult.items.map(async (item) => {
            return await getDownloadURL(item);
          })
        );
        this.gateway.setLoading(false);
        console.log('Download URLs of all images:', downloadURLs);
        return downloadURLs;
      } else {
        this.gateway.setLoading(false);
        console.log('Subfolder not found.');
        return [];
      }
    } catch (error) {
      this.gateway.setLoading(false);
      console.error('Error fetching images:', error);
      return [];
    }
  }

  async fetchAllProducts(): Promise<any[]> {
    this.gateway.setLoading(true);
    const productsCollectionRef = collection(this.fireStore, 'products');
    const selectedFields = ['name', 'stock', 'category', 'brand'];
    try {
      const querySnapshot: QuerySnapshot<any> = await getDocs(
        productsCollectionRef
      );
      const documents: any[] = querySnapshot.docs.map((doc) => {
        const data = selectedFields.reduce((acc: any, field: any) => {
          acc[field] = doc.get(field);
          return acc;
        }, {});

        return {
          id: doc.id,
          data: data,
        };
      });

      this.gateway.setLoading(false);
      return documents;
    } catch (error) {
      this.gateway.setLoading(false);
      console.error('Error fetching products:', error);
      return [];
    }
  }
}
