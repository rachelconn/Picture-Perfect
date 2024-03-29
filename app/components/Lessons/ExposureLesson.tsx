import React from 'react';
import Article from '../common/Article/index';
import underexposedImage from '../../images/underexposed.jpg';
import overexposedImage from '../../images/overexposed.jpg';
import properlyExposedImage from '../../images/properlyexposed.jpg';
import noisyImage from '../../images/PLACEHOLDERnoisy.jpg';
import motionBlurImage from '../../images/PLACEHOLDERmotionblur.jpg';
import LessonPage from './LessonPage';
import Lesson from '../../classes/lesson';

const underexposedImageCaption = "This image is underexposed. Despite being taken midday in a bright area, most of the image is very dark, including the sky.";
const overexposedImageCaption = "This image is overexposed. The sky and road are incredibly bright, and the colors in much of the image are washed out. While parts of the tree and sidewalk are properly exposed, it's important to consider the composition of the photo overall when judging exposure.";
const properlyExposedImageCaption = "This image is properly exposed. The colors are rich and lifelike throughout the image, and the background's brightness doesn't jump out from the rest of the image like the other two images above.";
const noisyImageCaption = "Notice how the photo in this example looks grainy, like it was taken with an antique camera. This is due to the ISO value being set too high, creating digital noise.";
const blurryImageCaption = "Using an exposure time that's too long will result in an image like this, where fast-moving objects blur due to their movement within the shutter time of the camera.";

const ExposureLesson: React.FC = () => {
  return (
    <LessonPage title="Exposure" lessonId={Lesson.Exposure}>
      <Article.SectionHeader>What Is Exposure?</Article.SectionHeader>
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
      </Article.Paragraph>
      <Article.CaptionedImage source={noisyImage} caption={noisyImageCaption} />
      <Article.Paragraph>
        To minimize noise, you should adjust exposure primarily by changing the shutter speed,
        using the lowest ISO value that allows you to keep the photo properly exposed.
        For photos in still settings, you might be able to get away with using an exposure time of half a second or more if necessary,
        but some situations (for example, trying to take a photo of a car or moving animal) could cause motion blur even with an exposure time of 1/100 of a second.
        With longer exposure times, be sure to keep your camera still to avoid motion blur caused by the shakiness of your hands!
        Using a tripod can help with this immensely.
      </Article.Paragraph>
      <Article.CaptionedImage source={motionBlurImage} caption={blurryImageCaption} />
      <Article.Paragraph>
        Overall, the process of creating a properly exposed photo will look something like this:
      </Article.Paragraph>
      <Article.NumberedList>
        <Article.ListItem>Determine an intial ISO value based on the movement of your subject and background: if objects are slow or stationary, try a low value between 100-500. For fast-moving objects, you might need to raise the ISO to 1000 or more.</Article.ListItem>
        <Article.ListItem>Adjust the exposure time to create a properly exposed image. Feel free to adjust your ISO if necessary!</Article.ListItem>
        <Article.ListItem>Take a photo, adjusting the appropriate setting if there's digital noise or smearing.</Article.ListItem>
      </Article.NumberedList>
      <Article.SectionHeader>Measuring Exposure</Article.SectionHeader>
      <Article.Paragraph>
        In order to evaluate the exposure of photos,
        photographers often measure exposure in terms of "stops".
        One stop corresponds to halving or doubling the amount of light in a photo,
        and an exposure value of 0 means that a photo has just the right amount of exposure.
        This means that a photo with an exposure value of -1 is underexposed and should be about twice as bright,
        while a photo with an exposure value of +1 is overexposed by a single stop and should be roughly half as bright.
        Try thinking about this when looking at your photo evaluations and adjust accordingly!
      </Article.Paragraph>
      <Article.SectionHeader>Your Task</Article.SectionHeader>
      <Article.Paragraph>
        Now that you know what settings are responsible for adjusting exposure and what proper exposure look like,
        it's time to practice getting the right exposure in your own photos!
        Go into a well-lit room and find any subject you're interested in photographing, then try to take a properly exposed picture.
        Once you take the photo, we'll rate your photo and let you know how you did.
      </Article.Paragraph>
    </LessonPage>
  );
};

export default ExposureLesson;
