import React from 'react';
import { Text } from 'react-native-paper';
import styles from './styles';

type TypographyVariant = 'title' | 'bodyLarge' | 'bodyMedium' | 'bodySmall';

const variantStyles: Record<TypographyVariant, any> = {
  title: styles.title,
  bodyLarge: styles.bodyLarge,
  bodyMedium: styles.bodyMedium,
  bodySmall: styles.bodySmall,
};

interface TypographyProps {
  children?: React.ReactNode,
  variant: TypographyVariant,
  color?: string,
};

const Typography: React.FC<TypographyProps> = ({ variant, color, children }) => {
  const style = { ...variantStyles[variant] };
  if (color) style.color = color;

  return (
    <Text style={style}>
      {children}
    </Text>
  );
};

export default Typography;
