declare module 'react-range-slider-input' {
    import * as React from 'react';
  
    export interface RangeSliderProps {
      min?: number;
      max?: number;
      step?: number;
      defaultValue?: number[];
      value?: number[];
      onInput?: (value: number[]) => void;
      onChange?: (value: number) => void;
      thumbsDisabled ?: [boolean, boolean];
    }
  
    const RangeSlider: React.FC<RangeSliderProps>;
    export default RangeSlider;
  }
  