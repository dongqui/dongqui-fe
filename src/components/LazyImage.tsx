import styled from 'styled-components';
import { useRef } from 'react';

import { useIntersectionObserver } from '../hooks';

interface Props {
  src: string;
  width: string;
  height: string;
}

const LazyImage = ({ src, width, height}: Props) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const entry = useIntersectionObserver(imgRef, {});
  
  const isShow = entry?.isIntersecting;

  return <Img ref={imgRef} width={width} height={height} src={isShow? src : '/defaultThumbnail.jpg'}/>
}

export default LazyImage;

const Img = styled.img`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;