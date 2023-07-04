import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  iconList: string[] = ['home', 'apps', 'terminal', 'dataset', 'output', 'select_all', 'recommend','delete'];

}
