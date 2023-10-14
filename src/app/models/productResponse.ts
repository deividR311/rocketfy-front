import { Product, Tag } from '.';
export class ProductResponse {
    status: string;
    message: string;
    product: ProductJson;

    constructor() {
        this.status = ''
        this.message = ''
        this.product = new ProductJson();
    }
}

class ProductJson {
    product: Product;
    tags: Tag[];

    constructor() {
        this.product = new Product();
        this.tags = [];
    }
}