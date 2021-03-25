import moment from "moment";
import {
    cashSubTotal,
    cryptoSubTotal,
    isaSubTotal
} from './calculateSubTotals';

export const calculateTotals = (isas, cryptos, cashs) => {
    const allDatesArr = [];
    const assetsList = [];

    // if (!isas || !cryptos || !cashs) {
    //     return [];
    // }

    // Merge all of the array items into one array
    const allAssets = [].concat(...[isas, cryptos, cashs]);

    // Then find all the unique dates for all of the items
    allAssets.map(asset => {
        if (!allDatesArr.includes(asset.date)) {
            allDatesArr.push(asset.date);
        }
    });

    // Then, for each unique date, combine the assets
    allDatesArr.map((date, index)=> {
        assetsList[index] = {
            date: date,
            dateUnix: moment.unix(date).format('MMMM Do YYYY')
        }

        isas.map(isa => {
            if (isa.date === date) {
                assetsList[index] = {
                    ...assetsList[index],
                    isaTotal: isaSubTotal(isa)
                }
            }
        });

        cryptos.map(crypto => {
            if (crypto.date === date) {
                assetsList[index] = {
                    ...assetsList[index],
                    cryptoTotal: cryptoSubTotal(crypto)
                }
            }
        });

        cashs.map(cash => {
            if (cash.date === date) {
                assetsList[index] = {
                    ...assetsList[index],
                    cashTotal: cashSubTotal(cash)
                }
            }
        });
    });

    // Sort the dates by the unix times
    assetsList.sort((a, b) => {
        return a.dateUnix - b.dateUnix;
    });

    return [ ...assetsList ];
}