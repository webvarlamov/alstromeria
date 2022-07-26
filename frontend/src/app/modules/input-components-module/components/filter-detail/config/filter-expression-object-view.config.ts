import {TypeGraph} from "../../../../object-view-module/components/object-view/model/type.graph";

// Строчное значение
// Массив строчных значени

// Числовое значение
// Массив числовых значений

// Булевое значение
// Массив булей

// Перечисление
// Массив перечислений

// Связанная сущность
// Массив связанных сущностей

export const BasicFilterExpressionBuilderTypeGraph: TypeGraph & any = {
  "FilterExpression": {
    operator: "Enum<FilterExpressionOperator>",
    expressions: "Array<FilterExpression>",
    ranges: "Array<Range>",
  },
  "FilterExpressionOperator": {
    AND: 'AND',
    OR: 'OR'
  },
  "Range": {
    exclude: "boolean",
    operator: "Enum<RangeOperator>",
    // property: "string",
    value1: "string",
    value2: "string",
    values: "Array<string>",
  },
  "RangeOperator": {
    EQ: 'EQ',
    NE: 'NE',
    LE: 'LE',
    GE: 'GE',
    LT: 'LT',
    GT: 'GT',
    IN: 'IN',
    BT: 'BT',
    LIKE: 'LIKE',
    ISMEMBER: 'ISMEMBER',
    STARTWITH: 'STARTWITH',
    ENDWITH: 'ENDWITH'
  }
};

export const FilterExpressionBuilderPropertyLocalisation: any = {
  expressions: "Выражения",
  ranges: "Ограничения",
  operator: "Оператор",
  value1: "Значение 1",
  value2: "Значение 2",
  values: "Значения",
  exclude: "Исключено",
  property: "Свойство"
}

export const FilterExpressionBuilderRootObjectTypeName: string = "FilterExpression";

export const FilterExpressionBuilderEnumMembersLocalisation: any = {
  "RangeOperator": {
    EQ: 'Равно',
    NE: 'Не равно',
    LE: 'Меньше либо равно',
    GE: 'Больше либо равно',
    LT: 'Меньше',
    GT: 'Больще',
    IN: 'Входит в значения',
    BT: 'Между',
    LIKE: 'Содержит',
    ISMEMBER: 'Является элементом',
    STARTWITH: 'Начинается с',
    ENDWITH: 'Кончается на'
  },
  "FilterExpressionOperator": {
    AND: 'И',
    OR: 'Или'
  }
};
