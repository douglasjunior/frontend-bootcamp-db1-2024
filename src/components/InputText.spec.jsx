import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';

import InputText from './InputText';

describe('InputText', () => {
  it('should render the snapshot with default props', () => {
    const result = render(
      <InputText />,
    );

    expect(result).toMatchSnapshot();
  });
});
