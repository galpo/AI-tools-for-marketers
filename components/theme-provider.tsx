'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// Infer props (includes `children`) directly from the component
type Props = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider(props: Props) {
  // no destructuring needed; avoids the "children" type mismatch
  return <NextThemesProvider {...props} />;
}

