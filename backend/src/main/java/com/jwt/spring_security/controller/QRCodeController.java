package com.jwt.spring_security.controller;

import com.jwt.spring_security.service.QRCodeService;
import com.jwt.spring_security.model.Patient;
import com.jwt.spring_security.service.PatientService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import javax.imageio.ImageIO;

@RestController
public class QRCodeController {

    @Autowired
    private QRCodeService qrCodeService;

    @Autowired
    private PatientService patientService;

    @GetMapping("/generateqr")
    public ResponseEntity<byte[]> generateQRCode(@RequestParam Long clientId) throws Exception {
        Patient patient = patientService.findById(clientId);

        if (patient == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        String qrCodeContent = "Patient ID: " + patient.getId() + ", Name: " + patient.getName();

        BufferedImage qrCodeImage = qrCodeService.generateQRCode(qrCodeContent);

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        ImageIO.write(qrCodeImage, "PNG", byteArrayOutputStream);
        byte[] imageBytes = byteArrayOutputStream.toByteArray();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "image/png");

        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
    }
}
