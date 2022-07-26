import { Injectable } from '@angular/core';
import {DefaultFilterExpressionBuilderImpl} from "./default-filter-expression-builder-impl";

@Injectable({
  providedIn: 'root'
})
export class DefaultFilterExpressionBuilderService extends DefaultFilterExpressionBuilderImpl {
}
