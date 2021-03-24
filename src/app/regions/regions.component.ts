import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss']
})
export class RegionsComponent implements OnInit {
  @Input() regionList: any[] = [];
  constructor(
  ) { }
  
  ngOnInit(): void {
  }
}
