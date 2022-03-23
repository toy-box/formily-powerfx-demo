import { Field } from '@formily/core/esm/models/Field';
import { GeneralField } from '@formily/core';
import { FormPath, isArr } from '@formily/shared';
import { ISchema } from '@formily/json-schema';
import { SchemaProperties } from '@formily/react';
import { recalcEngine } from './recalc';

export function schemaPatch(schema: ISchema) {
  const { 'x-reactions': reactions, properties } = schema;
  let newSchema: ISchema = { ...schema };
  if (properties) {
    newSchema = Object.assign(schema, {
      properties: typeof properties === 'object' ? propertiesPatch(properties) : properties,
    });
  }
  if (reactions) {
    newSchema = Object.assign(schema, {
      'x-reactions': reactionsPatch(reactions),
    });
  }
  return newSchema;
}

function propertiesPatch(properties: SchemaProperties<any, any, any, any, any, any, any, any>) {
  const propertiesPatched: SchemaProperties<any, any, any, any, any, any, any, any> = {};
  Object.keys(properties).forEach((key) => {
    propertiesPatched[key] = schemaPatch(properties[key]);
  });
  return propertiesPatched;
}

function reactionsPatch(reactions: any | any[]) {
  if (isArr(reactions)) {
    return reactions.map((reaction) => reactionPatch(reaction));
  }
  return reactionPatch(reactions);
}

function reactionPatch(reaction: any) {
  if (reaction && reaction.state === 'value' && reaction.type === 'expression') {
    const result = recalcEngine.eval(reaction.expression);
    console.log('reault', result.toObject());
  }
  return reaction;
}
