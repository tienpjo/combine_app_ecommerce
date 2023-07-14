import { Component, HostListener, Inject, Input, OnInit, inject } from '@angular/core';
import { Category } from '../../models';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Observable, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
})
export class MenuBarComponent implements OnInit {
  position = 0;
  @Input() category: Category[];
  private scroll: number;
  display: string;

  @HostListener('window:scroll', []) onWindowScroll() {
    this.scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (this.scroll < 200) {
      this.display = 'none';
    } else {
      this.display = 'inherit';
    }
  }
  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly viewport: ViewportScroller
  ) {}

  readonly showScroll$: Observable<boolean> = fromEvent(this.document, 'scroll').pipe(
    map(() => this.viewport.getScrollPosition()?.[1] > 0)
  );

  ngOnInit(): void {
    //console.log(this.category);
  }

  onScrolling(): void {
    this.viewport.scrollToPosition([0, 0]);
  }
}
