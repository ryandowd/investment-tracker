import useGraphQL from '../hooks/useGraphQL';
import _ from 'lodash';

export const useDeleteSnapshot = (fetchAllAssets) => {

    const deleteSnapshot = (type, id) => {
        const typeUpperCase = _.capitalize(type);
        console.log(typeUpperCase, 'typeUpperCase typeUpperCase typeUpperCase')
        const query = `
            mutation {
                delete${typeUpperCase}(id:"${id}") {
                    id
                }
            }
        `;
    
        useGraphQL(query).then(response => {
            fetchAllAssets();
        }).catch(error => {
            console.info(error.message, 'error.message')
        });
    }

    return { deleteSnapshot };
}
