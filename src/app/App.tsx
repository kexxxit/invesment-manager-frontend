import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from './layout'
import { ManualModePage } from '../pages/manualModePage'

function App() {
    return (
        <BrowserRouter>
            <div className='App_wrapper'>
                <Routes>
                    <Route path={'/'} element={<Layout />}>
                        <Route index element={<ManualModePage/>} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
