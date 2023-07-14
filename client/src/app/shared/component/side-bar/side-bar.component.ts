import { Component, Input } from '@angular/core';
import { Category } from '../../models';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent {
  @Input() categories: Category[];
}
