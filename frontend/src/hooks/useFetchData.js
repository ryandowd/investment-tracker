import React, { useEffect, useReducer, createContext } from "react";

// Utils 
import { tensesMap } from '../utils/tenses-map';

const DataContext = createContext(null);

const initialState = {
    isa: [],
    cry: null
}

const dataReducer = (state, action) => {
    switch(action.type) {
        case 'fetch_all_data': 
            return {
                ...state,

            }
        default:
            return state;
    }
}

        // case 'set_all_tenses':
        //     return {
        //         ...state,
        //         tenses: action.value.tenses,
        //         selectedTense: action.value.selectedTense
        //     }
        // case 'selected_tense':
        //     return {
        //         ...state,
        //         selectedTense: action.value.selectedTense
        //     }
        // case 'update_tense':
        //     const tenseId = action.value.selectedTense.id;
        //     const updatedTenses = state.tenses.map(tense => {
        //         return tense.id === tenseId ? action.value.selectedTense : tense;
        //     });
        //     return {
        //         ...state,
        //         tenses: [...updatedTenses],
        //         selectedTense: action.value.selectedTense
        //     }
        // case 'add_tense':
        //     return {
        //         ...state,
        //         selectedTense: action.value.tenses.slice(-1)[0]
        //     }
        // case 'delete_tense':
        //     return {
        //         ...state,
        //         selectedTense: action.value.tenses[0]
        //     }
//         default:
//             return state;
//     }
// };



const TensesProvider = (props) => {
    const [tenseState, dispatchTenses] = useReducer(tensesReducer, initialState);

    useEffect(() => {
        // Also save this state to the DB
        const getTensesData = async () => {
            let tensesStateObj;

            // Get the tenses
            const result = await axios({
                url: `https://spanish-app-ryan.herokuapp.com/api/tenses`
            });

            if (result && result.data[0]) {
                tensesStateObj = result.data[0];
            } else {
                // Clone the tenses map. 
                // Then append a new obj that maps to each conjugation and stores
                // the user inputs. This is used to store the user input and also compare it to
                // the original conjugation so that we know which conjugation the user has correctly entered
                let extraFieldsMap = [...tensesMap];
                extraFieldsMap && extraFieldsMap.map((tense, index) => {
                    extraFieldsMap[index].userConjugations = _.cloneDeep(extraFieldsMap[index].conjugations);
                    extraFieldsMap[index].matchingConjugations = _.cloneDeep(extraFieldsMap[index].conjugations);
                    Object.keys(extraFieldsMap[index].userConjugations).map(conjugationType => {
                        tense.userConjugations[conjugationType].map((key, index) => {
                            tense.userConjugations[conjugationType][index] = '';
                            tense.matchingConjugations[conjugationType][index] = false;
                        });
                    });
                });
                
                tensesStateObj = {
                    tenses: extraFieldsMap,
                    selectedTense: tensesMap[0]
                }

                // Also save this state to the DB
                const postTensesData = async () => {
                    const result = await axios({
                        method: 'POST',
                        url: `https://spanish-app-ryan.herokuapp.com/api/tenses`,
                        data: tensesStateObj
                    });
                }
                postTensesData();
            }

            dispatchTenses({
                type: 'set_all_tenses',
                value: tensesStateObj
            });
        }

        getTensesData();
    }, []);
        
    return (
        <TensesContext.Provider value={{ tenseState, dispatchTenses }}>
            {props.children}
        </TensesContext.Provider>
    );
}


export { TensesContext,  TensesProvider }