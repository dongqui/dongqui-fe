import styled from 'styled-components';
import { useRef, useState } from 'react';

import { useIntersectionObserver } from '../hooks';

interface Props {
  src: string;
  width: string;
  height: string;
}

const LazyImage = ({ src, width, height}: Props) => {
  const [showImg, setShowImg] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  useIntersectionObserver(imgRef, {
    onIntersection: () => setShowImg(true),
    frozenAfterOnce: true,
  });

  return <Img ref={imgRef} width={width} height={height} src={showImg? src : '/defaultThumbnail.jpg'}/>
}

export default LazyImage;

const Img = styled.img`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;