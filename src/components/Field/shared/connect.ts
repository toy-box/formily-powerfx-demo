import React, { useMemo } from 'react';
import { isFn, isStr, FormPath, each, isValid } from '@formily/shared';
import { observer } from '@formily/reactive-react';
import { JSXComponent, IStateMapper, useField } from '@formily/react';
import { fetchMeta } from '@toy-box/meta-schema';
import { usePage } from '../../Page/hooks/usePage';

export function mapFieldProps<T extends JSXComponent>(
  ...args: IStateMapper<React.ComponentProps<T>>[]
) {
  return (target: T) => {
    return observer(
      (props: any) => {
        const field = useField();
        const page = usePage();
        const fieldMeta = useMemo(
          () => fetchMeta(page.pageMeta, field.path.segments),
          [field.path.segments, page.pageMeta]
        );
        const results = args.reduce(
          (props, mapper) => {
            if (isFn(mapper)) {
              props = Object.assign(props, mapper(props, field));
            } else {
              each(mapper, (to, extract) => {
                const extractValue = FormPath.getIn(field, extract);
                const targetValue = isStr(to) ? to : (extract as any);
                const originalValue = FormPath.getIn(props, targetValue);
                if (extract === 'value') {
                  if (to !== extract) {
                    delete props.value;
                  }
                }
                if (isValid(originalValue) && !isValid(extractValue)) return;
                FormPath.setIn(props, targetValue, extractValue);
              });
            }
            return props;
          },
          { ...props, field: fieldMeta }
        );
        return React.createElement(target, results);
      },
      {
        forwardRef: true,
      }
    );
  };
}
