declare module 'react-resizable' {
  import * as React from 'react';

  export interface ResizableBoxProps {
    width: number;
    height: number;
    axis?: 'both' | 'x' | 'y' | 'none';
    handle?: React.ReactElement | ((resizeHandle: string) => React.ReactElement);
    handleSize?: [number, number];
    lockAspectRatio?: boolean;
    maxConstraints?: [number, number];
    minConstraints?: [number, number];
    onResizeStop?: (e: React.SyntheticEvent, data: { node: HTMLElement, size: { width: number, height: number }, handle: string }) => void;
    onResizeStart?: (e: React.SyntheticEvent, data: { node: HTMLElement, size: { width: number, height: number }, handle: string }) => void;
    onResize?: (e: React.SyntheticEvent, data: { node: HTMLElement, size: { width: number, height: number }, handle: string }) => void;
    resizeHandles?: Array<'s' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne'>;
    transformScale?: number;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }

  export class ResizableBox extends React.Component<ResizableBoxProps> {}
}