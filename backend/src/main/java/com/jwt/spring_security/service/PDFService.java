package com.jwt.spring_security.service;

import com.jwt.spring_security.model.Patient;
import com.jwt.spring_security.repo.PatientRepo;
import com.jwt.spring_security.util.PDFUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class PDFService {

    @Autowired
    private PatientRepo patientRepo;

    // Refactored generatePatientPdf method
    public void generatePatientPdf(Long patientId, String outputPath) throws IOException {
        // Fetch data from the database (Patient details)
        Patient patient = patientRepo.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        // Prepare the data to be filled into the form
        Map<String, String> fieldValues = new HashMap<>();

        // Always populate required fields from the Patient entity
        fieldValues.put("ClientNumber", String.valueOf(patient.getClientID()));
        fieldValues.put("LastName", patient.getLastName());
        fieldValues.put("GivenName", patient.getGivenName());

        // Convert Character to String for MiddleInitial
        fieldValues.put("MiddleInitial", String.valueOf(patient.getMiddleInitial()));  // Converts char to String

        fieldValues.put("Address", patient.getAddress());
        fieldValues.put("Age", String.valueOf(patient.getAge()));
        fieldValues.put("Birthday", patient.getBirthday().toString());  // Assuming DateTime format
        fieldValues.put("Religion", patient.getReligion());
        fieldValues.put("Occupation", patient.getOccupation());

        if (patient.getSpouse() != null) {
            fieldValues.put("NameOfSpouse", patient.getSpouse().getSpouse_name());
            fieldValues.put("SpouseBirthday", patient.getSpouse().getSpouse_birthday());
            fieldValues.put("SpouseReligion", patient.getSpouse().getSpouse_religion());
            fieldValues.put("SpouseOccupation", patient.getSpouse().getSpouse_occupation());
            fieldValues.put("ContactNo", patient.getSpouse().getSpouse_contact_number());

            // Calculate SpouseAge if it's available in the Spouse object
            String spouseAge = String.valueOf(patient.getSpouse().getSpouse_age());
            fieldValues.put("SpouseAge", spouseAge);
        } else {
            // If no spouse exists, set empty or default values for spouse fields
            fieldValues.put("NameOfSpouse", "");
            fieldValues.put("SpouseAge", "");
            fieldValues.put("SpouseBirthday", "");
            fieldValues.put("SpouseReligion", "");
            fieldValues.put("SpouseOccupation", "");
            fieldValues.put("ContactNo", "");
        }

        // Template path will be fetched from the resources folder (e.g., form.pdf)
        String templatePath = "JimireneCheckUp.pdf";  // Name of the PDF file in the templates folder

        // Ensure the output directory exists, if not create it
        File outputDir = new File("output");
        if (!outputDir.exists()) {
            outputDir.mkdir(); // Create the directory if it does not exist
        }

        // Call PDFUtil to generate the filled PDF
        PDFUtil.populatePdf(templatePath, outputPath, fieldValues);
    }

    public void generateClaimForm1(Long patientId, String outputPath2) throws IOException {
        // Fetch patient details based on patientId (simulate it)
        Patient patient = patientRepo.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        // Prepare the data to be filled into the Claim Form
        Map<String, String> fieldValues = new HashMap<>();

        // Populate required fields from the Patient entity
        fieldValues.put("MI_last_name", patient.getLastName()); // Last Name
        fieldValues.put("MI_first_name", patient.getGivenName()); // First Name

        // Fetch spouse's contact number if available
        if (patient.getSpouse() != null) {
            fieldValues.put("MI_mobile_no", patient.getSpouse().getSpouse_contact_number());
        } else {
            fieldValues.put("MI_mobile_no", ""); // Leave blank if no spouse
        }

        // Template path (should point to the Claim Form 1 PDF in resources or templates folder)
        String templatePath = "ClaimForm1.pdf";  // Name of the PDF file for the claim form

        // Ensure the output directory exists, if not create it
        File outputDir = new File("output");
        if (!outputDir.exists()) {
            outputDir.mkdir(); // Create the directory if it does not exist
        }

        // Call PDFUtil to generate the filled Claim Form 1 PDF
        PDFUtil.populatePdf(templatePath, outputPath2, fieldValues);
    }
    public void generateClaimForm2(Long patientId, String outputPath3) throws IOException {
        // Fetch patient details based on patientId (simulate it)
        Patient patient = patientRepo.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        // Prepare the data to be filled into the Claim Form
        Map<String, String> fieldValues = new HashMap<>();

        // Populate required fields from the Patient entity
        fieldValues.put("last_name", patient.getLastName()); // Last Name
        fieldValues.put("first_name", patient.getGivenName()); // First Name


        // Template path (should point to the Claim Form 2 PDF in resources or templates folder)
        String templatePath = "ClaimForm2.pdf";  // Name of the PDF file for the claim form

        // Ensure the output directory exists, if not create it
        File outputDir = new File("output");
        if (!outputDir.exists()) {
            outputDir.mkdir(); // Create the directory if it does not exist
        }

        // Call PDFUtil to generate the filled Claim Form 2 PDF
        PDFUtil.populatePdf(templatePath, outputPath3, fieldValues);
    }
}
