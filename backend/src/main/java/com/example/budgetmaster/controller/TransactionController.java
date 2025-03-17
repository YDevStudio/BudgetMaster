package com.example.budgetmaster.controller;

import com.example.budgetmaster.model.Transaction;
import com.example.budgetmaster.model.TransactionType;
import com.example.budgetmaster.model.User;
import com.example.budgetmaster.model.Category;
import com.example.budgetmaster.service.TransactionService;
import com.example.budgetmaster.repository.UserRepository;
import com.example.budgetmaster.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    @PostMapping
    public ResponseEntity<?> addTransaction(@RequestBody Transaction transaction, Authentication authentication) {
        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        // ✅ Ensure category is provided
        if (transaction.getCategory() == null || transaction.getCategory().getId() == null) {
            return ResponseEntity.badRequest().body("Category ID is required");
        }

        // ✅ Ensure transaction type is provided
        if (transaction.getType() == null) {
            return ResponseEntity.badRequest().body("Transaction type (INCOME or EXPENSE) is required.");
        }

        // Fetch category from database
        Optional<Category> category = categoryRepository.findById(transaction.getCategory().getId());
        if (category.isEmpty()) {
            return ResponseEntity.badRequest().body("Category not found");
        }

        transaction.setUser(user);
        transaction.setCategory(category.get());

        return ResponseEntity.ok(transactionService.addTransaction(transaction));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTransaction(@PathVariable Long id, @RequestBody Transaction transaction,
            Authentication authentication) {
        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Ensure category is provided
        if (transaction.getCategory() == null || transaction.getCategory().getId() == null) {
            return ResponseEntity.badRequest().body("Category ID is required");
        }

        // Fetch category from database
        Optional<Category> category = categoryRepository.findById(transaction.getCategory().getId());
        if (category.isEmpty()) {
            return ResponseEntity.badRequest().body("Category not found");
        }

        transaction.setId(id);
        transaction.setUser(user);
        transaction.setCategory(category.get());

        return ResponseEntity.ok(transactionService.updateTransaction(transaction));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Transaction deleted successfully.");
        return ResponseEntity.ok(response);
    }

    // @GetMapping
    // public ResponseEntity<List<Transaction>> getTransactions(Authentication
    // authentication) {
    // User user = userRepository.findByUsername(authentication.getName())
    // .orElseThrow(() -> new RuntimeException("User not found"));
    // return ResponseEntity.ok(transactionService.getTransactionsByUser(user));
    // }

    @GetMapping("/filter")
    public ResponseEntity<List<Transaction>> filterTransactions(@RequestParam String startDate,
            @RequestParam String endDate, Authentication authentication) {
        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        return ResponseEntity.ok(transactionService.getTransactionsByUserAndDateRange(user, start, end));
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> getTransactions(Authentication authentication) {
        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(transactionService.getTransactionsByUser(user));
    }

}
