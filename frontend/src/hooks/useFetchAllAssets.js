import useGraphQL from '../hooks/useGraphQL';

export const useFetchAllAssets = (dispatchAsset) => {

    const fetchAllAssets = () => {
        const query = `
            {
                crypto{
                    id
                    date
                    dateUnix
                    bitcoin
                    ether
                    altcoins
                }
                cash{
                    id
                    date
                    dateUnix
                    krakenGBP
                    krakenUSDT
                    krakenUSDC
                    celsiusUSDT
                    celsiusUSDC
                    blockfiUSDT
                    blockfiUSDC
                    spainEURO
                }
                isa{
                    id
                    date
                    dateUnix
                    stocks
                    commodities
                    bonds
                    cash
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
