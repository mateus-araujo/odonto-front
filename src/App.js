import React from 'react'
import Routes from './routes'
import Footer from './components/Footer'
import Header from './components/Header'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

const App = () => (
  <div className="App">
    <Header />
    <Routes />
    <Footer />
  </div>
)

export default App
