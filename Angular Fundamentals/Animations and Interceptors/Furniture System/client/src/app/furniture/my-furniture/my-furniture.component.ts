import { Component, OnInit } from '@angular/core';
import { FurnitureService } from '../furniture.service';
import { Observable } from 'rxjs';
import { FurnitureModel } from '../models/furniture.model';
import { Router } from '@angular/router';
import { deteleAnimation } from '../furniture.animation';

@Component({
  selector: 'app-my-furniture',
  templateUrl: './my-furniture.component.html',
  styleUrls: ['./my-furniture.component.css'],
  animations: deteleAnimation
})
export class MyFurnitureComponent implements OnInit {
  furnitures: FurnitureModel[];

  constructor(private furnitureService: FurnitureService) { }

  ngOnInit() {
    this.furnitureService.getMyFurniture().subscribe(data => {
      this.furnitures = data;
    });
  }

  deleteItem(id: string) {
    this.furnitureService.deleteFurniture(id).subscribe(() => {
      this.furnitures = this.furnitures.filter(f => f.id !== id);
    });
  }
}
