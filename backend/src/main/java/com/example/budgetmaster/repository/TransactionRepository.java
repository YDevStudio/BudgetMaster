package com.example.budgetmaster.repository;

import com.example.budgetmaster.model.Transaction;
import com.example.budgetmaster.model.TransactionType;
import com.example.budgetmaster.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUser(User user);
    List<Transaction> findByUserAndDateBetween(User user, LocalDate start, LocalDate end);
    List<Transaction> findByUserAndType(User user, TransactionType type); // ✅ Filter by type
    boolean existsByCategoryId(Long categoryId);
}
