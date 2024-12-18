package com.jwt.spring_security.controller;

import com.jwt.spring_security.DTO.ClockOutRequest;
import com.jwt.spring_security.DTO.ClockOutResponse;
import com.jwt.spring_security.service.ClockOutService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clock-out")
public class ClockOutController {

    private final ClockOutService clockOutService;

    public ClockOutController(ClockOutService clockOutService) {
        this.clockOutService = clockOutService;
    }

    @PostMapping
    public ResponseEntity<?> clockOut(@RequestBody ClockOutRequest request) {
        clockOutService.saveClockOut(request);
        return ResponseEntity.ok("Successfully clocked out");
    }

    @GetMapping
    public ResponseEntity<List<ClockOutResponse>> getAllClockOuts() {
        List<ClockOutResponse> clockOuts = clockOutService.getAllClockOuts();
        return ResponseEntity.ok(clockOuts);
    }
}
