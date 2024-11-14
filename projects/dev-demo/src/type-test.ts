type FormField<TValue = any> = {
  value?: TValue,
  label?: string,
  schema?: FormField<TValue> | Schema<TValue>
}

type Schema<T> = {
  [key in keyof T]: FormField<T[key]>
}

class Form<TValue> {

  schema: Schema<TValue>;

  get value(){
    return {} as TValue;
  }

  constructor(schema: Schema<TValue>) {
    this.schema = schema;
  }
}

class Generator {
  public static text<T>(initialValue: T, label: string): FormField<T> {
    return {
      label: label,
      value: initialValue
    }
  }

  public static group<T>(schema: Schema<T>): FormField<T> {
    return {
      schema: schema
    }
  }

  public static array<E, T extends E[]>(schema: FormField<E> | Schema<E>): FormField<T> {
    return {
      schema: schema as any
    }
  }
}


const form = new Form({
  name: Generator.text('', 'Name'),
  lastname: Generator.text('', 'LastName'),
  age: Generator.text(18, 'Age'),
  address: Generator.group({
    street: Generator.text('', 'Street')
  }),
  tags: Generator.array(Generator.text('', 'Tag')),
  connections: Generator.array({
    email: Generator.text('', 'Email'),
    enabled: Generator.text('', 'Enabled'),
  })
});

const formValue = form.value;
