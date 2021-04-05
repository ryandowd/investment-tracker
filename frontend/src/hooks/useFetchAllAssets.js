import useGraphQL from '../hooks/useGraphQL';

export const useFetchAllAssets = (dispatchAsset) => {

    const fetchAllAssets = () => {
        const query = `
            {
                snapshot {
                id
                date
                dateUnix
                    crypto {
                        bitcoin
                        ether
                        altcoins
                    }
                    cash {
                        krakenGBP
                        krakenUSDT
                        krakenUSDC
                        celsiusUSDT
                        celsiusUSDC
                        blockfiUSDT
                        blockfiUSDC
                        spainEURO
                    }
                    isa {
                        stocks
                        commodities
                        bonds
                        cash
                    }
                }
            }
        `;
    
        useGraphQL(query).then(response => {
            dispatchAsset({
                type: 'set_all_assets',
                value: response.data
            });
        }).catch(error => {
            console.info(error.message, 'error.message')
        });
    }

    return { fetchAllAssets };
}
