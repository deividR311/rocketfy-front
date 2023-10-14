import { ProductJson } from '.';
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