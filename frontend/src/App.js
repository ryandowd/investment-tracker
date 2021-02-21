import React from "react";
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextField from '@material-ui/core/TextField'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'
import { orange } from '@material-ui/core/colors'
import './main.css'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: orange
  },
  typography: {
    fontFamily: 'Courier'
  }
})

const CheckboxExample = () => {
  const [checked, setChecked] = React.useState(true)
  return (
    <FormControlLabel
      control={<Checkbox 
        checked={checked}
        icon={<DeleteIcon />}
        checkedIcon={<SaveIcon />}
        onChange={(e) => setChecked(e.target.checked)}
        color="primary"
        inputProps={{
          'aria-label': 'secondary checkbox'
        }}
      />}
      label="Testing Checkbox"
    />
  )
}

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <h1>Hello</h1>
      <TextField 
        variant="outlined"
        color="secondary"
        type="date"
      />
      <CheckboxExample />
      <ButtonGroup
        variant="contained"
        color="primary"
        size="large"
      >
      <Button
          endIcon={<SaveIcon />}
        >
          Save
        </Button>
        <Button
          endIcon={<DeleteIcon />}
          color="secondary"
        >
          Discard
        </Button>
      </ButtonGroup>
    </ThemeProvider>
  )
};

export default App;