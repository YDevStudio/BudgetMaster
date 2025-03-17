import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  categoryForm: FormGroup;
  isEditMode = false;
  editCategoryId: number | null = null;

  constructor(private categoryService: CategoryService, private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onSubmit() {
    if(this.categoryForm.valid) {
      if(this.isEditMode && this.editCategoryId !== null) {
        this.categoryService.updateCategory(this.editCategoryId, this.categoryForm.value)
          .subscribe(() => {
            this.loadCategories();
            this.isEditMode = false;
            this.editCategoryId = null;
            this.categoryForm.reset();
          });
      } else {
        this.categoryService.addCategory(this.categoryForm.value)
          .subscribe(() => {
            this.loadCategories();
            this.categoryForm.reset();
          });
      }
    }
  }

  editCategory(category: any) {
    this.isEditMode = true;
    this.editCategoryId = category.id;
    this.categoryForm.patchValue({
      name: category.name
    });
  }

  deleteCategory(id: number) {
    if (confirm("Are you sure you want to delete this category?")) {
      this.categoryService.deleteCategory(id)
        .subscribe({
          next: (res) => {
            alert(res.message); // ✅ Display backend response message
            this.loadCategories();
          },
          error: (err) => alert(err.error?.message || "Error deleting category")
        });
    }
  }
  
  
}