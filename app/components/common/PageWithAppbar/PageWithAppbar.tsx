import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import FocusAwareStatusBar from '../FocusAwareStatusBar/FocusAwareStatusBar';
import styles from './styles';

interface AppbarPageProps {
  children?: React.ReactNode,
  title: string,
};

const PageWithAppbar: React.FC<AppbarPageProps> = ({ children, title }) => {
  const navigation = useNavigation();
  const theme = useTheme();

  const handleBackPress = () => { navigation.goBack() };

  return (
    <View style={styles.background}>
      <FocusAwareStatusBar barStyle="light-content" translucent backgroundColor={`${theme.colors.primary}`} />
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={handleBackPress} />
        <Appbar.Content title={title} />
      </Appbar.Header>
      <View style={styles.contentArea}>
        {children}
      </View>
    </View>
  );
};

export default PageWithAppbar;
