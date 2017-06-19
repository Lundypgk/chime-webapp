import { Component, OnInit } from '@angular/core';
import { PaymentService } from "app/services/payment.service";
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  dropin = require('braintree-web-drop-in');
  clientToken: String;
  payload: {};

  constructor(private paymentService: PaymentService,
    private _service: NotificationsService) { }

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
    }, (err, instance) => {
      //Listen to the payment method 
      instance.on('paymentMethodRequestable', (event) => {

        //Initate the payment
        instance.requestPaymentMethod((err, data) => {
          if (err) {
            console.log(err)
          }
          data.nonce = data.nonce;
          this.paymentService.checkOut(data).subscribe(data => {
            console.log(data.success);
            if (data.success) {
              this._service.success(
                'Success !',
                'Payment Success',
                {
                  timeOut: 3000,
                  pauseOnHover: false,
                  clickToClose: true
                }
              );
              instance.teardown();
              // location.reload;
            }
          })
        });
      });
    });
  }
}
