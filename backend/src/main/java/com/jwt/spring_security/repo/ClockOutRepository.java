package com.jwt.spring_security.repo;

import com.jwt.spring_security.model.ClockOut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClockOutRepository extends JpaRepository<ClockOut, Long> {
}
