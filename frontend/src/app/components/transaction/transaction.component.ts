import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions: any[] = [];
  categories: any[] = [];
  transactionForm: FormGroup;
  categoryForm: FormGroup;
  showCategoryForm = false;
  isEditMode = false;
  editTransactionId: number | null = null;

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.transactionForm = this.fb.group({
      amount: [0, Validators.required],
      date: ['', Validators.required],
      category: ['', Validators.required],
      type: ['INCOME', Validators.required],
    });

    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTransactions();
    this.loadCategories();
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe(data => {
  
      // ✅ Ensure it shows both INCOME & EXPENSE
      this.transactions = data; 
    });
  }
  

  loadCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const selectedCategoryId = this.transactionForm.value.category;
      const transactionData = {
        amount: this.transactionForm.value.amount,
        date: this.transactionForm.value.date,
        type: this.transactionForm.value.type || 'INCOME',  // ✅ Ensure type is sent
        category: { id: selectedCategoryId }
      };
  
      const headers = { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` };
      
      if (this.isEditMode && this.editTransactionId !== null) {
        this.transactionService.updateTransaction(this.editTransactionId, transactionData, headers)
          .subscribe(() => {
            this.loadTransactions();
            this.isEditMode = false;
            this.editTransactionId = null;
            this.transactionForm.reset();
          });
      } else {
        this.transactionService.addTransaction(transactionData, headers)
          .subscribe(() => {
            this.loadTransactions();
            this.transactionForm.reset();
          });
      }
    }
  }
  
  

  editTransaction(transaction: any) {
    this.isEditMode = true;
    this.editTransactionId = transaction.id;
    this.transactionForm.patchValue({
      amount: transaction.amount,
      date: transaction.date,
      category: transaction.category.id // Set ID in dropdown
    });
  }

  deleteTransaction(id: number) {
    if (confirm("Are you sure you want to delete this transaction?")) {
      this.transactionService.deleteTransaction(id)
        .subscribe({
          next: (res) => {
            alert(res.message); // ✅ Display backend response message
            this.loadTransactions();
          },
          error: (err) => alert(err.error?.message || "Error deleting transaction")
        });
    }
  }
  
  

  toggleCategoryForm() {
    this.showCategoryForm = !this.showCategoryForm;
  }

  addCategory() {
    if (this.categoryForm.valid) {
      this.categoryService.addCategory(this.categoryForm.value)
        .subscribe(() => {
          this.loadCategories();
          this.categoryForm.reset();
          this.showCategoryForm = false;
        });
    }
  }
}
