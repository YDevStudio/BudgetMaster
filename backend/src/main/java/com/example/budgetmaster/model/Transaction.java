package com.example.budgetmaster.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;



@Entity
@Table(name = "transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionType type;  // ✅ INCOME or EXPENSE
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}