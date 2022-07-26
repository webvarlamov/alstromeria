import {
  ChangeDetectionStrategy,
  Component, ComponentFactory,
  ComponentFactoryResolver, ComponentRef, Injector,
  Input, OnChanges,
  OnInit, SimpleChanges,
  ViewContainerRef, ViewRef
} from '@angular/core';
import {TableRow} from "../../models/dataModels/tableRow";
import {TableColumn} from "../../models/dataModels/tableColumn";
import {TableCellDynamicComponent} from "../../models/common/table-cell-dynamic-component";

@Component({
  selector: 'app-cell-template-resolver',
  templateUrl: './cell-dynamic-component-resolver.component.html',
  styleUrls: ['./cell-dynamic-component-resolver.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellDynamicComponentResolver implements OnInit, OnChanges {
  private innerComponentRef: ComponentRef<TableCellDynamicComponent>;

  @Input() tableRow: TableRow;
  @Input() tableColumn: TableColumn;

  constructor(
    public viewContainerRef: ViewContainerRef,
    public componentFactoryResolver: ComponentFactoryResolver,
    public injector: Injector
  ) { }

  ngOnInit(): void {
    if (this.tableColumn?.dynamicCellComponent != null) {
      let componentFactory: ComponentFactory<TableCellDynamicComponent> = this.componentFactoryResolver
        .resolveComponentFactory(this.tableColumn.dynamicCellComponent);
      let componentRef: ComponentRef<TableCellDynamicComponent> = componentFactory.create(this.injector);
      this.innerComponentRef = componentRef;

      this.innerComponentRef.instance.tableRow$.next(this.tableRow)
      this.innerComponentRef.instance.tableColumn$.next(this.tableColumn)
      this.innerComponentRef.instance.eventHandler = this.tableColumn.dynamicCellComponentEventHandler;

      let hostView: ViewRef = componentRef.hostView;

      this.viewContainerRef.insert(hostView);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.innerComponentRef != null) {
        this.innerComponentRef.instance.tableRow$.next(this.tableRow)
        this.innerComponentRef.instance.tableColumn$.next(this.tableColumn)
    }
  }
}
