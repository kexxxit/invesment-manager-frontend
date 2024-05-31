import React from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from './layout'
import { ManualModePage } from '../pages/manualModePage'
import { Authorization } from '../pages/authorization/ui/authorization'
import { Bond } from '../pages/bond'
import { Strategies } from '../pages/strategies'
import { Portfolio } from '../pages/portfolio'

function App() {
    return (
        <BrowserRouter>
            <div className='App_wrapper'>
                <Routes>
                    <Route path={'/'} element={<Layout />}>
                        <Route index element={<ManualModePage />} />
                        <Route path={'/auth'} element={<Authorization />} />
                        <Route path={'/strategies'} element={<Strategies />} />
                        <Route path={'/portfolio'} element={<Portfolio />} />
                        <Route path={':bondId'} element={<Bond />}/>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
