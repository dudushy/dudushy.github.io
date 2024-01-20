import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-svg-renderer',
  templateUrl: './svg-renderer.component.html',
  styleUrl: './svg-renderer.component.scss'
})
export class SvgRendererComponent implements OnInit, AfterViewInit {
  title = 'SvgRendererComponent';

  @Input() svgFilePath!: string;
  @ViewChild('svgContainer', { static: true }) svgContainer!: ElementRef;

  constructor() {
    console.log(`[${this.title}#constructor]`);
  }

  ngOnInit() {
    console.log(`[${this.title}#ngOnInit]`);
  }

  ngAfterViewInit() {
    console.log(`[${this.title}#ngAfterViewInit]`);

    this.loadSvgFile();
  }

  loadSvgFile() {
    fetch(this.svgFilePath)
      .then(response => response.text())
      .then(svgData => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgData, 'image/svg+xml');
        const svgElement = svgDoc.querySelector('svg');
        this.svgContainer.nativeElement.appendChild(svgElement);
      })
      .catch(error => {
        console.log(`[${this.title}#loadSvgFile] error`, error);

        this.svgContainer.nativeElement.innerHTML = `<p>Failed to load SVG file: ${this.svgFilePath}</p>`;
      });
  }
}
