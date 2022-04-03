import { useRoutes } from 'raviger'

import About from "../components/About"
import App from '../App'
import AppContainer from '../AppContainer'
import { Form } from '../components/Form'
import Home from '../components/Home'
import { PreviewQuiz } from '../components/PreviewQuiz'

const routes = {
    '/': () => <Home />,
    '/about': () => <About />,
    "/forms/:id": ({ id }: { id: string }) => <Form formId={Number(id)} />,
    "/preview/:id": ({ id }: { id: string }) => <PreviewQuiz formId={Number(id)} />
}

export default function AppRouter() {
    let routeResult = useRoutes(routes)
    return (<AppContainer>
        {routeResult}
    </AppContainer>)
}