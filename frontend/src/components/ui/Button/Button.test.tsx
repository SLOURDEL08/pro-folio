// src/components/ui/Button/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';

describe('Button Component', () => {
  // Test 1: Vérifie que le bouton s'affiche correctement avec le texte
  it('affiche correctement le texte du bouton', () => {
    render(<Button>Cliquez-moi</Button>);
    expect(screen.getByText('Cliquez-moi')).toBeInTheDocument();
  });

  // Test 2: Vérifie que la classe de style primary est appliquée par défaut
  it('applique la classe primary par défaut', () => {
    render(<Button>Test</Button>);
    const button = screen.getByText('Test');
    expect(button).toHaveClass('bg-primary-600');
  });

  // Test 3: Vérifie que le bouton est désactivé quand isLoading est true
  it('est désactivé pendant le chargement', () => {
    render(<Button isLoading>Chargement</Button>);
    expect(screen.getByText('Chargement')).toBeDisabled();
  });
});