import { Component } from '@angular/core';
import {MatSelect} from '@angular/material/select';
import { MatFormField } from '@angular/material/select';
import { MatOption } from '@angular/material/select';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatSelect, MatFormField, MatOption],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
