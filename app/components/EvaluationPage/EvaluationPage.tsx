import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Modal, Portal, Text } from 'react-native-paper';
import { EvaluationCriteria, LessonEvaluationCriteria } from '../../classes/evaluation';
import { useSelector } from '../../redux/store';
import NavigationContext from '../common/NavigationStack/NavigationContext';
import PageWithAppbar from '../common/PageWithAppbar/PageWithAppbar';
import Typography from '../common/Typography/Typography';
import EvaluationCard from './EvaluationCard';
import styles from './styles';

type PhotoEvaluation = Record<EvaluationCriteria, number>;

interface EvaluationPageProps {
  evaluationCriteria?: EvaluationCriteria[],
};

const defaultCriteria = [
  EvaluationCriteria.Exposure,
  EvaluationCriteria.GlobalBlur,
  EvaluationCriteria.Noise,
];

const EvaluationPage: React.FC<EvaluationPageProps> = ({ evaluationCriteria }) => {
  const { imageURI } = React.useContext(NavigationContext);
  const [evaluation, setEvaluation] = React.useState<PhotoEvaluation>();
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
    .then((evaluation: PhotoEvaluation) => setEvaluation(evaluation));
  }, [imageURI]);


  // Show evaluation cards if evaluation is complete, otherwise inform user of loading
  const pageContent = evaluation ? (
    criteriaToUse.map((criteria) => (
      <EvaluationCard criteria={criteria} value={evaluation[criteria]} key={criteria} />
    ))
  ) : (
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
  );


  return (
    <PageWithAppbar title="Evaluation">
      {pageContent}
    </PageWithAppbar>
  );
};

export default EvaluationPage;
