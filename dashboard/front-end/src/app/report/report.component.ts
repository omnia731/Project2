import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WarehouseService } from '../warehouse.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  warehouseName: string | null = '';
  warehouseItems: any[] = [];
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private warehouseService: WarehouseService
  ) {}

  ngOnInit(): void {
    this.warehouseName = decodeURIComponent(this.route.snapshot.paramMap.get('name') || '');

    this.warehouseService.getItemsByWarehouseName(this.warehouseName).subscribe(
      (items) => {
        this.warehouseItems = items;
        this.isLoading = false;
      },
      (error) => {
        console.error('❌ Error fetching warehouse items:', error);
        this.isLoading = false;
      }
    );
  }
}

