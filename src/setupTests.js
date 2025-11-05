// src/setupTests.js
import '@testing-library/jest-dom';


import { vi } from 'vitest';

// Ignorar imports de estilos y archivos estáticos
vi.mock('*.css', () => ({}));
vi.mock('*.png', () => '');
vi.mock('*.jpg', () => '');
vi.mock('*.svg', () => '');
