import { Field } from '@formily/core/esm/models/Field';
import { isArr } from '@formily/shared';
import { ISchema } from '@formily/json-schema';
import { SchemaProperties } from '@formily/react';
import { MetaRecalcEngine } from '@toy-box/power-fx';

export function patchProvide(engine: MetaRecalcEngine) {
  return (schema: ISchema) => {
    return schemaPatch(schema, engine);
  };
}

export function schemaPatch(schema: ISchema, engine: MetaRecalcEngine) {
  const { 'x-reactions': reactions, properties } = schema;
  let newSchema: ISchema = { ...schema };
  if (properties) {
    newSchema = Object.assign(schema, {
      properties: typeof properties === 'object' ? propertiesPatch(properties, engine) : properties,
    });
  }
  if (reactions) {
    newSchema = Object.assign(schema, {
      'x-reactions': reactionsPatch(reactions, engine),
    });
  }
  return newSchema;
}

function propertiesPatch(
  properties: SchemaProperties<any, any, any, any, any, any, any, any>,
  engine: MetaRecalcEngine
) {
  const propertiesPatched: SchemaProperties<any, any, any, any, any, any, any, any> = {};
  Object.keys(properties).forEach((key) => {
    propertiesPatched[key] = schemaPatch(properties[key], engine);
  });
  return propertiesPatched;
}

function reactionsPatch(reactions: any | any[], engine: MetaRecalcEngine) {
  if (isArr(reactions)) {
    return reactions.map((reaction) => reactionPatch(reaction, engine));
  }
  return reactionPatch(reactions, engine);
}

function reactionPatch(reaction: any, engine: MetaRecalcEngine) {
  if (reaction.type === 'expression') {
    return async (field: Field) => {
      if (field.form.initialized) {
        const result = (
          await engine.eval(reaction.expression, field.address.toString())
        ).toObject();
        switch (reaction.state) {
          case 'value':
            field.setValue(result);
            break;
          case 'visibility':
            field.visible = result;
            break;
          default:
            break;
        }
      }
    };
  }
  return reaction;
}
