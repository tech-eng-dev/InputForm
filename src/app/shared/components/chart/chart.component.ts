import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Person } from 'src/app/core/models/person.model';
import * as d3 from 'd3';
import { ChartMargin } from 'src/app/core/models/chart-margin.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('chartContainer') chartContainer: ElementRef;
  @Input() persons: Person[];
  @Input() chartMargin: ChartMargin;

  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const { persons } = changes;

    if (!!persons && !!persons?.currentValue) {
      if (this.chart) {
        this.updateChart();
      }
    }
  }

  ngAfterViewInit() {
    this.createChart();
    if (this.persons) {
      this.updateChart();
    }
  }

  private getXaxisProperty(person: Person): string {
    return `${person.name}(Age:${person.age} W:${person.weight})`;
  }

  private createChart() {
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.chartMargin.left - this.chartMargin.right;
    this.height = element.offsetHeight - this.chartMargin.top - this.chartMargin.bottom;
    let svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    // chart plot area
    this.chart = svg.append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${this.chartMargin.left}, ${this.chartMargin.top})`);

    const yMax = d3.max(this.persons, person => person.friends?.length);

    // define X & Y domains
    let xDomain = this.persons.map(person => this.getXaxisProperty(person));
    let yDomain = [0, yMax];

    // create scales
    this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
    this.yScale = d3.scaleLinear().domain(yDomain as number[]).range([this.height, 0]);

    // bar colors
    this.colors = d3.scaleLinear().domain([0, this.persons.length]).range(<any[]>['red', 'blue']);

    // x & y axis
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.chartMargin.left}, ${this.chartMargin.top + this.height})`)
      .call(d3.axisBottom(this.xScale));
    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.chartMargin.left}, ${this.chartMargin.top})`)
      .call(d3.axisLeft(this.yScale).ticks(yMax).tickFormat(d3.format('d') as any));
  }

  private updateChart() {
    const yMax = d3.max(this.persons, person => person.friends?.length);
    // update scales & axis
    this.xScale.domain(this.persons.map(person => this.getXaxisProperty(person)));
    this.yScale.domain([0, yMax]);
    this.colors.domain([0, this.persons.length]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    this.yAxis.transition().call(d3.axisLeft(this.yScale).ticks(yMax).tickFormat(d3.format('d') as any));

    let update = this.chart.selectAll('.bar')
      .data(this.persons);

    // remove exiting bars
    update.exit().remove();

    // update existing bars
    this.chart.selectAll('.bar').transition()
      .attr('x', (person: Person) => this.xScale(this.getXaxisProperty(person)))
      .attr('y', (person: Person) => this.yScale(person?.friends?.length))
      .attr('width', (_: Person) => this.xScale.bandwidth())
      .attr('height', (person: Person) => this.height - this.yScale(person?.friends?.length))
      .style('fill', (_: Person, i: number) => this.colors(i));

    // add new bars
    update
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (person: Person) => this.xScale(this.getXaxisProperty(person)))
      .attr('y', () => this.yScale(0))
      .attr('width', this.xScale.bandwidth())
      .attr('height', 0)
      .style('fill', (_: Person, i: number) => this.colors(i))
      .transition()
      .delay((_: Person, i: number) => i * 10)
      .attr('y', (person: Person) => this.yScale(person?.friends?.length))
      .attr('height', (person: Person) => this.height - this.yScale(person?.friends?.length));
  }
}
