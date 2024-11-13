package com.jwt.spring_security.service;

import com.jwt.spring_security.util.QRCodeGenerator;

import org.springframework.stereotype.Service;

import java.awt.image.BufferedImage;

@Service
public class QRCodeService {

    public BufferedImage generateQRCode(String text) throws Exception {
        return QRCodeGenerator.generateQRCodeImage(text);
    }
}
