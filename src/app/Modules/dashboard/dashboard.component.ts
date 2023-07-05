import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Utils/auth.service';
import { getFirestore,doc, getDoc, setDoc, updateDoc } from "firebase/firestore";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardCards: any[] = [];

  constructor(
    private auth :AuthService
  ) {
  }

  ngOnInit() {
    this.dashboardCards = [{
      heading: 'Active Products',
      iconColor: '9b5de5',
      value: 0,
      icon: 'inventory_2'
    }, {
      heading: 'No. of Users',
      iconColor: 'fee440',
      value: 357,
      icon: 'group'
    }, {
      heading: 'Threshold Products',
      iconColor: 'ee6c4d',
      value: 72,
      icon: 'trending_down'
    }, {
      heading: "Today's Orders",
      iconColor: '219ebc',
      value: 108,
      icon: 'list_alt'
    }];
    const interval = setInterval(() => {
      this.dashboardCards[0].value = this.dashboardCards[0].value + 1;
      if (this.dashboardCards[0].value >= 793) {
        clearInterval(interval);
      }
    }, 1)

    // this.readData();
  }


  async readData() {
    console.log((await this.auth.afAuth.currentUser)?.uid);
    const docRef = doc(getFirestore(), "userinfo", (await this.auth.afAuth.currentUser)!.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const docSnapNewSet = await updateDoc(docRef, {
        'phone': '8001'
      });
      const docSnapNew = await getDoc(docRef);
      if (docSnapNew.exists()) {
        console.log("Document data:", docSnapNew.data());
      } else {
        console.log("No such document!");
      }
    } else {
      console.log("No such document!");
    }
  }

}
