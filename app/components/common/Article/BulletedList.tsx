import React from 'react';
import Typography from '../Typography/Typography';
import styles from './styles';
import ListItem from './ListItem';
import { View } from 'react-native';

interface BulletedListProps {
  children: React.ReactElement[],
}

const BulletedList: React.FC<BulletedListProps> = ({ children }) => {
  const listItems = children.map((listItem, idx) => (
    <View style={styles.listItemContainer} key={idx}>
      <Typography style={styles.listItemMarker} variant="bodyMedium">
        •
      </Typography>
      {listItem}
    </View>
  ));

  return (
    <View style={styles.list}>
      {listItems}
    </View>
  );
};

export default BulletedList;
