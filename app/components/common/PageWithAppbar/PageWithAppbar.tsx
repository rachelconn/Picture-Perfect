import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { BackHandler, ScrollView, View } from 'react-native';
import { Appbar, Menu, useTheme } from 'react-native-paper';
import FocusAwareStatusBar from '../FocusAwareStatusBar/FocusAwareStatusBar';
import styles from './styles';
import { resetAllLessons } from '../../../utils/lessonStatus';

interface PageWithAppbarProps {
  title: string,
  children?: React.ReactNode,
  hasMenu?: boolean,
  scrollViewStyle?: any,
  staticContent?: React.ReactNode,
  usePaper?: boolean,
};

const PageWithAppbar: React.FC<PageWithAppbarProps> = ({
  title,
  children,
  scrollViewStyle = {},
  staticContent,
  hasMenu = false,
  usePaper = false,
}) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [menuVisible, setMenuVisible] = React.useState(false);

  const backgroundComputedStyle = { ...styles.background };
  if (usePaper) backgroundComputedStyle.backgroundColor = 'white';

  const handleBackPress = () => { navigation.goBack() };

  const staticContentComponent = staticContent && (
    <View style={styles.fixedContentContainer}>
      {staticContent}
    </View>
  );

  const backButton = navigation.canGoBack() ? (
    <Appbar.Action icon="arrow-left" onPress={handleBackPress} />
  ) : undefined;

  const menu = hasMenu ? (
    <Menu
      visible={menuVisible}
      onDismiss={() => setMenuVisible(false)}
      anchor={<Appbar.Action icon="dots-vertical" color="white" onPress={() => setMenuVisible(true)} />}
    >
      <Menu.Item title="Reset Lesson Status" onPress={() => resetAllLessons().then(() => BackHandler.exitApp())} />
    </Menu>
  ) : undefined;

  return (
    <View style={backgroundComputedStyle}>
      <FocusAwareStatusBar barStyle="light-content" translucent backgroundColor={`${theme.colors.primary}`} />
      <View style={styles.pageContainer}>
        <Appbar.Header>
          {backButton}
          <Appbar.Content title={title} />
          {menu}
        </Appbar.Header>
        <ScrollView
          style={styles.contentAreaContainer}
          contentContainerStyle={{ ...styles.contentArea, ...scrollViewStyle }}
        >
          {children}
        </ScrollView>
        {staticContentComponent}
      </View>
    </View>
  );
};

export default PageWithAppbar;
