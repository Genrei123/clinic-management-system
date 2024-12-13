package com.jwt.spring_security.repo;

import com.jwt.spring_security.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<Service, Long> {
}
