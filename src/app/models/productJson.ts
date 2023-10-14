import { Product, ProductTag } from ".";

export class ProductJson {
    product: Product;
    tags: ProductTag[];

    constructor() {
        this.product = new Product();
        this.tags = [];
    }
}