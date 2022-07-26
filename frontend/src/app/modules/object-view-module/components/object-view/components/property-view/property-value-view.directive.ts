import {Directive, Input, OnInit} from "@angular/core";
import {ObjectViewComponent} from "../../object-view.component";
import {TypeFinderService} from "../../service/type-finder-service";
import {TypeGraph} from "../../model/type.graph";

@Directive()
export class PropertyValueView implements OnInit {
  @Input()
  public owner: any;
  @Input()
  public ownerType: string;
  @Input()
  public root: ObjectViewComponent;
  @Input()
  public path: string | unknown;
  @Input()
  public typeGraph: TypeGraph & any;
  @Input()
  public typeFinderService: TypeFinderService;
  @Input()
  public objectStateType: string;
  @Input()
  public type: string;
  @Input()
  public isArrayItem: boolean;

  @Input()
  public propertyNameLocalisation: {[propertyName: string]: string} = {}
  @Input()
  public enumMembersLocalisation: {[enumType: string]: {[enumMember:string]: string}} = {};

  public ariaExpanded: boolean = false;

  public getPropertyNameLocalisation(key: unknown): string {
    return (this.propertyNameLocalisation[key as string] != null
      ? this.propertyNameLocalisation[key as string]
      : key) as string;
  }

  public ngOnInit(): void {}
}
