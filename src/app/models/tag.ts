export class Tag {
    _id: string;
    name: string;
    created_at: string;
    updated_at: string;
    __v: number;

    constructor() {
        this._id = '';
        this.name = '';
        this.created_at = '';
        this.updated_at = '';
        this.__v = 0;
    }
}