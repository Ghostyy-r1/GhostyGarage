import { ReactNode } from 'react';
import { Parallax, Background } from 'react-parallax';
import { cn } from '@/lib/utils';

interface ParallaxContainerProps {
  children: ReactNode;
  imageUrl: string;
  strength?: number;
  className?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  bgImageStyle?: React.CSSProperties;
}

export function ParallaxContainer({
  children,
  imageUrl,
  strength = 200,
  className,
  overlayColor = 'black',
  overlayOpacity = 0.7,
  bgImageStyle,
}: ParallaxContainerProps) {
  return (
    <Parallax
      strength={strength}
      className={cn("w-full relative", className)}
      bgImageStyle={{ 
        objectFit: 'cover',
        objectPosition: 'center',
        ...bgImageStyle
      }}
    >
      <Background className="custom-bg">
        <div
          style={{
            height: '100%',
            width: '100%',
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(0px)',
          }}
        />
      </Background>
      
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
        }}
      />
      
      <div className="relative z-10">
        {children}
      </div>
    </Parallax>
  );
}

export function ParallaxSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      {children}
    </div>
  );
}