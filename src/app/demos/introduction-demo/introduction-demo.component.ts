import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {EasyForm, EasyFormComponent, FormFieldDirective} from "@yyasinaslan/easyform";

@Component({
  selector: 'app-introduction-demo',
  standalone: true,
  imports: [
    EasyFormComponent,
    FormFieldDirective
  ],
  templateUrl: './introduction-demo.component.html',
  styleUrl: './introduction-demo.component.scss'
})
export class IntroductionDemoComponent {
  form = EasyForm.create({
    name: EasyForm.text('','Name').required('Name is required'),
    phone: EasyForm.text('','Phone',{props:{type:'number'}}).required('Phone is required'),
  })

  handleSubmit(event: FormGroup) {
    if (this.form.invalid) {
      console.log('Form is invalid')
    } else {
      console.log('Form is valid')
    }
  }
}
