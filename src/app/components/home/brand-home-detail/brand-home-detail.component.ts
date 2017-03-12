import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-brand-home-detail',
  templateUrl: './brand-home-detail.component.html',
  styleUrls: ['./brand-home-detail.component.css']
})
export class BrandHomeDetailComponent implements OnInit {
  id : any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route
        .queryParams
        .subscribe(params => {
            this.id = params['id'];
        });
  }
}
