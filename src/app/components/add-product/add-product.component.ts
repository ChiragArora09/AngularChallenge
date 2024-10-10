import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  addProductForm: FormGroup

  constructor(private productService: ProductService, private router: Router){
    this.addProductForm = new FormGroup({
      category: new FormControl('',Validators.required),
      title: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      price: new FormControl('',Validators.required),
      quantity: new FormControl('',Validators.required),
    })
  }

  onSubmit(){
    let data = {
        title: this.addProductForm.value.title,
        category: this.addProductForm.value.category,
        description: this.addProductForm.value.description,
        price: this.addProductForm.value.price,
        quantity: this.addProductForm.value.quantity
      }
      this.productService.addProduct(data)
      .subscribe({
        next: (data) => {
          console.log(data)
          this.router.navigateByUrl("/")
        },
        error: (err) => {
          console.log(err)
        }
      })
      

  }

}
