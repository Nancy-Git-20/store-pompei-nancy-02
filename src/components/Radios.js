import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { cyan } from '@material-ui/core/colors';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

const CyanRadio = withStyles({
    root: {
      color: cyan[400],
      '&$checked': {
        color: cyan[600],
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

export default function RadioButtonsGroup({ pointsAdd, handlePoints }) {
 
  return (
    
    <FormControl id="RadioPuntos" component="fieldset">
      
      <RadioGroup
        row
        aria-label="SumaPuntos"
        name="points1"
        value={pointsAdd}
        onChange={handlePoints}
      >
        <FormControlLabel
          value="1000"
          control={<CyanRadio />}
          label="1000"
          labelPlacement="top"
        />
        <FormControlLabel
          value="5000"
          control={<CyanRadio />}
          label="5000"
          labelPlacement="top"
        />
        <FormControlLabel
          value="7500"
          control={<CyanRadio />}
          label="7500"
          labelPlacement="top"
        />
      </RadioGroup>
    </FormControl>
  );
}
