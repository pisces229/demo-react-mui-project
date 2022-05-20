import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Demo React MUI Project App/i);
  console.log(linkElement.outerHTML);
  expect(linkElement).toBeInTheDocument();
});
