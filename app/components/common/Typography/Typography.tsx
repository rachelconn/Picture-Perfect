import React from 'react';
import { Text } from 'react-native-paper';
import styles from './styles';

type TypographyVariant = 'title' | 'bodyLarge' | 'bodyMedium' | 'bodySmall' | 'caption';

const variantStyles: Record<TypographyVariant, any> = {
  title: styles.title,
  bodyLarge: styles.bodyLarge,
  bodyMedium: styles.bodyMedium,
  bodySmall: styles.bodySmall,
  caption: styles.caption,
};

interface TypographyProps {
  children?: React.ReactNode,
  variant: TypographyVariant,
  color?: string,
  style?: object,
};

const Typography: React.FC<TypographyProps> = ({ variant, color, children, style }) => {
  const computedStyle = { ...variantStyles[variant], ...(style ?? {}) };
  if (color) computedStyle.color = color;

  return (
    <Text style={computedStyle}>
      {children}
    </Text>
  );
};

export default Typography;
