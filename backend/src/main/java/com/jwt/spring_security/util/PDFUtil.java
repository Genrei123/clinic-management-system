package com.jwt.spring_security.util;

import com.itextpdf.forms.PdfAcroForm;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfReader;
import com.itextpdf.kernel.pdf.PdfWriter;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.IOException;
import java.util.Map;

public class PDFUtil {

    // This method populates the PDF form with values from a map
    public static void populatePdf(String templatePath, String outputPath, Map<String, String> fieldValues) throws IOException {
        // Load the PDF template from the resources folder (using classpath)
        File file = ResourceUtils.getFile("classpath:PDFTemplate/" + templatePath);  // Ensure the PDF is in the templates folder

        // Read the template and prepare the output
        PdfReader pdfReader = new PdfReader(file);
        PdfWriter pdfWriter = new PdfWriter(outputPath);
        PdfDocument pdfDocument = new PdfDocument(pdfReader, pdfWriter);

        // Get the form fields from the template
        PdfAcroForm form = PdfAcroForm.getAcroForm(pdfDocument, true);

        // Populate the form fields with values from the provided map
        for (Map.Entry<String, String> entry : fieldValues.entrySet()) {
            if (form.getField(entry.getKey()) != null) {  // Check if field exists
                form.getField(entry.getKey()).setValue(entry.getValue());
            }
        }

        // Optionally, flatten the fields so they can't be edited
        form.flattenFields();

        // Close the document to save the changes
        pdfDocument.close();
    }
}
