import { render, screen, fireEvent } from '@testing-library/react';
import { Badge } from './Badge';
import { describe, it, expect, vi } from 'vitest';

describe('Badge', () => {
  it('renders correctly as a non-interactive element', () => {
    render(<Badge>Label</Badge>);
    const badge = screen.getByText('Label');
    expect(badge).toBeInTheDocument();
    expect(badge).not.toHaveAttribute('role', 'button');
    expect(badge).not.toHaveAttribute('tabIndex');
  });

  it('renders as a button when onClick is provided', () => {
    const handleClick = vi.fn();
    render(<Badge onClick={handleClick}>Clickable</Badge>);
    const badge = screen.getByText('Clickable');

    expect(badge).toHaveAttribute('role', 'button');
    expect(badge).toHaveAttribute('tabIndex', '0');
    expect(badge).toHaveClass('cursor-pointer');
  });

  it('triggers onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Badge onClick={handleClick}>Click Me</Badge>);
    const badge = screen.getByText('Click Me');

    fireEvent.click(badge);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('triggers onClick when Enter or Space is pressed', () => {
    const handleClick = vi.fn();
    render(<Badge onClick={handleClick}>Key Me</Badge>);
    const badge = screen.getByText('Key Me');

    fireEvent.keyDown(badge, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(badge, { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('does not trigger onClick on other keys', () => {
     const handleClick = vi.fn();
     render(<Badge onClick={handleClick}>No Key</Badge>);
     const badge = screen.getByText('No Key');

     fireEvent.keyDown(badge, { key: 'a' });
     expect(handleClick).not.toHaveBeenCalled();
  });
});
