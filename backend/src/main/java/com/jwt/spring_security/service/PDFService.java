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
        fieldValues.put("DateOfLastDelivery", patient.getLastDelivery() != null ? patient.getLastDelivery().toString() : "");  // Handle nulls

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
}
