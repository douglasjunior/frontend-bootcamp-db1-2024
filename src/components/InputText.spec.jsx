import { describe, expect, it } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import { useState } from 'react';

import InputText from './InputText';

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

describe('InputText', () => {
  describe('snapshot', () => {
    it('should render the snapshot with default props', () => {
      const result = render(
        <InputText />,
      );

      expect(result).toMatchSnapshot();
    });
  });

  describe('event', () => {
    it('should validate the user input successfully', () => {
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

    it('should validate the user input with error', () => {
      const result = render(
        <ExamplePage />,
      );

      const inputElement = result.getByPlaceholderText('Informe o valor');
      fireEvent.change(inputElement, {
        target: {
          value: 'hello world com mais de 20 caracteres',
        },
      });

      expect(
        result.container.getElementsByClassName('ant-form-item-feedback-icon-error'),
      ).toHaveLength(1);
    });

    it('should validate if the input has no feedback', () => {
      const result = render(
        <ExamplePage />,
      );

      expect(
        result.container.getElementsByClassName('ant-form-item-feedback-icon-success'),
      ).toHaveLength(0);
      expect(
        result.container.getElementsByClassName('ant-form-item-feedback-icon-error'),
      ).toHaveLength(0);
    });
  });
});
