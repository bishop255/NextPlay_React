import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom';


// Limpiar después de cada test
afterEach(() => {
  cleanup();
  localStorage.clear();
});

// Mock global de window.alert
global.vi = vi;