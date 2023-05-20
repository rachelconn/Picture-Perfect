import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Modal, Portal, Text } from 'react-native-paper';
import { BackendPhotoEvaluation, BlurType, Evaluation, EvaluationCriteria, LessonEvaluationCriteria } from '../../classes/evaluation';
import Lesson from '../../classes/lesson';
import { useSelector } from '../../redux/store';
import { setLessonStatus } from '../../utils/lessonStatus';
import AnchoredButton from '../common/AnchoredButton/AnchoredButton';
import NavigationContext from '../common/NavigationStack/NavigationContext';
import PageWithAppbar from '../common/PageWithAppbar/PageWithAppbar';
import Typography from '../common/Typography/Typography';
import EvaluationCard from './EvaluationCard';
import styles from './styles';

const defaultCriteria: EvaluationCriteria[] = [
  EvaluationCriteria.Exposure,
  EvaluationCriteria.Blur,
  EvaluationCriteria.Noise,
];

const EvaluationPage: React.FC = () => {
  const navigation = useNavigation();
  const { imageURI } = React.useContext(NavigationContext);
  const [evaluations, setEvaluations] = React.useState<Evaluation[]>();
  const currentLesson = useSelector((state) => state.currentLesson);

  const criteriaToUse: EvaluationCriteria[] = currentLesson.lesson ? LessonEvaluationCriteria[currentLesson.lesson] : defaultCriteria;

  // Get photo evaluation when URI is updated
  React.useEffect(() => {
    if (!imageURI) return;

    fetch('http://192.168.10.8:8000/eval', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ image: imageURI }),
    })
    .then((res) => res.json())
    .then((backendEvaluations: BackendPhotoEvaluation) => {
      const newEvaluations = Object.values(EvaluationCriteria)
        .filter((criteria) => criteriaToUse.includes(criteria))
        .map((criteria) => new Evaluation(criteria, backendEvaluations, currentLesson.lesson));
      setEvaluations(newEvaluations);
    });
  }, [imageURI]);

  // Show evaluation cards if evaluation is complete, otherwise inform user of loading
  if (evaluations) {
    let allEvaluationsGood = true;
    const evaluationCards = evaluations.map((evaluation) => {
      allEvaluationsGood = allEvaluationsGood && evaluation.feedback.isGood;
      return <EvaluationCard evaluation={evaluation} key={evaluation.criteria} />
    });

    const buttonIcon = allEvaluationsGood ? 'check' : 'refresh';
    const buttonText = allEvaluationsGood ? 'Finish Lesson' : 'Try Again';
    const handleButtonPress = () => {
      if (allEvaluationsGood) {
        setLessonStatus(currentLesson.lesson as Lesson, {
          completed: true,
          evaluation: evaluations[0].rawValues,
        });
        navigation.navigate('LessonSelect');
      }
      else {
        navigation.goBack();
      }
    };
    const navigationButton = (
      <AnchoredButton
        icon={buttonIcon}
        mode="contained"
        onPress={handleButtonPress}
      >
        {buttonText}
      </AnchoredButton>
    );

    return (
      <PageWithAppbar title="Evaluation" staticContent={navigationButton}>
        {evaluationCards}
      </PageWithAppbar>
    );
  }
  else {
    // Content to render before evaluation is complete
    return (
      <PageWithAppbar title="Evaluation">
        <Portal>
          <Modal visible style={styles.loadingModal} onDismiss={() => navigation.goBack()}>
            <View style={styles.loadingModalContent}>
              <ActivityIndicator size="large" color="white" />
              <Typography variant="bodyMedium" color="white">
                Evaluating...
              </Typography>
            </View>
          </Modal>
        </Portal>
      </PageWithAppbar>
    );
  }
};

export default EvaluationPage;
