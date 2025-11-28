package com.example.MovieBookingApplication.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.MovieBookingApplication.Service.PaymentService;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/{bookingId}/{amount}")
    public String pay(@PathVariable Long bookingId, @PathVariable Integer amount) {
        return paymentService.processPayment(bookingId, amount);
    }
}
