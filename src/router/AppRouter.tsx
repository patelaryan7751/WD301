import { useRoutes } from 'raviger'
import React from 'react'
import AppContainer from '../AppContainer'
import { User } from '../types/userType'
const Home = React.lazy(() => import('../components/Home'));
const About = React.lazy(() => import('../components/About'));
const Login = React.lazy(() => import('../components/Login'));
const Form = React.lazy(() => import('../components/Form'));
const PreviewQuiz = React.lazy(() => import('../components/PreviewQuiz'));

const routes = {
    '/': () => <React.Suspense fallback={<div className="flex items-center justify-center">Loading ....</div>}>
        <Home />
    </React.Suspense>,
    '/login': () => <React.Suspense fallback={<div className="flex items-center justify-center">Loading ....</div>}>
        <Login />
    </React.Suspense>,
    '/about': () => <React.Suspense fallback={<div className="flex items-center justify-center">Loading ....</div>}>
        <About />
    </React.Suspense>,
    "/form/:id": ({ id }: { id: string }) =>
        <React.Suspense fallback={<div className="flex items-center justify-center">Loading ....</div>}>
            <Form formId={Number(id)} />
        </React.Suspense>,
    "/preview/:id": ({ id }: { id: string }) =>
        <React.Suspense fallback={<div className="flex items-center justify-center">Loading ....</div>}>
            <PreviewQuiz formId={Number(id)} />
        </React.Suspense>,
}

export default function AppRouter(props: { currentUser: User }) {
    let routeResult = useRoutes(routes)
    return (<AppContainer currentUser={props.currentUser}>
        {routeResult}
    </AppContainer>)
}