import { Component } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

const logoURL = 
"https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent {
  constructor (private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
        this.matIconRegistry.addSvgIcon(
        "logo",
        this.
        domSanitizer.
        bypassSecurityTrustResourceUrl(logoURL));
    }
}




