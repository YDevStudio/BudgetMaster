import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  transactions: any[] = [];
  chart: any;
  totalIncome = 0;
  totalExpense = 0;
  showCategories = false;
  showTransactions = false;
  private transactionSub!: Subscription;

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.loadTransactions();

    // ✅ Listen for transaction changes
    this.transactionSub = this.transactionService.getTransactionUpdateListener()
      .subscribe(() => {
        this.loadTransactions(); // Refresh totals and chart
      });
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe(data => {

      this.transactions = data;
      this.calculateTotals();
      this.renderChart();
    });
  }

  calculateTotals() {
    // ✅ Ensure we correctly filter INCOME & EXPENSE
    this.totalIncome = this.transactions
      .filter(t => t.type === 'INCOME')  // Use type instead of amount
      .reduce((sum, t) => sum + t.amount, 0);

    this.totalExpense = this.transactions
      .filter(t => t.type === 'EXPENSE')
      .reduce((sum, t) => sum + t.amount, 0);

  }

  renderChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    
    // ✅ Destroy previous chart instance if exists
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Income', 'Expense'],
        datasets: [{
          data: [this.totalIncome, this.totalExpense], // ✅ Use absolute values
          backgroundColor: ['#4CAF50', '#F44336'] // Green for income, Red for expense
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: "#333", // Improve contrast
              font: { size: 14 }
            }
          }
        }
      }
    });
  }

  toggleCategories() {
    this.showCategories = !this.showCategories;
  }

  toggleTransactions() {
    this.showTransactions = !this.showTransactions;
  }
}
