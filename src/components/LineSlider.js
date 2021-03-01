import React from "react";
import Slider from "@material-ui/core/Slider";

const pointMarks = [
  {
    value: 1000,
    label: "1000 puntos"
  },
  {
    value: 5000,
    label: "5000 puntos"
  },
  {
    value: 7500,
    label: "7500 puntos"
  }
];

export default function LineSlider({handlePoints}) {
  

  return (
    <div className="SliderPoints">
      <Slider
        defaultValue={1000}
        min={1000}
        step={500}
        max={7500}
        marks={pointMarks}
        onChange={handlePoints}
        valueLabelDisplay="on"
        aria-labelledby="non-linear-slider"
      />
    </div>
  );
}
