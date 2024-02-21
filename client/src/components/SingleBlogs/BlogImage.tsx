import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

type PROPS = {
  image: string;
  alt: string;
  width: string;
};

export default function BlogImage({ image, alt, width }: PROPS) {
  return (
    <LazyLoadImage
      src={image}
      effect="blur"
      alt={alt}
      placeholderSrc={image}
      width={width}
      height="auto"
    />
  );
}
