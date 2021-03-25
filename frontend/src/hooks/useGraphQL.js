const useGraphQL = async (query) => {
    const response = await fetch(
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
    );
    const data = await response.json();

    if (data) {
        console.log('YEP!');
    }

    return data;
}

export default useGraphQL