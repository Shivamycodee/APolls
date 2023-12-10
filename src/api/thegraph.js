const ENDPOINT =
  "https://api.studio.thegraph.com/query/60948/apolls-thegraph/version/latest";


export const getData = async (address) => {
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
  query MyQuery  {
    entityVoteCollecteds {
     entity
     voteCount
    }
  }
`,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch graph data:", response.statusText);
      return null;
    }
  } catch (e) {
    console.log("err when calling graph : ", e);
  }
};
