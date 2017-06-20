import { Component, OnInit } from '@angular/core';
import { PaymentService } from "app/services/payment.service";
import { NotificationsService } from "angular2-notifications";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  isPaid: boolean = false;
  dropin = require('braintree-web-drop-in');
  clientToken: String;
  payload: any = {};
  busy: Subscription;

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
          this.payload.nonce = data.nonce;
          // this.paymentService.checkOut(this.payload).subscribe(data => {
          //   console.log(data.success);
          //   if (data.success) {
          //     this._service.success(
          //       'Success !',
          //       'Payment Success',
          //       {
          //         timeOut: 3000,
          //         pauseOnHover: false,
          //         clickToClose: true
          //       }
          //     );
          //     instance.teardown();
          //     // location.reload;
          //   }
          // })
        });
      });
    });
  }

  onPayment() {
    if (!this.isEmpty(this.payload)) {
      this.isPaid = true;
      this.busy = this.paymentService.checkOut(this.payload).subscribe(data => {
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
        }
      });
    }
  }

  //Checking whether does object contain anything
  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }
}
