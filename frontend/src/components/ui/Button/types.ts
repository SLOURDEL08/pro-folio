// src/components/ui/Button/types.ts
import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

// Exemple d'utilisation des types :
/*
  <Button
    variant="primary"     // Type de bouton
    size="md"            // Taille du bouton
    isLoading={false}    // État de chargement
    fullWidth={false}    // Bouton pleine largeur
    onClick={() => {}}   // Hérité de ButtonHTMLAttributes
    disabled={false}     // Hérité de ButtonHTMLAttributes
    className=""         // Hérité de ButtonHTMLAttributes
  >
    Texte du bouton
  </Button>
*/