import { FormInstance } from 'antd';
import { NamePath } from 'antd/lib/form/interface';

export function setFormFieldError<T = any>(
  form: FormInstance<T>,
  name: NamePath,
  error: string
) {
  return form.setFields([
    {
      name,
      errors: [error],
    },
  ]);
}

export function resetFormFieldError<T = any>(
  form: FormInstance<T>,
  name: NamePath | NamePath[]
) {
  const names = ([] as NamePath[]).concat(name);
  return form.setFields(
    names
      .filter((el) => form.getFieldError(el)?.length)
      .map((el) => ({
        name: el,
        errors: [],
      }))
  );
}
