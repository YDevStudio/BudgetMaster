package com.example.budgetmaster.service;

import com.example.budgetmaster.model.Category;
import com.example.budgetmaster.repository.CategoryRepository;
import com.example.budgetmaster.repository.TransactionRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final TransactionRepository transactionRepository;

    public Category createCategory(String name) {
        Category category = Category.builder().name(name).build();
        return categoryRepository.save(category);
    }
    
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
    
    public Category updateCategory(Long id, String name) {
        Category category = categoryRepository.findById(id)
                           .orElseThrow(() -> new RuntimeException("Category not found"));
        category.setName(name);
        return categoryRepository.save(category);
    }

    public void deleteCategory(Long id) {
        // Check if any transactions are linked to this category
        if (transactionRepository.existsByCategoryId(id)) {
            throw new RuntimeException("Cannot delete category because it is linked to transactions.");
        }
        categoryRepository.deleteById(id);
    }
}