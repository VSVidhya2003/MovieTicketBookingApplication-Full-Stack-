package com.example.MovieBookingApplication.Service;

import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    public String processPayment(Long bookingId, Integer amount) {
        // In real world: integrate Razorpay, Stripe, PhonePe, Paytm, etc.
        return "Payment of ₹" + amount + " for booking " + bookingId + " is SUCCESSFUL";
    }
}
