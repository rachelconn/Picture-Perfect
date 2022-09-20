import React from 'react';
import Typography from '../Typography/Typography';
import styles from './styles';
import ListItem from './ListItem';
import { View } from 'react-native';

interface ParagraphProps {
  children: React.ReactElement[],
}

const NumberedList: React.FC<ParagraphProps> = ({ children }) => {
  const listItems = children.map((listItem, idx) => (
    <View style={styles.listItemContainer} key={idx}>
      <Typography style={styles.listItemMarker} variant="bodyMedium">{`${idx + 1}.`}</Typography>
      {listItem}
    </View>
  ));

  return (
    <View style={styles.list}>
      {listItems}
    </View>
  );
};

export default NumberedList;
