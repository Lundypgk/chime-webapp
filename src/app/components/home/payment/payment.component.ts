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
    });
  }
}
