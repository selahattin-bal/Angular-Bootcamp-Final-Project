import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { DialogComponent } from '../dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'brand', 'price','description','category','image','star','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public data:any
  dialogformvalue:any={}


  constructor(public dialog: MatDialog,private api:ApiService,private toastr: ToastrService) { }
  
  ngOnInit(): void {
    this.getItem()

  }

  openDialog() {
    this.dialog.open(DialogComponent,{width:"50%"}).afterClosed().subscribe((resp:string)=>{
      this.dialogformvalue=resp
      console.log(this.dialogformvalue)
      this.getItem()
      
    }
  
    )
  }
  getItem(){
    this.api.getItemApi()
      .subscribe((res:any)=>{
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator=this.paginator
        this.dataSource.sort=this.sort
      })
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    editItem(row:any){
      this.dialog.open(DialogComponent,{width:'50%',data:row}).afterClosed().subscribe((resp:string)=>{
        this.dialogformvalue=resp
        console.log(this.dialogformvalue)
          this.getItem()
      })
    }

    deleteItem(id:number){
      const message = `Are you sure to delete this item?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this.api.deleteItemApi(id).subscribe(res=>
          this.getItem()
        )
      }
    });
  }
      
   
    canExit():boolean{
      
      if(this.dialogformvalue.touched && this.dialogformvalue.pristine ||this.dialogformvalue.touched && this.dialogformvalue.invalid){
        this.toastr.error('Unsaved Changes', 'Error')
        if(confirm("There are some unsaved changes")){
          return true
        }
        return false

      }
      return true
    }
      
  }








