import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import styles from './styles';

interface CardBaseProps extends React.PropsWithChildren {
  onPress?: () => any,
};

const CardBase: React.FC<CardBaseProps> = ({ onPress, children }) => {
  const handlePress = () => {
    if (onPress) onPress();
  };

  const cardContent = (
    <View>
      {children}
    </View>
  );

  // Only highlight on touch if the card has a touch event
  if (onPress) {
    return (
      <TouchableHighlight style={styles.cardContainer} underlayColor="darkgray" onPress={handlePress}>
        {cardContent}
      </TouchableHighlight>
    );
  }

  return (
    <View style={styles.cardcontainer}>
      {cardContent}
    </View>
  );
};

export default CardBase;
