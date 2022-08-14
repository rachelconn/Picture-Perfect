import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles, { windowSize } from './styles';

interface IconCardProps {
  title: string,
  description: string,
  icon: string,
};

const IconCard: React.FC<IconCardProps> = ({ title, description, icon }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons size={windowSize.height * 0.08} name={icon} color="#323232" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </View>
  );
};

export default IconCard;
