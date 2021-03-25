import React, { useReducer, createContext, useContext } from "react";
import { calculateTotals } from '../utils/calculateTotals';

const AssetContext = createContext();

const initialState = {
    isas: [],
    cryptos: [],
    cashs: []
}

const assetReducer = (state, { type, value: { isa, crypto, cash } }) => {
    switch(type) {
        case 'set_all_assets': 
            const newState = {
                ...state,
                isas: isa,
                cryptos: crypto,
                cashs: cash,
                assetsList: calculateTotals(isa, crypto, cash)
            }
            return newState
        default:
            return state;
    }
}

const AssetProvider = (props) => {
    const [assetState, dispatchAsset] = useReducer(assetReducer, initialState);        
    return (
        <AssetContext.Provider value={{ assetState, dispatchAsset }}>
            {props.children}
        </AssetContext.Provider>
    );
}

const useAssetContext = () => {
    const context = useContext(AssetContext)
    if (context === undefined) {
        throw new Error('useAssetContext must be used within a AssetProvider')
    }
    return context
  }


export { AssetProvider, useAssetContext }