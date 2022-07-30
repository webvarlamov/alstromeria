import {ChangeDetectionStrategy, Component, Injector, OnInit} from '@angular/core';
import {TableSelectionConfig} from "../../../../modules/table-components-module/table/models/config/tableSelectionConfig";
import {SelectionMode} from "../../../../modules/table-components-module/table/models/config/selectionMode";
import {PlanRepository} from "../../../../repository/plan-repository.service";
import {ListViewTableState} from "../../../../state/list-view-state/list-view-table-state";
import {ListViewFiltersStateManagerImpl} from "../../../../state/filter-state/list-view-filters-state-manager-impl";
import {ListViewFiltersState} from "../../../../state/filter-state/list-view-filters.state";
import {ListViewTableInitialState} from "../../../../state/list-view-state/list-view-table-initial-state";
import {ListViewFiltersInitialState} from "../../../../state/filter-state/list-view-filters-initial.state";
import {
  PagingAndSortingRemoteRepositoryListViewStateManagerImpl,
  RemoteRepositoryDefaultFilterExpressionBuilderImpl
} from "../../../../provider/paging-and-sorting-remote-repository-list-view-state-manager-impl";
import {ListViewComponent} from "../../../view/component/list-view/list-view.component";
import {ListViewTableStateManager, ListViewTableStateManagerImpl} from "../../../../state/list-view-state/list-view-table-state-manager-impl";
import {
  NumberFilterComponentValueImpl,
  StringFilterComponentValueImpl
} from "../../../../modules/filter-components-module/models/filter-component-value-basic-impl";
import {FilterComponentConfigImpl} from "../../../view/component/list-view/filter-component-config.impl";
import {InputComponentConfigImpl, InputComponentType} from "../../../../modules/input-components-module/components/input-component/input.component";
import {
  ListViewFilterDetailEventManagerImpl
} from "../../../../modules/input-components-module/components/filter-detail/manager/list-view-filter-detail-event-manager.impl";
import {
  FilterComponentValueUnionOperator,
  StringFilterComponentRangeOperatorType
} from "../../../../modules/filter-components-module/models/filter-component-value";
import {
  SuggestionValueRemoteFilterableListViewStateManager
} from "../../../../state/list-view-state/suggestion-value-remote-filterable-list-view-state-manager";
import {DefaultFilterExpressionBuilderImpl} from "../../../../service/http/service/default-filter-expression-builder-impl";

@Component({
  selector: 'app-plan-list-view',
  templateUrl: './plan-list-view.component.html',
  styleUrls: ['./plan-list-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanListViewComponent extends ListViewComponent<any> implements OnInit {
  public tableSelectionConfig: TableSelectionConfig = {
    sticky: true,
    useSelection: true,
    selectionMode: SelectionMode.MULTI,
    columnWidth: '35px',
  };

  public initialListViewTableStateState: ListViewTableInitialState = {
    tableItemsList: [],
    tableColumns: [
      {id: '0', caption: "ID", dataField: "id"},
      {id: '1', caption: "Name", dataField: "name"},
      {id: '2', caption: "Description", dataField: "description"},
      {id: '3', caption: "Num", dataField: "num"},
    ],
    tablePage: {
      page: 0,
      size: 0,
      pagesCount: 0,
      itemsCount: 0,
    }
  }
  public listViewTableState: ListViewTableState = new ListViewTableState(this.initialListViewTableStateState);
  public listViewTableStateManager: ListViewTableStateManager = new ListViewTableStateManagerImpl(this.listViewTableState);

  public listViewFiltersInitialState: ListViewFiltersInitialState<any> = {
    // Хранение значений
    listViewFilterValuesByAttributeKey: {
      name: new StringFilterComponentValueImpl({
        ranges: [],
        values: [
          new StringFilterComponentValueImpl({
            values: [
              new StringFilterComponentValueImpl()
            ],
            ranges: [],
            operator: FilterComponentValueUnionOperator.AND
          })
        ],
        operator: FilterComponentValueUnionOperator.AND
      }),
      description: new StringFilterComponentValueImpl({
        ranges: [{operator: StringFilterComponentRangeOperatorType.ENDWITH, value1: "fds"}],
        values: [],
        operator: FilterComponentValueUnionOperator.AND
      }),
      num: new NumberFilterComponentValueImpl()
    },
    // Конфигурация фильтров
    listViewFilterConfigByAttributeKey: {
      name: new FilterComponentConfigImpl({
        inputConfig: new InputComponentConfigImpl({
          attributeKey: "name",
          caption: "Имя",
          componentType: InputComponentType.STRING
        }),
        suggestionsConfig: {},
        inputDetailsConfig: {}
      }),
      description: new FilterComponentConfigImpl({
        inputConfig: new InputComponentConfigImpl({
          attributeKey: "description",
          caption: "Описание",
          componentType: InputComponentType.STRING
        }),
        suggestionsConfig: {},
        inputDetailsConfig: {}
      }),
      num: new FilterComponentConfigImpl({
        inputConfig: new InputComponentConfigImpl({
          attributeKey: "num",
          caption: "Номер",
          componentType: InputComponentType.NUMBER
        }),
        suggestionsConfig: {},
        inputDetailsConfig: {}
      })
    }
  };
  public listViewFiltersState = new ListViewFiltersState(this.listViewFiltersInitialState);
  public listViewFiltersStateManager = new ListViewFiltersStateManagerImpl({listViewFiltersState: this.listViewFiltersState});
  public listViewFilterDetailEventManager: ListViewFilterDetailEventManagerImpl = new ListViewFilterDetailEventManagerImpl(this.listViewFiltersStateManager);

  public listViewStateManager = new PagingAndSortingRemoteRepositoryListViewStateManagerImpl({
    listViewTableStateManager: this.listViewTableStateManager,
    listViewFiltersStateManager: this.listViewFiltersStateManager,
    repository: this.planRepository,
    fetchStrategy: "Plan_FlatEntityGraph",
    filterExpressionBuilder: new RemoteRepositoryDefaultFilterExpressionBuilderImpl()
  });

  public nameFilterSuggestionStateManager: SuggestionValueRemoteFilterableListViewStateManager =
    new SuggestionValueRemoteFilterableListViewStateManager({
      listViewTableState: new ListViewTableState({
        tablePage: {
          page: 0,
          size: 50,
          pagesCount: 0,
          itemsCount: 0,
        },
        tableColumns: [{
          id: "value",
          caption: "Значение",
          dataField: "value"
        }]
      }),
      repository: this.planRepository,
      attributeKey: "name",
      listViewFiltersStateManager: new ListViewFiltersStateManagerImpl({listViewFiltersState: new ListViewFiltersState()}),
      filterExpressionBuilder: new DefaultFilterExpressionBuilderImpl()
    });

  constructor(
    public injector: Injector,
    public planRepository: PlanRepository,
  ) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.listViewStateManager.update();
  }
}


// public storySuggestionStateManager: SuggestionEntityRemoteFilterableListViewStateManager =
//   new SuggestionEntityRemoteFilterableListViewStateManager({
//     listViewTableState: new ListViewTableState({
//       tablePage: {
//         page: 0,
//         size: 50,
//         pagesCount: 0,
//         itemsCount: 0,
//       },
//       tableColumns: [
//         {
//           id: "id",
//           caption: "ID",
//           dataField: "id"
//         }
//       ]
//     }),
//     repository: this.storyRepository,
//     listViewFiltersStateManager: new ListViewFiltersStateManager({}),
//     filterExpressionBuilder: new DefaultFilterExpressionBuilderImpl()
//   });
//
// public booleanSuggestionStateManager: any = new BooleanInputListViewTableStateManager();
//
//
// public numberSuggestionStateManager: SuggestionValueRemoteFilterableListViewStateManager =
//   new SuggestionValueRemoteFilterableListViewStateManager({
//     listViewTableState: new ListViewTableState({
//       tablePage: {
//         page: 0,
//         size: 50,
//         pagesCount: 0,
//         itemsCount: 0,
//       },
//       tableColumns: [{
//         id: "value",
//         caption: "Значение",
//         dataField: "value"
//       }]
//     }),
//     repository: this.planRepository,
//     attributeKey: "num",
//     listViewFiltersStateManager: new ListViewFiltersStateManager({
//       listViewFiltersState: new ListViewFiltersState({
//         listViewFilterConfigByAttributeKey: {
//           num: new FilterComponentConfig<any>({
//             attributeKey: "num",
//             caption: "Значение",
//             componentType: InputComponentType.NUMBER,
//             operator: RangeOperator.GE
//           })
//         }
//       })
//     }),
//     filterExpressionBuilder: new DefaultFilterExpressionBuilderImpl()
//   });
//
//
// public stringSelectionConfig: TableSelectionConfig = {
//   sticky: true,
//   useSelection: false,
//   selectionMode: SelectionMode.SINGLE,
//   columnWidth: '35px',
// };
//
// public stringInputConfig: InputConfigInterface = new InputComponentConfig({
//   attributeKey: 'name',
//   caption: 'caption',
//   componentType: InputComponentType.STRING,
//   operator: RangeOperator.STARTWITH
// });
//
// public numberInputConfig: InputConfigInterface = new InputComponentConfig({
//   attributeKey: 'num',
//   caption: 'caption',
//   componentType: InputComponentType.NUMBER,
//   operator: RangeOperator.EQ
// });
//
// public enumSuggestionStateManager: any = new ListViewTableStateManager(new ListViewTableState({
//   tableItemsList: [
//     {id: '1', value: '1', caption: 'В работе'},
//     {id: '2', value: '2', caption: 'Тестировать'},
//   ],
//   tableColumns: [
//     {id: '1', dataField: 'caption', caption: 'Значение'},
//   ]
// }))


