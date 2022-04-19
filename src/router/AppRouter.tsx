import { useRoutes } from 'raviger'

import About from "../components/About"
import App from '../App'
import AppContainer from '../AppContainer'
import { Form } from '../components/Form'
import Home from '../components/Home'
import { PreviewQuiz } from '../components/PreviewQuiz'
import Login from '../components/Login'
import { User } from '../types/userType'

const routes = {
    '/': () => <Home />,
    '/login': () => <Login />,
    '/about': () => <About />,
    "/form/:id": ({ id }: { id: string }) => <Form formId={Number(id)} />,
    "/preview/:id": ({ id }: { id: string }) => <PreviewQuiz formId={Number(id)} />
}

export default function AppRouter(props: { currentUser: User }) {
    let routeResult = useRoutes(routes)
    return (<AppContainer currentUser={props.currentUser}>
        {routeResult}
    </AppContainer>)
}