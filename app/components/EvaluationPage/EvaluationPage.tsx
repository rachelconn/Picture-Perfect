import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Modal, Portal, Text } from 'react-native-paper';
import { Evaluation, EvaluationCriteria, LessonEvaluationCriteria } from '../../classes/evaluation';
import Lesson from '../../classes/lesson';
import { useSelector } from '../../redux/store';
import { updateSectionStatus } from '../../utils/lessonStatus';
import AnchoredButton from '../common/AnchoredButton/AnchoredButton';
import NavigationContext from '../common/NavigationStack/NavigationContext';
import PageWithAppbar from '../common/PageWithAppbar/PageWithAppbar';
import Typography from '../common/Typography/Typography';
import EvaluationCard from './EvaluationCard';
import styles from './styles';

// The format evaluations will be received from the backend
type BackendPhotoEvaluation = Record<EvaluationCriteria, number>;
// The format evaluations will be converted into for efficiency
type PhotoEvaluations = Map<EvaluationCriteria, Evaluation>;

const defaultCriteria = [
  EvaluationCriteria.Exposure,
  EvaluationCriteria.GlobalBlur,
  EvaluationCriteria.Noise,
];

const EvaluationPage: React.FC = () => {
  const navigation = useNavigation();
  const { imageURI } = React.useContext(NavigationContext);
  const [evaluations, setEvaluations] = React.useState<PhotoEvaluations>();
  const currentLesson = useSelector((state) => state.currentLesson);

  const criteriaToUse = currentLesson.lesson ? LessonEvaluationCriteria[currentLesson.lesson] : defaultCriteria;

  // Get photo evaluation when URI is updated
  React.useEffect(() => {
    if (!imageURI) return;

    fetch('http://192.168.10.17:8000/eval', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'image': imageURI}),
    })
    .then((res) => res.json())
    .then((backendEvaluations: BackendPhotoEvaluation) => {
      const evaluations: PhotoEvaluations = new Map(Object.entries(backendEvaluations).map(([criteria, value]) => {
        return [criteria as EvaluationCriteria, new Evaluation(criteria as EvaluationCriteria, value)];
      }));
      setEvaluations(evaluations);
    });
  }, [imageURI]);

  // Show evaluation cards if evaluation is complete, otherwise inform user of loading
  let pageContent;
  if (evaluations) {
    let allEvaluationsGood = true;
    const evaluationCards = criteriaToUse.map((criteria) => {
      const evaluation = evaluations.get(criteria) as Evaluation;
      allEvaluationsGood = allEvaluationsGood && evaluation.feedback.isGood;
      return <EvaluationCard evaluation={evaluation} key={criteria} />;
    });

    const buttonIcon = allEvaluationsGood ? 'check' : 'refresh';
    const buttonText = allEvaluationsGood ? 'Finish Lesson' : 'Try Again';
    const handleButtonPress = () => {
      if (allEvaluationsGood) {
        const evaluation: Partial<Record<EvaluationCriteria, number>> = {};
        criteriaToUse.forEach((criteria) => evaluation[criteria] = evaluations.get(criteria)?.value);
        updateSectionStatus(currentLesson.lesson as Lesson, currentLesson.section as string, {
          completed: true,
          evaluation,
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
  return (
    <PageWithAppbar title="Evaluation">
      <Portal>
        <Modal visible style={styles.loadingModal}>
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
};

export default EvaluationPage;
