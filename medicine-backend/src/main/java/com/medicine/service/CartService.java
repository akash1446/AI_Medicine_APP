package com.medicine.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicine.model.Cart;
import com.medicine.repository.CartRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    // Saves a single item (kept for backward compatibility / other callers)
    public Cart addToCart(Cart cart) {
        return cartRepository.save(cart);
    }

    // Saves the whole order (list of items) in one call — matches the frontend payload
    public List<Cart> addAllToCart(List<Cart> carts) {
        return cartRepository.saveAll(carts);
    }

    public List<Cart> getCart(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    public void deleteCart(Long id) {
        cartRepository.deleteById(id);
    }
}