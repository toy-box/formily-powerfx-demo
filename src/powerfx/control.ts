import { ControlTemplate, ControlType, ComponentType, Control, DName } from '@toy-box/power-fx';

// import { ComponentType } from '@toy-box/power-fx/lib/app/components/ComponentType';

const controlTemplate = new ControlTemplate({
  componentType: ComponentType.DataComponent,
  isMetaLoc: true,
});

const controlType = new ControlType({ isMetaField: true, controlTemplate });
// const addUserControlType = controlType.addTypeName(new TypedName(userType, new DName(DType.MetaFieldName)))

const formTemplate = new ControlTemplate({
  componentType: ComponentType.DataComponent,
});

export function makeFormControl(name: string, uid: string) {
  return new Control({
    displayName: name,
    entityName: new DName(name),
    type: controlType,
    uniqueId: uid,
    template: formTemplate,
    isAppGlobalControl: true,
    isDataComponentDefinition: true,
  });
}
