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
  deleteDoc,
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
import { UtilityService } from 'src/app/Utils/utility.service';
// import { Firebase, Observable } from '@angular/fire';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  fireStore: any = getFirestore();
  fireStorage: any = getStorage();

  constructor(private gateway: GatewayService, private utils: UtilityService) {}

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
    const productData = productForm.value;
    try {
      const productDocRef = doc(productsCollectionRef, id);
      this.onUpdateDashboardData(productData, 'ADD');
      await setDoc(productDocRef, productData);
      console.log('Product saved successfully!');
    } catch (error) {
      console.error('Error saving product:', error);
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
        // console.log('Download URLs of all images:', downloadURLs);
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
    const selectedFields = ['name', 'stock', 'category', 'brand', 'coverImage'];
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

  async onUpdateProduct(documentId: string, updateData: any): Promise<any> {
    this.gateway.setLoading(true);
    try {
      const documentRef = doc(this.fireStore, 'products', documentId);
      const docd = await updateDoc(documentRef, updateData.value);
      console.log(docd);
      this.gateway.setLoading(false);
      this.utils.showMessage('Product Updated Successfully');
    } catch (error) {
      this.gateway.setLoading(false);
      this.utils.showMessage('Error updating product' + error);
    }
  }

  async onUpdateDashboardData(productForm:any, type: string) {
    const prdVals = productForm;
    this.gateway.setLoading(true);
    try {
      const documentRef = doc(this.fireStore, 'dashboard', 'cards');
      const docSnapshot: DocumentSnapshot<any> = await getDoc(documentRef);
      this.gateway.setLoading(false);
      if (docSnapshot.exists()) {
        const dashboardData = docSnapshot.data();
        console.log(dashboardData);
        if (type === 'ADD') {
          dashboardData.activeProducts += 1;
          if (parseInt(prdVals.stock) <= 50) {
            dashboardData.thresHoldProducts += 1;
          }
        } else if (type === 'DELETE') {
          dashboardData.activeProducts -= 1;
          if (parseInt(prdVals.stock) <= 50) {
            dashboardData.thresHoldProducts -= 1;
          }
        } else if (type === 'UPDATE') {
        }
        await updateDoc(documentRef, dashboardData);
      } else {
        this.utils.showMessage('Dashboard Update Unsuccessfull');
      }
    } catch (error) {
      this.gateway.setLoading(false);
      this.utils.showMessage('Error updating dashboard details' + error);
    }
  }

  async deleteAllImages(productId: string): Promise<any> {
    const fullPath = `products/${productId}`;
    const fullPathRef = ref(this.fireStorage, fullPath);
    const listResult = await listAll(fullPathRef);
    const deletePromises: Promise<void>[] = listResult.items.map((item) =>
      deleteObject(item)
    );
    await Promise.all(deletePromises);
    console.log(`Subpath ${fullPath} and its contents deleted.`);
    return {
      status: true,
      message: 'All Images has been deleted successfully.',
    };
  }
  async deleteProduct(productId: string, product: FormGroup) {
    this.gateway.setLoading(true);
    const documentRef = doc(this.fireStore, 'products', productId);
    await deleteDoc(documentRef).then(
      (_res) => {
        this.gateway.setLoading(false);
        this.deleteAllImages(productId);
        this.onUpdateDashboardData(product, 'DELETE');
        return {
          status: true,
          message: 'Product has been deleted successfully.',
        };
      },
      (err) => {
        this.gateway.setLoading(false);
        console.log(err);
        return { status: false };
      }
    );
  }
}
