import React from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Typography from '../Typography/Typography';
import CardBase from './CardBase';
import styles, { windowSize } from './styles';

export interface IconCardProps {
  title: string,
  description: string,
  icon: string,
  titleIcon?: string,
  titleIconColor?: string,
  onPress?: () => any,
};

const defaultIconColor = '#323232';

const IconCard: React.FC<IconCardProps> = ({
  title,
  description,
  icon,
  titleIcon,
  titleIconColor,
  onPress,
}) => {
  const titleIconComponent = titleIcon ? (
    <MaterialCommunityIcons size={windowSize.height * 0.035} name={titleIcon} color={titleIconColor || defaultIconColor} />
  ) : undefined;

  return (
    <CardBase onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons size={windowSize.height * 0.08} name={icon} color={defaultIconColor} />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            {titleIconComponent}
            <Typography variant="title">{title}</Typography>
          </View>
          <Typography variant="bodyMedium">{description}</Typography>
        </View>
      </View>
    </CardBase>
  );
};

export default IconCard;
