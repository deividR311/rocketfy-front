import { Product } from "./product";

export class ProductsResponse {
    status: string;
    message: string;
    products: Product[];

    constructor() {
        this.status = '';
        this.message = '';
        this.products = [];
    }
}
