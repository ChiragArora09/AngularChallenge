import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { NgIf } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  editProductForm: FormGroup
  title: any
  category: any
  price: any
  description: any
  quantity: any
  id: any

  constructor(private actRoute: ActivatedRoute, private router: Router, private productService: ProductService){}

  ngOnInit(){
    this.actRoute.paramMap.subscribe(params => {
      this.id = params.get("productId")
    })
    this.productService.getProductInfo(this.id)
    .subscribe({
      next: (data) => {
        console.log(data)
        this.title = data.title
        this.category = data.category
        this.description = data.description
        this.price = data.price
        this.quantity = data.quantity
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  editProduct(){
    this.actRoute.paramMap.subscribe(params => {
      this.id = params.get("productId")
    })
    this.productService.editProduct(this.id, {
      "title":this.title,
      "category":this.category,
      "description": this.description,
      "price": this.price,
      "quantity": this.quantity
    })
    .subscribe({
      next: (data) => {
        console.log(data)
        this.router.navigateByUrl("/")
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


}

// /{productId}