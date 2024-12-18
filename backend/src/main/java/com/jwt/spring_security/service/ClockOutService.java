package com.jwt.spring_security.service;

import com.jwt.spring_security.DTO.ClockOutRequest;
import com.jwt.spring_security.DTO.ClockOutResponse;
import com.jwt.spring_security.model.ClockOut;
import com.jwt.spring_security.repo.ClockOutRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClockOutService {

    private final ClockOutRepository clockOutRepository;

    public ClockOutService(ClockOutRepository clockOutRepository) {
        this.clockOutRepository = clockOutRepository;
    }

    public void saveClockOut(ClockOutRequest request) {
        ClockOut clockOut = new ClockOut();
        clockOut.setEmployeeId(request.getEmployeeId());
        clockOut.setBranchId(request.getBranchId());
        clockOut.setTimestamp(LocalDateTime.now());
        clockOutRepository.save(clockOut);
    }

    public List<ClockOutResponse> getAllClockOuts() {
        return clockOutRepository.findAll().stream()
                .map(clockOut -> new ClockOutResponse(
                        clockOut.getId(),
                        clockOut.getEmployeeId(),
                        clockOut.getBranchId(),
                        clockOut.getTimestamp()
                ))
                .collect(Collectors.toList());
    }
}
