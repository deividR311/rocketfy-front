import { Tag } from '.';
export class ProductTag {
    _id: string;
    productId: string;
    tagId: Tag;
    __v: number;
    created_at: string;
    updatedAt: string;

    constructor() {
        this._id = '';
        this.productId = '';
        this.tagId = new Tag();
        this.__v = 0;
        this.created_at = '';
        this.updatedAt = '';
    }
}