import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import FocusAwareStatusBar from '../common/FocusAwareStatusBar/FocusAwareStatusBar';
import NavigationContext from '../common/NavigationStack/NavigationContext';
import { EvaluationPageNavigationProp } from '../common/NavigationStack/NavigationStack';
import EvaluationCard, { EvaluationCriteria } from './EvaluationCard';
import styles from './styles';

type PhotoEvaluation = Record<EvaluationCriteria, number>;

interface EvaluationPageProps {
  evaluationCriteria?: EvaluationCriteria[],
};

const EvaluationPage: React.FC<EvaluationPageProps> = ({ evaluationCriteria }) => {
  const { imageURI } = React.useContext(NavigationContext);
  const theme = useTheme();
  const navigation = useNavigation<EvaluationPageNavigationProp>();
  const [evaluation, setEvaluation] = React.useState<PhotoEvaluation>();

  // Get photo evaluation when URI is updated
  React.useEffect(() => {
    if (!imageURI) return;

    fetch('http://192.168.0.191:8000/eval', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'image': imageURI}),
    })
    .then((res) => res.json())
    .then((evaluation: PhotoEvaluation) => setEvaluation(evaluation));
  }, [imageURI]);

  const handleBackPress = () => { navigation.goBack() };

  let evaluationCriteriaCards = undefined;
  if (evaluation) {
    evaluationCriteriaCards = [EvaluationCriteria.Exposure, EvaluationCriteria.GlobalBlur, EvaluationCriteria.Noise].map((criteria) => (
      <EvaluationCard criteria={criteria} value={evaluation[criteria]} key={criteria} />
    ));
  }

  return (
    <View style={styles.background}>
      <FocusAwareStatusBar barStyle="light-content" translucent backgroundColor={`${theme.colors.primary}`} />
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={handleBackPress} />
        <Appbar.Content title="Test" />
      </Appbar.Header>
      <View style={styles.contentArea}>
        {evaluationCriteriaCards}
      </View>
    </View>
  );
};

export default EvaluationPage;
