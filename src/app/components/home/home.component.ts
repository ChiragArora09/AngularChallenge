import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink, NgIf, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products: any[] = []
  stringMsg: string = ""
  viewProductDiv: boolean = false
  totalPages : number =0;  
  numArry:number[]=[];
  counter: number=0;
  page:number=0;
  size:number=5; 
  last: boolean=false; 
  first: boolean=true;

  selectedProduct: any

  constructor(private productService: ProductService){
    this.fetchData()
  }

  fetchData() {
    this.productService.getAll(this.page, this.size).subscribe({
      next: (data) => {
        this.products=data.content
        this.totalPages = data.totalPages; 
        this.last = data.last; 
        this.first = data.first; 

        if(this.counter === 0){
         let i=0;
         while(i<this.totalPages){
             this.numArry.push(i);
             i++;
           };
         }
       this.counter = this.counter+1;
      },
      error: (err) => {
        console.log(err)
      }

    })
  }

  onDelete(id: any){
    this.productService.deleteProduct(id)
    .subscribe({
      next: (data) => {
        console.log(data)
        this.stringMsg = "Product Deleted"
        window.location.reload()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  onPageNumberClick(n:number){
    this.page = n; 
    this.fetchData();
   }

   onNext(){
    this.page = this.page + 1; 
    this.fetchData();
   }

   onPrev(){
    this.page = this.page - 1;
    this.fetchData();
   }

   viewProduct(viewProduct:any){
    this.viewProductDiv=true
    this.selectedProduct = viewProduct
   }
}
