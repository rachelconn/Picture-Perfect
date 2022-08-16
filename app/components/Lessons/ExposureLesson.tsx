import React from 'react';
import Article from '../common/Article/index';
import PageWithAppbar from '../common/PageWithAppbar/PageWithAppbar';
import underexposedImage from '../../images/underexposed.jpg';

const underexposedImageCaption = "This image is underexposed. Despite being taken midday in a bright area, most of the image is very dark, including the sky.";

const ExposureLesson: React.FC = () => {
  return (
    <PageWithAppbar title="Exposure" usePaper>
      <Article.Container>
        <Article.SectionHeader>
          What is exposure?
        </Article.SectionHeader>
        <Article.Paragraph>
          The exposure of a photograph is defined as the amount of light that reaches the camera sensor.
          It may be easier to think of exposure simply as how bright a photograph is— a properly exposed photo tends to have colors close to real life,
          while photo that looks bright and washed out can be called "overexposed"
          and a photo where the subject is hardly visible is called "underexposed".
          Here are some example photographs: think about whether you would consider each one underexposed, overexposed, or properly exposed before reading the caption for an explanation.
        </Article.Paragraph>
        <Article.CaptionedImage source={underexposedImage} caption={underexposedImageCaption} />
      </Article.Container>
    </PageWithAppbar>
  );
};

export default ExposureLesson;
