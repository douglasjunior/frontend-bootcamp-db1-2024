import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';
import InputText from './InputText';

describe('InputText', () => {
  it('should renders default', () => {
    const component = render(
      <InputText />,
    );

    expect(component).toMatchSnapshot();
  });
});
