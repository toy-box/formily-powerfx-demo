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
  },
};
