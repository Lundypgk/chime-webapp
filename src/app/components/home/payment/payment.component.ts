import { Component, OnInit } from '@angular/core';
import { PaymentService } from "app/services/payment.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  dropin = require('braintree-web-drop-in');
  clientToken: String;

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
    this.paymentService.retrieveToken().subscribe(data => {
      this.clientToken = data;
      this.dropInPayment();
    })
  }

  dropInPayment() {
    this.dropin.create({
      authorization: this.clientToken,
      container: '#dropin-container',
      paypal: {
        flow: 'vault'
      }
    }, function (err, instance) {
      //Listen to the payment method 
      instance.on('paymentMethodRequestable', function (event) {
        console.log(event.type); // The type of Payment Method, e.g 'CreditCard', 'PayPalAccount'.
        //Initate the payment
        instance.requestPaymentMethod(function (err, payload) {
          if (err) {
            console.log(err)
          }
          else {
            console.log("payload" + payload.nonce);
            this.paymentService.checkOut(payload).subscribe(data => {

            })
          }
        });
      });
    });
  }

  submitPayment() {

  }
}
