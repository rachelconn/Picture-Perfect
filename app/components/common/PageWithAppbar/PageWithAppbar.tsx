import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import FocusAwareStatusBar from '../FocusAwareStatusBar/FocusAwareStatusBar';
import styles from './styles';

interface AppbarPageProps {
  children?: React.ReactNode,
  title: string,
  usePaper?: boolean,
};

const PageWithAppbar: React.FC<AppbarPageProps> = ({ children, title, usePaper = false }) => {
  const navigation = useNavigation();
  const theme = useTheme();

  const backgroundComputedStyle = { ...styles.background };
  if (usePaper) backgroundComputedStyle.backgroundColor = 'white';

  const handleBackPress = () => { navigation.goBack() };

  return (
    <View style={backgroundComputedStyle}>
      <FocusAwareStatusBar barStyle="light-content" translucent backgroundColor={`${theme.colors.primary}`} />
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={handleBackPress} />
        <Appbar.Content title={title} />
      </Appbar.Header>
      <ScrollView style={styles.contentArea}>
        {children}
      </ScrollView>
    </View>
  );
};

export default PageWithAppbar;
