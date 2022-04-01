import { IObjectMeta } from '@toy-box/meta-schema';

export const user = {
  username: 'Aston Martin',
  firstName: 'Aston',
  lastName: 'Martin',
  email: 'aston_martin@aston.com',
  gender: 1,
  birthday: '1836-01-03',
  parent: {
    aget: 20,
  },
};

export const objectMeta: IObjectMeta = {
  key: 'userData',
  name: 'user',
  type: 'object',
  primaryKey: 'username',
  properties: {
    username: {
      key: 'username',
      type: 'string',
      name: '用户名',
    },
    firstName: {
      key: 'firstName',
      type: 'string',
      name: '姓',
    },
    lastName: {
      key: 'lastName',
      type: 'string',
      name: '名',
    },
    email: {
      key: 'email',
      type: 'string',
      name: '邮箱',
    },
    gender: {
      key: 'gender',
      type: 'boolean',
      name: '性别',
    },
    birthday: {
      key: 'birthday',
      type: 'date',
      name: '生日',
    },
    fullMonth: {
      key: 'fullMonth',
      type: 'date',
      name: '满月',
    },
    parent: {
      key: 'parent',
      name: 'parent',
      type: 'object',
      properties: {
        age: {
          key: 'age',
          type: 'number',
          name: '年龄',
        },
        amount: {
          key: 'amount',
          type: 'number',
          name: '年金',
        },
      },
    },
    projects: {
      key: 'projects',
      name: 'projects',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          a1: {
            key: 'a1',
            type: 'number',
            name: 'a1',
          },
          a2: {
            key: 'a2',
            type: 'number',
            name: 'a2',
          },
          a3: {
            key: 'a3',
            type: 'number',
            name: 'a3',
          },
        },
      },
    },
    dataGrid: {
      key: 'dataGrid',
      name: 'dataGrid',
      type: 'object',
      properties: {
        dataSource: {
          key: 'dataSource',
          type: 'array',
          name: 'dataSource',
          items: {
            type: 'object',
            properties: {
              str: {
                key: 'str',
                type: 'string',
                name: 'String',
              },
              num: {
                key: 'num',
                type: 'number',
                name: 'Number',
              },
            },
          },
        },
        selectedKeys: {
          key: 'selectedKeys',
          name: 'selectedKeys',
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
  },
};

export const userSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      title: '用户名',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-reactions': [
        {
          type: 'expression',
          state: 'value',
          expression: 'firstName & " " & lastName',
        },
      ],
    },
    name: {
      type: 'void',
      title: '姓名',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        asterisk: true,
        feedbackLayout: 'none',
      },
      'x-component': 'FormGrid',
      properties: {
        firstName: {
          type: 'string',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '姓',
          },
        },
        lastName: {
          type: 'string',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '名',
          },
        },
      },
    },
    email: {
      type: 'string',
      title: '邮箱',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-validator': 'email',
      'x-reactions': [
        {
          type: 'expression',
          state: 'visibility',
          expression: 'parent.amount <= 0',
        },
      ],
    },
    gender: {
      type: 'string',
      title: '性别',
      enum: [
        {
          label: '男',
          value: 1,
        },
        {
          label: '女',
          value: 2,
        },
        {
          label: '第三性别',
          value: 3,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    birthday: {
      type: 'string',
      required: true,
      title: '生日',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
    },
    fullMonth: {
      type: 'string',
      title: '满月',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-reactions': [
        {
          type: 'expression',
          state: 'value',
          expression: 'DateAdd(birthday, 30)',
        },
      ],
    },
    parent: {
      type: 'object',
      properties: {
        age: {
          type: 'number',
          title: '年龄',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
        },
        amount: {
          type: 'number',
          title: '年金',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-reactions': [
            {
              type: 'expression',
              state: 'value',
              expression: '1000 * ThisItem.age',
            },
          ],
        },
      },
    },
    projects: {
      type: 'array',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayTable',
      'x-component-props': {
        pagination: { pageSize: 10 },
        scroll: { x: '100%' },
      },
      items: {
        type: 'object',
        properties: {
          column1: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { width: 50, title: 'Sort', align: 'center' },
            properties: {
              sort: {
                type: 'void',
                'x-component': 'ArrayTable.SortHandle',
              },
            },
          },
          column2: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { width: 80, title: 'Index', align: 'center' },
            properties: {
              index: {
                type: 'void',
                'x-component': 'ArrayTable.Index',
              },
            },
          },
          column3: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { width: 200, title: '单价' },
            properties: {
              a1: {
                type: 'number',
                'x-decorator': 'Editable',
                'x-component': 'NumberPicker',
              },
            },
          },
          column4: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { width: 200, title: '数量' },
            properties: {
              a2: {
                type: 'number',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
              },
            },
          },
          column5: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { width: 200, title: '金额' },
            properties: {
              a3: {
                type: 'number',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
                'x-reactions': [
                  {
                    type: 'expression',
                    state: 'value',
                    expression: 'ThisItem.a2 * ThisItem.a1',
                  },
                ],
              },
            },
          },
          column6: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': {
              title: 'Operations',
              dataIndex: 'operations',
              width: 200,
              fixed: 'right',
            },
            properties: {
              item: {
                type: 'void',
                'x-component': 'FormItem',
                properties: {
                  remove: {
                    type: 'void',
                    'x-component': 'ArrayTable.Remove',
                  },
                  moveDown: {
                    type: 'void',
                    'x-component': 'ArrayTable.MoveDown',
                  },
                  moveUp: {
                    type: 'void',
                    'x-component': 'ArrayTable.MoveUp',
                  },
                },
              },
            },
          },
        },
      },
      properties: {
        add: {
          type: 'void',
          'x-component': 'ArrayTable.Addition',
          title: '添加条目',
        },
      },
    },
    dataGrid: {
      type: 'object',
      'x-decorator': 'FormItem',
      'x-component': 'DataGrid',
      'x-validator': [],
      'x-component-props': {
        defaultSelectionType: 'checkbox',
        objectMeta: objectMeta.properties.dataGrid,
      },
      'x-decorator-props': {},
      'x-designable-id': 'vkv8txtp67z',
      properties: {
        selectedKeys: {
          type: 'array',
        },
        dataSource: {
          type: 'array',
          'x-component': 'MetaTable',
          'x-component-props': {
            defaultSelectionType: 'checkbox',
            objectMeta: objectMeta.properties.dataGrid,
          },
          properties: {
            addition: {
              type: 'void',
              title: 'Addition',
              'x-component': 'MetaTable.Addition',
              'x-component-props': {},
              'x-designable-id': 'jrbow23c0u6',
              'x-index': 0,
            },
          },
          items: {
            type: 'object',
            'x-designable-id': 'kreabo4057x',
            properties: {
              strCol: {
                type: 'void',
                'x-component': 'MetaTable.Column',
                'x-component-props': {
                  title: '字符串',
                },
                'x-designable-id': 'ehilskhsvht',
                properties: {
                  str: {
                    type: 'string',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                    'x-designable-id': 'hymy07npisn',
                    'x-index': 0,
                  },
                },
                'x-index': 0,
              },
              numCol: {
                type: 'void',
                'x-component': 'MetaTable.Column',
                'x-component-props': {
                  title: '数字',
                },
                'x-designable-id': '1lt8a6fsohi',
                properties: {
                  num: {
                    type: 'number',
                    'x-decorator': 'FormItem',
                    'x-component': 'NumberPicker',
                    'x-designable-id': '85h7zak34u1',
                    'x-index': 0,
                  },
                },
                'x-index': 1,
              },
            },
          },
        },
      },
      'x-index': 0,
    },
  },
};
