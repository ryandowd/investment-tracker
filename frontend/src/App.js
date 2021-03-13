import React, { useState, useEffect }  from "react";

import { client } from './client'
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

// const CheckboxExample = () => {
//   const [checked, setChecked] = useState(true)



//   return (
//     <FormControlLabel
//       control={<Checkbox 
//         checked={checked}
//         icon={<DeleteIcon />}
//         checkedIcon={<SaveIcon />}
//         onChange={(e) => setChecked(e.target.checked)}
//         color="primary"
//         inputProps={{
//           'aria-label': 'secondary checkbox'
//         }}
//       />}
//       label="Testing Checkbox"
//     />
//   )
// }
// https://graphql.contentful.com/content/v1/spaces/5iv5a2vqcsoy/explore?access_token=Ygpbdgh9RV0bjXyuYKfxGs4ibNIccarAgPJ8akmWfMY
// const accessToken =
//   "Ygpbdgh9RV0bjXyuYKfxGs4ibNIccarAgPJ8akmWfMY";
// const spaceId = "5iv5a2vqcsoy";
const query = `
{
  isa{
    id
    date
    stocks
    commodities
    bonds
    cash
  }
  crypto{
    id
    date
    bitcoin
    ether
    altcoins
  }
}
`;

// https://graphql.contentful.com/content/v1/spaces/5iv5a2vqcsoy/explore?access_token=Ygpbdgh9RV0bjXyuYKfxGs4ibNIccarAgPJ8akmWfMY

const App = () => {
  const [isas, setISAs] = useState([])
  const [cryptos, setCryptos] = useState([])

  const fetchData = async () => {
    // const results = await client.getEntries()
    // console.log(results, 'results')
    console.log("YEP")

    fetch(
      `http://localhost:4001/graphql`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          query
        })
      }
    )
      .then(res => {
        return res.json();
      })
      .then(response => {
        console.log(response);
        setISAs(response.data.isa)
        setCryptos(response.data.crypto)
        // const { data } = response;
        // console.log(data.albumCollection.items, 'data.albumCollection.items')
      })
      .catch(error => {
        console.log(error.message, 'error.message')
      });
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handlerAddCrypto = async () => {
    const addCryptoQuery = `
      mutation {
        createCrypto(bitcoin: 3.4, ether: 45, altcoins: 100000) {
          id
          date
          bitcoin
          ether
          altcoins
        }
      }
    `

    fetch(
      `http://localhost:4001/graphql`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          query: addCryptoQuery
        })
      }
    )
      .then(res => {
        return res.json();
      })
      .then(response => {
        console.log(response);
        fetchData();
      })
      .catch(error => {
        console.log(error.message, 'error.message')
      });
  }

  console.log(isas, 'isas.length')

  return (
    <ThemeProvider theme={theme}>
      <h1>Hello</h1>
      <Button
          endIcon={<SaveIcon />}
          onClick={handlerAddCrypto}
        >
        Save
      </Button>
      <ul>
        {isas.length && isas.map((isa, index) => {
          return (
            <li>
              <div>
                <p>{isa.id}</p>
                <p>{isa.date}</p>
                <p>{isa.cash}</p>
                <p>{isa.commodities}</p>
                <p>{isa.bonds}</p>
              </div>
            </li>
          )
        })}
      </ul>
      <ul>
        {cryptos.length && cryptos.map((crypto, index) => {
          return (
            <li>
              <div>
                <p>{crypto.id}</p>
                <p>{crypto.data}</p>
                <p>{crypto.bitcoin}</p>
                <p>{crypto.ether}</p>
                <p>{crypto.altcoins}</p>
              </div>
            </li>
          )
        })}
      </ul>
      {/* <h1>Hello</h1>
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
      </ButtonGroup> */}
    </ThemeProvider>
  )
};

export default App;