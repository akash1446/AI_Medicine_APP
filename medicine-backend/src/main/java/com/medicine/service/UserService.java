package com.medicine.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicine.model.User;
import com.medicine.repository.UserRespository;

@Service
public class UserService {

	@Autowired
	UserRespository userRespository;

//	public User findRegister(String email) {
//	User data  =	userRespository.findByEmail(email)
//		.orElseThrow(() -> new RuntimeException("User not found"));
//		return data;
//	}

	 public User register(User user) {
       return userRespository.save(user);

		}

	
	
}
