import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
})
export class PropertyDetailComponent implements OnInit {
  public propertyId: number;
  property = new Property();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private housingService: HousingService
  ) {}

  ngOnInit() {
    this.propertyId = +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data: any) => {
        this.property = data['prp'];
      }
    )

    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true
      },
    ];

    this.galleryImages = [
      {
        small: 'assets/images/house-1.jpg',
        medium: 'assets/images/house-1.jpg',
        big: 'assets/images/house-1.jpg'
      },
      {
        small: 'assets/images/house-1.jpg',
        medium: 'assets/images/house-1.jpg',
        big: 'assets/images/house-1.jpg'
      },
      {
        small: 'assets/images/house-1.jpg',
        medium: 'assets/images/house-1.jpg',
        big: 'assets/images/house-1.jpg'
      },
      {
        small: 'assets/images/house-1.jpg',
        medium: 'assets/images/house-1.jpg',
        big: 'assets/images/house-1.jpg'
      },
      {
        small: 'assets/images/house-1.jpg',
        medium: 'assets/images/house-1.jpg',
        big: 'assets/images/house-1.jpg'
      },
    ];
    this.property.age = this.housingService.getPropertyAge(new Date(this.property.estPossessionOn!));
    // this.route.params.subscribe((params) => {
    //   this.propertyId = +params['id'];
    //   this.housingService.getProperty(this.propertyId).subscribe(
    //     (data: Property) => {
    //       this.property = data;
    //     }, error => this.router.navigate(['/'])
    //   )
    // });
  }
}
