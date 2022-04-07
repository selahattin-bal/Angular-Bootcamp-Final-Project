import { Component, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms'
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  formValue !: FormGroup;
  item:any={}
  itemData : any;
  actionButton:string="Add"
  constructor(private api: ApiService,private formBuilder: FormBuilder,private toastr: ToastrService,private dialogRef:MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public row:any) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      title: ['',Validators.required],
      brand: ['',Validators.required],
      price: ['',[Validators.required,Validators.pattern(/[0-9]/)]],
      description: ['',Validators.required],
      category: ['',Validators.required],
      image: ['',[Validators.required,Validators.pattern(/https?:\/\//)]],
      star:[0],
      comment:['']
    })
  
    if(this.row){
      this.actionButton="Update"
       this.formValue.controls['title'].setValue(this.row.title)
       this.formValue.controls['brand'].setValue(this.row.brand)
       this.formValue.controls['price'].setValue(this.row.price)
       this.formValue.controls['description'].setValue(this.row.description)
       this.formValue.controls['category'].setValue(this.row.category)
       this.formValue.controls['image'].setValue(this.row.image)
       this.formValue.controls['star'].setValue(this.row.star)
       this.formValue.controls['comment'].setValue(this.row.comment)
    }
  }

 

postItem() {
 if(!this.row){
  if(this.formValue.value){
    this.api.postItemApi(this.formValue.value)
    .subscribe(res => {
      this.formValue.reset()
      this.toastr.success('Product Added', 'Success');
    })
   }
  else{
    this.toastr.error('Form Values Are Not Valid', 'Error');
    this.dialogRef.close(this.formValue)
  }
 }
 else{
   this.updateItem()
 }
}

updateItem(){
  if(this.formValue.valid){
    this.api.updateItemApi(this.formValue.value,this.row.id)
    .subscribe(res => {
      this.formValue.reset()
      this.toastr.success('Product Added', 'Success');
    })
   }
  else{
    this.toastr.error('Form Values Are Not Valid', 'Error');
    this.dialogRef.close(this.formValue)
  }
}
close(){
  this.dialogRef.close(this.formValue)
}

public errorHandling = (control: string, error: string) => {
  return this.formValue.controls[control].hasError(error);
}
}
