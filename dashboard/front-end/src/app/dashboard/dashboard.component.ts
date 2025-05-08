import { Component, OnInit } from '@angular/core';
import * as ol from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Text from 'ol/style/Text';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchWarehouses();
  }

  fetchWarehouses(): void {
    this.http.get<any[]>('http://192.168.106.4:8001/api/warehouses').subscribe(
      (warehouses) => {
        this.initMap(warehouses);
      },
      (error) => {
        console.error("Error fetching warehouses:", error);
        this.initMap([]); // fallback
      }
    );
  }

  initMap(warehouses: any[]): void {
    const map = new ol.Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        })
      ],
      view: new View({
        center: fromLonLat([31.2330, 30.0330]),
        zoom: 6,
      })
    });

    const features = warehouses.map(warehouse => {
      const location = warehouse.location; // [lng, lat]
      const feature = new Feature({
        geometry: new Point(fromLonLat(location))
      });

      feature.set('name', warehouse.name);

      feature.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 10,
            fill: new Fill({ color: '#e74c3c' }),
            stroke: new Stroke({ color: '#fff', width: 2 })
          }),
          text: new Text({
            text: warehouse.name,
            offsetY: -20,
            fill: new Fill({ color: '#000' }),
            stroke: new Stroke({ color: '#fff', width: 3 }),
            font: '14px sans-serif'
          })
        })
      );

      return feature;
    });

    const vectorSource = new VectorSource({
      features: features
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    map.addLayer(vectorLayer);

    map.on('singleclick', (evt) => {
      map.forEachFeatureAtPixel(evt.pixel, (feature) => {
        const warehouseName = feature.get('name');
        if (warehouseName) {
          const encoded = encodeURIComponent(warehouseName);
          this.router.navigate(['/report', encoded]);
        }
      });
    });
  }
}

