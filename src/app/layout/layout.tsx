import { Outlet } from 'react-router-dom'
import './layout.scss'
import { Header } from '../../widgets/header'

export const Layout = () => {
    return (
        <>
            <Header />

            <main className='layout__content'>
                <Outlet />
            </main>

            {/* <Footer className='layout__footer' /> */}
        </>
    )
}
