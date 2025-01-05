import { Component, OnInit } from '@angular/core';
import { DealerService } from '../dealer.service';
import { Dealer } from './dealer.model';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dealers',
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.css']
})
export class DealersComponent implements OnInit {
  displayedColumns: string[] = ['Sr.No', 'name', 'car', 'totalBudget', 'remainingBudget', 'actions'];
  dealers: Dealer[] = [];
  searchQuery: string = '';
  Modaltitle: any = 'form';
  dealerForm: FormGroup | any;

  constructor(private dealerService: DealerService, private router: Router, private fb: FormBuilder) {
    this.dealerForm = this.fb.group({
      name: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      car: ['', Validators.required],
      totalBudget: ['', [Validators.required, Validators.min(0)]],
      remainingBudget: ['', [Validators.required, Validators.min(0)]],
      id: ['', [Validators.required,]]
    });
  }

  ngOnInit(): void {
    this.getAllDealer();
  }

  getAllDealer() {
    this.dealerService.getDealers().subscribe(data => {
      this.dealers = data;
    });
  }

  filterDealers(): Dealer[] {
    if (!this.searchQuery.trim()) {
      return this.dealers;
    }
    return this.dealers.filter(dealer => dealer.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  deleteDealer(dealer: any): void {
    console.log(typeof dealer.id);
    this.dealerService.deleteDealer(dealer.id).subscribe(() => {
      // this.dealers = this.dealers.filter(dealer => dealer.id !== id);
      this.getAllDealer();
    });
  }

  // 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchQuery = filterValue;
    if (!this.searchQuery.trim()) {
      this.getAllDealer();
    }
    this.dealers = this.filterDealers();
  }

  openAddEditorviewDialog(item: any, check: any): void {

    if (check === 'edit') {
      this.dealerForm.enable();
      this.Modaltitle = 'Edit Dealer';
      this.dealerForm.patchValue({
        id: item?.id,
        name: item?.name,
        totalBudget: item?.totalBudget,
        remainingBudget: item?.remainingBudget,
        latitude: item?.location?.latitude,
        longitude: item?.location?.longitude,
        firstName: item?.owner?.firstName,
        lastName: item?.owner?.lastName,
      });
    }
    else if (check === 'add') {
      this.dealerForm.reset();
      this.dealerForm.enable();
      this.Modaltitle = 'Add Dealer';
    }
  }
  submitform() {
    if (this.Modaltitle === 'Add Dealer') {
      this.addDealer();
      this.dealerForm.reset();
    }
    else if (this.Modaltitle === 'Edit Dealer') {
      this.updateDealer();
    }

  }
  updateDealer() {
    let body: Dealer = {
      id: this.dealerForm.value.id,
      name: this.dealerForm.value.name,
      totalBudget: this.dealerForm.value.totalBudget,
      remainingBudget: this.dealerForm.value.remainingBudget,
      location: { latitude: this.dealerForm.value.latitude, longitude: this.dealerForm.value.longitude },
      cars: [],
      owner: {
        firstName: this.dealerForm.value.firstName,
        lastName: this.dealerForm.value.lastName
      }
    }
    console.log(body);
    this.dealerService.updateDealer(body.id, body).subscribe(data => {
      console.log(data, 'Dealer Updated Successfully');
      this.dealerForm.reset();
      this.getAllDealer();
    });

  }

  addDealer() {
    let body: Dealer = {
      id: this.dealerForm.value.id,
      name: this.dealerForm.value.name,
      totalBudget: this.dealerForm.value.totalBudget,
      remainingBudget: this.dealerForm.value.remainingBudget,
      location: { latitude: this.dealerForm.value.latitude, longitude: this.dealerForm.value.longitude },
      cars: [],
      owner: {
        firstName: this.dealerForm.value.firstName,
        lastName: this.dealerForm.value.lastName
      }
    }

    this.dealerService.addDealer(body).subscribe(data => {
      this.getAllDealer();
    });
  }
  naviagteToCar(id: any) {
    console.log(id);
    this.router.navigate(['/cars', id]);
  }
}