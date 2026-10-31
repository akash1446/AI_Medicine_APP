package com.medicine.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.medicine.model.About;

@Repository
public interface AboutRepository extends JpaRepository<About, Long>{

}
