import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Overview from './pages/Overview/Overview';
import Payments from './pages/Payments/Payments';
import RiskAnalysis from './pages/RiskAnalysis/RiskAnalysis';
import Alerts from './pages/Alerts/Alerts';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Overview />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/risk" element={<RiskAnalysis />} />
          <Route path="/alerts" element={<Alerts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
