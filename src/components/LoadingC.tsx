import { Section } from "../MovieF/UpcomingTopRated";
import { MobileSlider } from "./MobileSliderC"
import { SliderContainer } from "./WebSliderC";

const LoadingC = () => {
  return (
    window.outerWidth <= 550 ? 
    <MobileSlider></MobileSlider> : 
    <Section>
      <SliderContainer></SliderContainer>
    </Section>
  );
};
export default LoadingC;
