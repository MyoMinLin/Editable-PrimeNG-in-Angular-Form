import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';

  jobInfo = {
    jobCode: 'EX-2000',
    firstLocation: 'aaaa',
    secondLocation: 'dsfdsds',
    thirdLocation: 'rewww',
    containerLineItems: [
      {
        containerId: 1,
        containerNumber: 'ABAB 3736363',
        containerType: "20' RF"
      },
      {
        containerId: 2,
        containerNumber: 'CDCD 7736363',
        containerType: "20' RF"
      }
    ]
  };

  jobContianersList: FormArray;

  jobForm: FormGroup;

  containerCols = [
    { field: 'containerNumber', header: 'Container Number'},
    { field: 'containerType', header: 'Container Type'}
  ]

  constructor (
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(){
    this.jobForm = this.formBuilder.group({
      jobCode: [this.jobInfo.jobCode],
      firstLocation: [this.jobInfo.firstLocation],
      containerLineItems: this.formBuilder.array([])
    });

    this.jobContianersList = this.jobForm.get('containerLineItems') as FormArray;

    this.addContainerLineItemToForm();

    console.log(this.containerLineItemsFormGroup);
  }

  addContainerLineItemToForm() {
    this.jobInfo.containerLineItems.forEach(item => {
      this.jobContianersList.push(this.createContainerLineItem(item));
    });
    
  }

  createContainerLineItem(container: any): FormGroup {
    return this.formBuilder.group({
      containerId: [container.containerId],
      containerNumber: [container.containerNumber],
      containerType: [container.containerType]
    });
  }

  get containerLineItemsFormGroup() {
    return this.jobForm.get('containerLineItems') as FormArray;
  }
}
