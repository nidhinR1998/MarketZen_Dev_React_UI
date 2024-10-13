import { Route, Routes } from "react-router-dom"
import Home from "./page/Home/Home"
import Navbar from "./page/Navbar/Navbar"
import Portfolio from "./page/Portfolio/Portfolio"
import Activity from "./page/Activity/Activity"
import Wallet from "./page/Wallet/Wallet"
import Withdrawal from "./page/Withdrawal/Withdrawal"
import PaymantDetails from "./page/PaymantDetails/PaymantDetails"
import StockDetails from "./page/Stock Details/StockDetails"
import Watchlist from "./page/Watchlist/Watchlist"
import Profile from "./page/Profile/Profile"
import SearchCoin from "./page/Search/SearchCoin"
import Notfound from "./page/Notfound/Notfound"

function App() {
 // const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/portfolio" element={<Portfolio/>}/>
      <Route path="/activity" element={<Activity/>}/>
      <Route path="/wallet" element={<Wallet/>}/>
      <Route path="/withdrawal" element={<Withdrawal/>}/>
      <Route path="/payment-details" element={<PaymantDetails/>}/>
      <Route path="/market/:id" element={<StockDetails/>}/>
      <Route path="/watchlist" element={<Watchlist/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/search" element={<SearchCoin/>}/>
      <Route path="*" element={<Notfound/>}/>

     </Routes>
    
    </>
  )
}

export default App
