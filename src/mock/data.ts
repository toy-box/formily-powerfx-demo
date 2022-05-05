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
    dataView: {
      type: 'object',
      name: 'dataView',
      key: 'dataView',
      properties: {
        username: {
          type: 'string',
          name: 'User name',
          key: 'username',
        },
        firstName: {
          type: 'string',
          name: 'First name',
          key: 'firstName',
        },
        lastName: {
          type: 'string',
          name: 'Last name',
          key: 'lastName',
        },
        gender: {
          key: 'gender',
          type: 'singleOption',
          name: 'Gender',
          options: [
            {
              label: 'Male',
              value: 'male',
            },
            {
              label: 'Female',
              value: 'female',
            },
          ],
        },
      },
    },
  },
};

export const userSchema = {
  type: 'object',
  properties: {
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
        toolbar: {
          type: 'void',
          'x-component': 'Space',
          properties: {
            button1: {
              type: 'void',
              'x-component': 'Button',
              'x-component-props': {
                caption: 'The Button',
                type: 'primary',
                onClick: 'Notify("Nice");Notify("Good Job")',
              },
            },
          },
        },
        dataSource: {
          type: 'array',
          'x-component': 'MetaTable',
          'x-component-props': {
            defaultSelectionType: 'checkbox',
            objectMeta: objectMeta.properties.dataGrid,
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
                    'x-pattern': 'readPretty',
                    'x-decorator': 'FormItem',
                    'x-component': 'FieldString',
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
                    'x-pattern': 'readPretty',
                    'x-decorator': 'FormItem',
                    'x-component': 'FieldNumber',
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
    dataView: {
      type: 'object',
      'x-component': 'DataView',
      'x-component-props': {
        dataRepository: 'User',
      },
      properties: {
        username: {
          type: 'string',
          title: '用户名',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'FieldString',
          'x-reactions': [
            {
              type: 'expression',
              state: 'value',
              expression: 'ThisItem.firstName & " " & ThisItem.lastName',
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
              'x-component': 'FieldString',
              'x-component-props': {
                placeholder: '姓',
              },
            },
            lastName: {
              type: 'string',
              required: true,
              'x-decorator': 'FormItem',
              'x-component': 'FieldString',
              'x-component-props': {
                placeholder: '名',
              },
            },
          },
        },
        gender: {
          type: 'string',
          title: ' Gender',
          'x-decorator': 'FormItem',
          'x-component': 'FieldSelect',
        },
      },
    },
  },
};
