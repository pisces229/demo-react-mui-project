import React from 'react';
import { logRoles, prettyDOM, render, screen } from '@testing-library/react';
import { First } from '.';

test('renders learn react link', () => {
  const { container } = render(<First />);
  logRoles(container);
  // screen.debug();
  const element = screen.getByText(/First/i);
  console.log(prettyDOM(element));
  expect(element).toBeInTheDocument();
});
