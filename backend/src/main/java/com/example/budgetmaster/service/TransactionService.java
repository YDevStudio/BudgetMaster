package com.example.budgetmaster.service;

import com.example.budgetmaster.model.Transaction;
import com.example.budgetmaster.model.Category;
import com.example.budgetmaster.model.TransactionType;
import com.example.budgetmaster.model.User;
import com.example.budgetmaster.repository.TransactionRepository;
import com.example.budgetmaster.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final CategoryRepository categoryRepository; // ✅ Inject CategoryRepository

    @Transactional
    public Transaction addTransaction(Transaction transaction) {
        if (transaction.getCategory() == null || transaction.getCategory().getId() == null) {
            throw new IllegalArgumentException("Category ID is required");
        }

        // Fetch category from the database
        Optional<Category> categoryOptional = categoryRepository.findById(transaction.getCategory().getId());
        if (categoryOptional.isEmpty()) {
            throw new IllegalArgumentException("Category not found with ID: " + transaction.getCategory().getId());
        }

        // Ensure type is set (default to INCOME if not provided)
        if (transaction.getType() == null) {
            transaction.setType(TransactionType.INCOME);
        }

        // Set the full category object
        transaction.setCategory(categoryOptional.get());

        return transactionRepository.save(transaction);
    }

    public Transaction updateTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }

    public List<Transaction> getTransactionsByUser(User user) {
        return transactionRepository.findByUser(user);
    }

    public List<Transaction> getTransactionsByUserAndType(User user, TransactionType type) {
        return transactionRepository.findByUserAndType(user, type);
    }

    public List<Transaction> getTransactionsByUserAndDateRange(User user, LocalDate start, LocalDate end) {
        return transactionRepository.findByUserAndDateBetween(user, start, end);
    }
}
