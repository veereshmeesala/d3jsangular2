import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";

import { ChartData } from './shared/data';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>
    <svg width="960" height="500"></svg>
  `
})
export class AppComponent implements OnInit {

  title: string = 'Pie Chart using d3 & angular';

  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width: number;
  private height: number;
  private radius: number;

  private arc: any;
  private labelArc: any;
  private pie: any;
  private color: any;
  private svg: any;

  constructor() {
    this.width = 900 - this.margin.left - this.margin.right ;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  ngOnInit() {
    this.initSvg()
    this.drawPie();
  }

  private initSvg() {
    this.color = d3Scale.scaleOrdinal()
                        .range(["#3fb4f9", "#90c564", "#e3524f", "#ffae00", "#e43045", "#5a7ccc", "#ff8c00"]);
    this.arc = d3Shape.arc()
                      .outerRadius(this.radius - 10)
                      .innerRadius(0);
    this.labelArc = d3Shape.arc()
                           .outerRadius(this.radius - 40)
                           .innerRadius(this.radius - 40);
    this.pie = d3Shape.pie()
                      .sort(null)
                      .value((d: any) => d.rating);
    this.svg = d3.select("svg")
                 .append("g")
                 .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");;
  }

  private drawPie() {
    let g = this.svg.selectAll(".arc")
                    .data(this.pie(ChartData))
                    .enter().append("g")
                    .attr("class", "arc");
    g.append("path").attr("d", this.arc)
                    .style("fill", (d: any) => this.color(d.data.skill) );
    g.append("text").attr("transform", (d: any) => "translate(" + this.labelArc.centroid(d) + ")")
                    .attr("dy", ".35em")
                    .text((d: any) => d.data.skill);
  }

}
