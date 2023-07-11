import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { FlexDirective } from 'src/app/Utils/flex.directive';
import { SharedModule } from 'src/app/Utils/shared.module';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  standalone: true,
  imports:[MatCardModule, CommonModule, SharedModule]
})
export class LoaderComponent {
}
