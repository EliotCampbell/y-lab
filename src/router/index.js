
import MainPage from "../pages/main-page";
import SingleItemPage from "../pages/single-Item-page";

export const publicRoutes = [
  { path: '/', component: <MainPage />, exact: true },
  { path: '/item/:id', component: <SingleItemPage />, exact: true },
  { path: '/*', component: <h1>Whoops.. 404</h1>, exact: true }
]
