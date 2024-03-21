import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  codeToCopy = "npm i @yyasinaslan/easyform";
  isCopied = false;

  copyText() {
    navigator.clipboard.writeText(this.codeToCopy)
      .then(() => {
        //console.log("Text copied successfully!", this.isCopied);
        this.isCopied = true;
      })
      .catch(err => {
        //console.error("Copy failed:", err, this.isCopied);
      })
      .finally(() => {
        setTimeout(() => {
          this.isCopied = false;
        }, 2000);
      });
  }

}
