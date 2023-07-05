import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Utils/auth.service';
import { getFirestore,doc, getDoc, setDoc, updateDoc, collection } from "firebase/firestore";


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
      value: 0,
      icon: 'group'
    }, {
      heading: 'Threshold Products',
      iconColor: 'ee6c4d',
      value: 0,
      icon: 'trending_down'
    }, {
      heading: "Today's Orders",
      iconColor: '219ebc',
      value: 0,
      icon: 'list_alt'
    }];
    // const interval = setInterval(() => {
    //   this.dashboardCards[0].value = this.dashboardCards[0].value + 1;
    //   if (this.dashboardCards[0].value >= 793) {
    //     clearInterval(interval);
    //   }
    // }, 1)

    this.readData();
  }


  async readData() {
    const docRef = doc(getFirestore(), "dashboard",'JfGpvxbax0Mgxr6Dq4ja');
    const collection = await getDoc(docRef);
    console.log(collection.data());
    const response:any = collection.data();
    this.dashboardCards[0].value = response.activeProducts;
    this.dashboardCards[1].value = response.usersCount;
    this.dashboardCards[2].value = response.thresHoldProducts;
    this.dashboardCards[3].value = response.todayOrderCount;
  }
 async onClick() {

    const collect = collection(getFirestore(), 'dashboard');
    console.log(collect);
    await setDoc(doc(collect), {
      product: 2424,
      name: 32223,
      type:'eioweore'
    })

  }

}
