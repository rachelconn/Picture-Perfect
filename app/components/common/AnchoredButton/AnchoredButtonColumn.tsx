import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { AnchoredButtonProps } from './AnchoredButton';
import styles from './styles';

export interface ColumnButtonProps extends Omit<AnchoredButtonProps, 'children'> {
  text: string;
}

interface AnchoredButtonColumnProps {
  buttons: ColumnButtonProps[],
};

const AnchoredButtonColumn: React.FC<AnchoredButtonColumnProps> = ({ buttons }) => {
  const buttonComponents = buttons.map((button) => {
    return (
      <Button
        icon={button.icon}
        mode={button.mode}
        style={styles.columnButton}
        color={button.color}
        contentStyle={styles.anchoredButtonContent}
        onPress={button.onPress}
        key={button.text}
      >
        {button.text}
      </Button>
    );
  });

  return (
    <View style={styles.anchoredButtonColumn}>
      {buttonComponents}
    </View>
  );
};

export default AnchoredButtonColumn;
