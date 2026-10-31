package com.medicine.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicine.model.Contact;
import com.medicine.repository.ContactRepository;

@Service
public class ContactService {
	
	@Autowired
	private ContactRepository contactRepository;

	public Contact save(Contact contact){

	return contactRepository.save(contact);

	}
}
