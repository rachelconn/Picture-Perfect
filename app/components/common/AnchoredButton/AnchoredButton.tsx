import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import styles from './styles';

interface AnchoredButtonProps {
  icon: string,
  mode: 'text' | 'outlined' | 'contained' | undefined,
  children: string,
  onPress: () => any,
};

const AnchoredButton: React.FC<AnchoredButtonProps> = ({
  icon,
  mode,
  children,
  onPress,
}) => {
  return (
    <Button
      icon={icon}
      mode={mode}
      style={styles.anchoredButton}
      contentStyle={styles.anchoredButtonContent}
      onPress={onPress}
    >
      {children}
    </Button>
  );
};

export default AnchoredButton;
