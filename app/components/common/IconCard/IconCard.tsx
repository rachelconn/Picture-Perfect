import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Typography from '../Typography/Typography';
import styles, { windowSize } from './styles';

export interface IconCardProps {
  title: string,
  description: string,
  icon: string,
  onPress?: () => any,
};

const IconCard: React.FC<IconCardProps> = ({ title, description, icon, onPress }) => {
  return (
    <TouchableHighlight style={styles.cardContainer} onPress={onPress} underlayColor="darkgray">
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons size={windowSize.height * 0.08} name={icon} color="#323232" />
        </View>
        <View style={styles.textContainer}>
          <Typography variant="title">{title}</Typography>
          <Typography variant="bodyMedium">{description}</Typography>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default IconCard;