package com.medicine.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicine.model.Medicine;
import com.medicine.repository.MedicineRepository;

@Service
public class MedicineService {
	
	@Autowired
	MedicineRepository medicineRepository;

	
   public Medicine saveMedicine(Medicine medicine) {
     Medicine	medicineDetails	= medicineRepository.save(medicine);
		return medicineDetails;
	}
	
   public List<Medicine> getAllMedicines() {
		 List<Medicine> medicinedata =  medicineRepository.findAll();
			return  medicinedata;
		}

   public List<Medicine> saveAllMedicineData(List<Medicine> medicines) {

       // Check if list is empty
       if (medicines == null || medicines.isEmpty()) {
           throw new IllegalArgumentException("Medicine list cannot be empty.");
       }

       // Validate each medicine
       medicines.forEach(med -> {

           if (med.getName() == null || med.getName().trim().isEmpty()) {
               throw new IllegalArgumentException("Medicine name is required.");
           }

           if (med.getPrice() <= 0) {
               throw new IllegalArgumentException(
                       "Price must be greater than 0 for medicine: " + med.getName()
               );
           }

           if (med.getImg() == null || med.getImg().trim().isEmpty()) {
               throw new IllegalArgumentException(
                       "Image URL is required for medicine: " + med.getName()
               );
           }
       });

       // Save all medicines
       return medicineRepository.saveAll(medicines);
   }
}



