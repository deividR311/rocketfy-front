import { Location } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Product, Tag } from 'src/app/models';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { TagService } from 'src/app/services/tag.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-new-product-page',
  templateUrl: './new-product-page.component.html',
  styleUrls: ['./new-product-page.component.scss']
})
export class NewProductPageComponent implements OnInit {
  public productForm!: FormGroup;
  public product: Product;
  tags: Tag[] = [];
  public chipSelectedTags: Tag[] = [];
  public filteredTags!: Observable<String[]>;
  chipSelectedTagsEmpty: boolean = false;

  private allowFreeTextAddTag = false;
  public tagControl = new FormControl();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('tagInput')
  tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto')
  matAutocomplete!: MatAutocomplete;
  //////////

  tagCtrl = new FormControl();

  announcer = inject(LiveAnnouncer);

  constructor(
    private location: Location,
    readonly formBuilder: FormBuilder,
    private tagService: TagService,
    private productService: ProductService
  ) {
    this.product = new Product();
  }

  ngOnInit(): void {
    this.formInit();
    this.getTags();

    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map(tagName => this.filterOnValueChange(tagName))
    );
  }

  private filterOnValueChange(tagName: string | null): String[] {
    let result: String[] = [];

    let allTagsLessSelected = this.tags.filter(tag => this.chipSelectedTags.indexOf(tag) < 0);
    if (tagName) {
      result = this.filterTag(allTagsLessSelected, tagName);
    } else {
      result = allTagsLessSelected.map(tag => tag.name);
    }
    return result;
  }

  private filterTag(tagList: Tag[], tagName: String): String[] {
    let filteredTagList: Tag[] = [];
    const filterValue = tagName.toLowerCase();
    let tagsMatchingtagName = tagList.filter(tag => tag.name.toLowerCase().indexOf(filterValue) === 0);
    if (tagsMatchingtagName.length || this.allowFreeTextAddTag) {
      filteredTagList = tagsMatchingtagName;
    } else {
      filteredTagList = tagList;
    }
    return filteredTagList.map(tag => tag.name);
  }

  add(event: MatChipInputEvent): void {
    if (!this.allowFreeTextAddTag) {
      return;
    }

    if (this.matAutocomplete.isOpen) {
      return;
    }

    // Add our tag
    const value = event.value;
    if ((value || '').trim()) {
      this.selectTagByName(value.trim());
    }

    this.resetInputs();
  }

  private selectTagByName(name: string) {
    let foundtag = this.tags.filter(tag => tag.name == name);
    if (foundtag.length) {
      this.chipSelectedTags.push(foundtag[0]);
    } else {
      this.chipSelectedTags.push(this.tags.find(tag => tag.name.includes(name))!);
    }
  }

  public removetag(tag: Tag): void {
    const index = this.chipSelectedTags.indexOf(tag);
    if (index >= 0) {
      this.chipSelectedTags.splice(index, 1);
      this.resetInputs();
    }
  }

  public tagSelected(event: MatAutocompleteSelectedEvent): void {
    this.selectTagByName(event.option.value);
    this.resetInputs();
  }

  private resetInputs() {
    this.tagInput.nativeElement.value = '';
    this.tagControl.setValue(null);
  }

  getTags() {
    this.tagService.getAll().subscribe(
      res => {
        const { response } = res;
        this.tags = response;
      }
    )
  }

  goBack() {
    this.location.back();
  }

  formInit() {
    this.productForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      sku: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      stock: new FormControl('', Validators.required)
    });
  }

  isValidField(field: string): boolean | null {
    return this.productForm!.controls[field].errors && this.productForm!.controls[field].touched;
  }

  getFieldError(field: string): string | null {
    const FIELD_LOWER_CASE = field.toLowerCase();
    if (!this.productForm!.controls[FIELD_LOWER_CASE]) return null;

    const errors = this.productForm!.controls[FIELD_LOWER_CASE].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return `${field} is required`;

        default:
          break;
      }
    }

    return null;
  }

  formValidations() {
    this.chipSelectedTagsEmpty = false;
    if (this.productForm.invalid && this.chipSelectedTags.length === 0) {
      this.chipSelectedTagsEmpty = true;
      this.productForm.markAllAsTouched();
      return;
    }

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    if (this.chipSelectedTags.length === 0) {
      this.chipSelectedTagsEmpty = true;
      return;
    }

    this.save();
  }
  save() {
    this.product.name = this.productForm.value.name;
    this.product.description = this.productForm.value.description;
    this.product.image = this.productForm.value.image;
    this.product.price = this.productForm.value.price;
    this.product.sku = this.productForm.value.sku;
    this.product.stock = this.productForm.value.stock;
    this.product.tags = this.chipSelectedTags;

    this.productService.create(this.product).subscribe(
      res => {
        this.goBack();
      }
    )
  }
}
