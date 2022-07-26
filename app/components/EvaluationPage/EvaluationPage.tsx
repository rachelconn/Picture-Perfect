import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, View } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import FocusAwareStatusBar from '../common/FocusAwareStatusBar/FocusAwareStatusBar';
import NavigationContext from '../common/NavigationStack/NavigationContext';
import { EvaluationPageNavigationProp } from '../common/NavigationStack/NavigationStack';
import EvaluationCard, { EvaluationCriteria } from './EvaluationCard';
import styles from './styles';

interface EvaluationPageProps {
  evaluationCriteria?: EvaluationCriteria[],
};

const EvaluationPage: React.FC<EvaluationPageProps> = ({ evaluationCriteria }) => {
  const { imageURI } = React.useContext(NavigationContext);
  const theme = useTheme();
  const navigation = useNavigation<EvaluationPageNavigationProp>();

  const handleBackPress = () => { navigation.goBack() };

  const evaluationCriteriaCards = [EvaluationCriteria.Exposure, EvaluationCriteria.BackgroundBlur, EvaluationCriteria.WhiteBalance].map((criteria) => (
    <EvaluationCard criteria={criteria} key={criteria} />
  ));

  return (
    <View style={styles.background}>
      <FocusAwareStatusBar barStyle="light-content" translucent backgroundColor={`${theme.colors.primary}`} />
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={handleBackPress} />
        <Appbar.Content title="Test" />
      </Appbar.Header>
      <View style={styles.contentArea}>
        <Image source={{ uri: imageURI }} style={{ width: 160, height: 90 }} />
        {evaluationCriteriaCards}
      </View>
    </View>
  );
};

export default EvaluationPage;
