import React from 'react';
import { View } from 'react-native';
import styles from './styles';

interface ContainerProps {
  children?: React.ReactNode,
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <View style={styles.articleContainer}>
      {children}
    </View>
  );
};

export default Container;
