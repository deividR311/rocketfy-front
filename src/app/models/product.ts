import { Tag } from 'src/app/models';

export class Product {
    _id?: string;
    name: string;
    description: string;
    sku: string;
    image: string;
    price: number;
    stock: number;
    created_at: string;
    updated_at: string;
    __v: number;
    tags: Tag[];

    constructor() {
        this.name = '';
        this.description = '';
        this.sku = '';
        this.image = '';
        this.price = 0;
        this.stock = 0;
        this.created_at = '';
        this.updated_at = '';
        this.__v = 0;
        this.tags = [];
    }
}


