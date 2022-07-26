import {ElementRef, Injectable} from '@angular/core';
import {TableColumn} from "../../models/dataModels/tableColumn";
import {of} from "rxjs";

export class TableHeaderRowCellsPosition {
  id: string;
  endX: number;
  startX: number;
  element: HTMLDivElement;
}

export class IndexRelativePosition {
  index: number;
  position: 'before' | 'after'
}

@Injectable()
export class CollDragService {
  private tableHeaderRow: ElementRef;
  private tableColumns: Array<TableColumn>;

  constructor() {
  }

  public getNextColumnPosition(event: MouseEvent, column: TableColumn): IndexRelativePosition {
    const positions = this.getTableHeaderRowCellsPositions();

    const headerCellPositions = positions
      .filter(position => position.id !== column.id);

    const subEventColumnPosition = headerCellPositions
      .find(position => position.startX <= event.clientX && position.endX > event.clientX);

    if (subEventColumnPosition != null) {
      const subEventColumnIndex = this.tableColumns
        .map(tableColumn => tableColumn.id)
        .indexOf(subEventColumnPosition.id);

      let dlx = event.clientX - subEventColumnPosition.startX;
      let drx = subEventColumnPosition.endX - event.clientX;

      return {
        index: subEventColumnIndex,
        position: (dlx < drx) ? 'before' : 'after'
      }
    } else {
      let columnIndex = this.tableColumns.map(tc => tc.id).indexOf(column.id);

      if (headerCellPositions.find(position => position.startX < event.clientX) != null) {
        if (columnIndex !== this.tableColumns.length - 1) {
          return {
            index: this.tableColumns.length - 1,
            position: 'after'
          }
        }
      }
      if (headerCellPositions.find(position => position.startX > event.clientX) != null) {
        if (columnIndex !== 0) {
          return {
            index: 0,
            position: 'before'
          }
        }
      }

      return null;
    }
  }

  private getTableHeaderRowCellsNodeList(): NodeList {
    return this.tableHeaderRow
      .nativeElement
      .querySelectorAll(`[table-header-row-cell="true"]`);
  }

  private getTableHeaderRowCellsArray(): Array<HTMLDivElement> {
    return Array.from(this.getTableHeaderRowCellsNodeList()) as Array<HTMLDivElement>;
  }

  private getTableHeaderRowCellsPositions(): Array<TableHeaderRowCellsPosition> {
    return this.getTableHeaderRowCellsArray().map(tableHeaderRowCell => {
      return {
        id: tableHeaderRowCell.getAttribute("column-id"),
        endX: tableHeaderRowCell.getBoundingClientRect().x + tableHeaderRowCell.getBoundingClientRect().width,
        startX: tableHeaderRowCell.getBoundingClientRect().x,
        element: tableHeaderRowCell,
      } as TableHeaderRowCellsPosition;
    }).sort((a, b) => {
      return a.startX - b.startX
    });
  }

  public setTableColumns(columns: Array<TableColumn>) {
    this.tableColumns = columns;
    return this;
  }

  public setTableHeaderRowElementRef(tableHeaderRow: ElementRef): CollDragService {
    this.tableHeaderRow = tableHeaderRow;
    return this;
  }
}
