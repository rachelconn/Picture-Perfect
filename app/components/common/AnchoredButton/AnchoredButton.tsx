import React from 'react';
import { Button } from 'react-native-paper';
import styles from './styles';

export interface AnchoredButtonProps {
  icon: string,
  mode: 'text' | 'outlined' | 'contained' | undefined,
  children: string,
  color?: string,
  onPress: () => any,
};

const AnchoredButton: React.FC<AnchoredButtonProps> = ({
  icon,
  mode,
  children,
  color,
  onPress,
}) => {
  return (
    <Button
      icon={icon}
      mode={mode}
      style={styles.anchoredButton}
      color={color}
      contentStyle={styles.anchoredButtonContent}
      onPress={onPress}
    >
      {children}
    </Button>
  );
};

export default AnchoredButton;
