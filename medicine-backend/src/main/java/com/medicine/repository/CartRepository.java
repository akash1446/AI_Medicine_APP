package com.medicine.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medicine.model.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findByUserId(Long userId);
}