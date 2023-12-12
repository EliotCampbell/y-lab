export const getCategories = async () => {
  try {
    return await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`)
      .then(response => response.json())
      .then((data) => data.result)
  } catch (error) {
    console.log(error.message)
  }
}

export const getArticles = async (apiParams) => {
  try {
    return await fetch(`/api/v1/articles?${new URLSearchParams(apiParams)}`)
      .then(response => response.json())
      .then((data) => data.result)
  } catch (error) {
    console.log(error.message)
  }
}
