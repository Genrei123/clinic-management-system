package com.jwt.spring_security.controller;

import com.jwt.spring_security.service.PDFService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@RestController
public class PDFController {

    @Autowired
    private PDFService pdfService;

    // Endpoint to generate the PDF and return it as a downloadable file
    @GetMapping("/generatepdf/{patientId}")
    public ResponseEntity<byte[]> generatePdf(@PathVariable Long patientId) {

        // Paths for the template and the output
        String outputPath = "output/Checkup" + patientId + ".pdf"; // Generated file path

        try {
            // Call PdfService to generate the PDF
            pdfService.generatePatientPdf(patientId, outputPath);

            // Prepare the file to be returned as a byte array
            File file = new File(outputPath);
            if (file.exists()) {
                byte[] fileContent = new byte[(int) file.length()];
                try (InputStream inputStream = new FileInputStream(file)) {
                    inputStream.read(fileContent);
                }

                // Set the appropriate headers for PDF file download
                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getName());
                headers.add(HttpHeaders.CONTENT_TYPE, "application/pdf");

                // Return the file as a byte array with headers
                return new ResponseEntity<>(fileContent, headers, HttpStatus.OK);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/generatecf1pdf/{patientId}")
    public ResponseEntity<byte[]> generateClaimForm1(@PathVariable Long patientId) {

        // Paths for the template and the output
        String outputPath2 = "output/ClaimForm1." + patientId + ".pdf"; // Generated file path

        try {
            // Call PdfService to generate the PDF
            pdfService.generateClaimForm1(patientId, outputPath2);

            // Prepare the file to be returned as a byte array
            File file = new File(outputPath2);
            if (file.exists()) {
                byte[] fileContent = new byte[(int) file.length()];
                try (InputStream inputStream = new FileInputStream(file)) {
                    inputStream.read(fileContent);
                }

                // Set the appropriate headers for PDF file download
                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getName());
                headers.add(HttpHeaders.CONTENT_TYPE, "application/pdf");

                // Return the file as a byte array with headers
                return new ResponseEntity<>(fileContent, headers, HttpStatus.OK);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/generatecf2pdf/{patientId}")
    public ResponseEntity<byte[]> generateClaimForm2(@PathVariable Long patientId) {

        // Paths for the template and the output
        String outputPath3 = "output/ClaimForm2." + patientId + ".pdf"; // Generated file path

        try {
            // Call PdfService to generate the PDF
            pdfService.generateClaimForm2(patientId, outputPath3);

            // Prepare the file to be returned as a byte array
            File file = new File(outputPath3);
            if (file.exists()) {
                byte[] fileContent = new byte[(int) file.length()];
                try (InputStream inputStream = new FileInputStream(file)) {
                    inputStream.read(fileContent);
                }

                // Set the appropriate headers for PDF file download
                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getName());
                headers.add(HttpHeaders.CONTENT_TYPE, "application/pdf");

                // Return the file as a byte array with headers
                return new ResponseEntity<>(fileContent, headers, HttpStatus.OK);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }


}
