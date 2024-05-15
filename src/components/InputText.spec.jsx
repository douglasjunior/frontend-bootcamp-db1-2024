import { describe, expect, it } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import { useState } from 'react';

import InputText from './InputText';

describe('InputText', () => {
  it('should render the snapshot with default props', () => {
    const result = render(
      <InputText />,
    );

    expect(result).toMatchSnapshot();
  });

  it('should validate the user input successfully', () => {
    function ExamplePage() {
      const [input, setInput] = useState();
      const handleChange = (event) => {
        setInput(event.input);
      };
      const validateValue = (value) => {
        if (value?.length > 20) {
          return 'O valor não pode ser maior do que 20';
        }
        return undefined;
      };
      return (
        <InputText
          onChange={handleChange}
          value={input?.value}
          placeholder="Informe o valor"
          validate={validateValue}
        />
      );
    }
    const result = render(
      <ExamplePage />,
    );

    const inputElement = result.getByPlaceholderText('Informe o valor');
    fireEvent.change(inputElement, {
      target: {
        value: 'hello world',
      },
    });
    result.getByDisplayValue('hello world');

    expect(
      result.container.getElementsByClassName('ant-form-item-feedback-icon-success'),
    ).toHaveLength(1);
  });
});
