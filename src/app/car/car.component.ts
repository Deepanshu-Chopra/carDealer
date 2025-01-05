import { Component, OnInit } from '@angular/core';
import { Car, Dealer } from '../dealers/dealer.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../car.service';
import { DealerService } from '../dealer.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  displayedColumns: string[] = ['Sr.No', 'name', 'model', 'brand', 'price', 'actions'];
  car: any;
  searchQuery: string = '';
  Modaltitle: any = 'form';
  carForm: FormGroup | any;
  dealerId: any;

  constructor(private DealerService: DealerService, private carService: CarService, private router: ActivatedRoute, private fb: FormBuilder) {
    this.dealerId = this.router.snapshot.paramMap.get('id');
    console.log('Car ID:', typeof this.dealerId);
    this.carForm = this.fb.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
      model: ['', Validators.required],
      brand: ['', Validators.required],
      color: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.getAllCar();
  }

  getAllCar() {
    this.DealerService.getDealerById(this.dealerId).subscribe(data => {
      console.log(data);
      this.car = data.cars;
    });
  }

  filtercars(): Car[] {
    if (!this.searchQuery.trim()) {
      return this.car;
    }
    return this.car.filter((car: any) => car.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  deletecar(car: any): void {
    this.carService.deleteCar(this.dealerId, car.id).subscribe(() => {
      this.getAllCar();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchQuery = filterValue;
    if (!this.searchQuery.trim()) {
      this.getAllCar();
    }
    this.car = this.filtercars();
  }

  openAddEditorviewDialog(item: any, check: any): void {
    console.log(item, 'Item');
    if (check === 'edit') {
      this.Modaltitle = 'Edit Car';
      this.carForm.patchValue({
        id: item?.id,
        name: item?.name,
        model: item?.model,
        brand: item?.brand,
        color: item?.color,
        price: item?.price
      });
    } else if (check === 'add') {
      this.carForm.reset();
      this.Modaltitle = 'Add Car';
    }
  }

  submitform() {
    if (this.Modaltitle === 'Add Car') {
      this.addcar();
      this.carForm.reset();
    } else if (this.Modaltitle === 'Edit Car') {
      this.updatecars();
    }
  }

  updatecars() {
    let body: Car = {
      id: this.carForm.value.id,
      name: this.carForm.value.name,
      model: this.carForm.value.model,
      brand: this.carForm.value.brand,
      color: this.carForm.value.color,
      price: this.carForm.value.price
    }
    console.log(body, 'Update Car');
    this.carService.updateCar(this.dealerId, body).subscribe(data => {
      console.log(data, 'cars Updated Successfully');
      this.carForm.reset();
      this.getAllCar();
    });
  }

  addcar() {
    let body: Car = {
      id: this.carForm.value.id,
      name: this.carForm.value.name,
      model: this.carForm.value.model,
      brand: this.carForm.value.brand,
      color: this.carForm.value.color,
      price: this.carForm.value.price
    }
    console.log(body);
    this.carService.addCar(this.dealerId, body).subscribe(data => {
      this.getAllCar();
    });
  }

}
