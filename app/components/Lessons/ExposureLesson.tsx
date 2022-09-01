import React from 'react';
import Article from '../common/Article/index';
import PageWithAppbar from '../common/PageWithAppbar/PageWithAppbar';
import underexposedImage from '../../images/underexposed.jpg';
import overexposedImage from '../../images/overexposed.jpg';
import properlyExposedImage from '../../images/properlyexposed.jpg';

const underexposedImageCaption = "This image is underexposed. Despite being taken midday in a bright area, most of the image is very dark, including the sky.";
const overexposedImageCaption = "This image is overexposed. The sky and road are incredibly bright, and the colors in much of the image are washed out. While parts of the tree and sidewalk are properly exposed, it's important to consider the composition of the photo overall when judging exposure.";
const properlyExposedImageCaption = "This image is properly exposed. The colors are rich and lifelike throughout the image, and the background's brightness doesn't jump out from the rest of the image like the other two images above.";
const noisyImageCaption = "Notice how the photo in this example looks grainy, like it was taken with an antique camera. This is due to the ISO value being set too high, creating digital noise.";

// TODO: bring up intentional over/underexposure
// "In addition, you can manually under- or overexpose an image to achieve interesting visual effects -> have a couple example images"

const ExposureLesson: React.FC = () => {
  return (
    <PageWithAppbar title="Exposure" usePaper>
      <Article.Container>
        <Article.SectionHeader>What is exposure?</Article.SectionHeader>
        <Article.Paragraph>
          The exposure of a photograph is defined as the amount of light that reaches the camera sensor.
          It may be easier to think of exposure simply as how bright a photograph is— a properly exposed photo tends to have colors close to real life,
          while photo that looks bright and washed out can be called "overexposed"
          and a photo where the subject is hardly visible is called "underexposed".
          Here are some example photographs: think about whether you would consider each one underexposed, overexposed, or properly exposed before reading the caption for an explanation.
        </Article.Paragraph>
        <Article.CaptionedImage source={underexposedImage} caption={underexposedImageCaption} />
        <Article.CaptionedImage source={overexposedImage} caption={overexposedImageCaption} />
        <Article.CaptionedImage source={properlyExposedImage} caption={properlyExposedImageCaption} />
        <Article.SectionHeader>Adjusting Exposure</Article.SectionHeader>
        <Article.Paragraph>
          Now that you have an idea of what exposure is and how to evaluate it, the next step is to think about how to get the proper exposure in images you take.
          While most cameras automatically adjust exposure by default, manually setting your exposure often produces better results.
          There are two settings that determine the exposure of a photograph: the ISO and exposure time.
          Understanding exposure time is fairly straightforward: it is simply the amount of time the camera's light sensors are exposed to light.
          Therefore, increasing the exposure time will let them absorb more light, and increase the exposure of an image accordingly.
          The darker your environment, the more you will have to increase exposure time to absorb the little light that is available.
        </Article.Paragraph>
        <Article.Paragraph>
          On the other hand, ISO is a little more complicated to understand.
          Essentially, ISO determines how sensitive the camera's sensors are to light,
          meaning that with the same exposure time, a photo with a higher ISO value will take in more light and have higher exposure.
          While this means that adjusting the ISO value and exposure time can be used to change the exposure overall,
          it's important to consider ISO's effect on noise.
        </Article.Paragraph>
        <Article.SectionHeader>Dealing With Noise</Article.SectionHeader>
        <Article.Paragraph>
          While increasing the ISO of a photo will let you get the same level of exposure with a shorter shutter speed,
          it also has a tendency to produce digital noise.
          Since the camera's sensors are more sensitive, they can pick up erroneous information that leads to photos that look fuzzy or grainy.
          This grain is known as noise, and knowing how to control the amount of noise in an image is key to taking great photographs.
          <Article.CaptionedImage source={} caption={noisyImageCaption} />
        </Article.Paragraph>
      </Article.Container>
    </PageWithAppbar>
  );
};

export default ExposureLesson;
