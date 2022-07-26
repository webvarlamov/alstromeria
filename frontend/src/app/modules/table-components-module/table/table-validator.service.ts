import { Injectable } from '@angular/core';
import {TableComponent} from "./table.component";

@Injectable()
export class TableValidatorService {

  constructor() { }

  public validate(tableComponent: TableComponent<any>): void {
    // tableComponent;
  }
}
