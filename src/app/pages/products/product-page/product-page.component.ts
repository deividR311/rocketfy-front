import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product, ProductTag } from 'src/app/models';
import { ProductService } from 'src/app/services/product.service';
import { CustomDialogComponent } from 'src/app/shared/components/custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {
  productId: string | null = '';
  product: Product;
  tags: ProductTag[] = [];
  productSubs: Subscription = new Subscription;
  productDeleteSubs: Subscription = new Subscription;

  constructor(
    private activateRouter: ActivatedRoute,
    private location: Location,
    private productService: ProductService,
    public dialog: MatDialog
  ) {
    this.product = new Product();
  }
  ngOnInit(): void {
    this.productId = this.activateRouter.snapshot.paramMap.get('id');
    this.getProduct();
  }


  getProduct() {
    this.productSubs = this.productService.getProduct(this.productId!).subscribe(
      res => {
        const { response } = res;
        this.product = response.product;
        this.tags = response.tags;
      }
    )
  }

  openDialog() {
    const dialogRef = this.dialog.open(CustomDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct();
      }
    });
  }

  goBack() {
    this.location.back();
  }

  deleteProduct() {
    this.productDeleteSubs = this.productService.deleteProduct(this.product._id).subscribe(
      res => {
        this.goBack();
      }
    );
  }

  ngOnDestroy() {
    this.productSubs.unsubscribe();
    this.productDeleteSubs.unsubscribe();
  }
}
