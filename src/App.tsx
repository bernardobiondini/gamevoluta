import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthContextProvider } from "./contexts/AuthContext";

import { Home } from "./pages/login";
import { UpPoints } from "./pages/up-page";
import { Ranking } from "./pages/ranking";
import { Requisicoes } from "./pages/requisicoes";
import { AdminPage } from "./pages/admin/admin-points";
import { AdminTasks } from "./pages/admin/admin-tasks";

import './global.scss'
import { AdminMembers } from "./pages/admin/admin-members";
import { AdminTeams } from "./pages/admin/admin-teams";
import { Member } from "./pages/member";

import './services/firebase';
import { Head } from "./components/header";


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/cadastro" element={<Home />} />
          <Route path="/" element={ <UpPoints/>} />
          <Route path="/ranking" element={ <Ranking/>} />
          <Route path="/requisicoes" element={ <Requisicoes/>} />
          <Route path="/ranking/member/:id" element={ <Member/>} />
          <Route path="/admin/pontos" element={ <AdminPage/>} />
          <Route path="/admin/tarefas" element={ <AdminTasks/>} />
          <Route path="/admin/membros" element={ <AdminMembers/>} />
          <Route path="/admin/casas" element={ <AdminTeams/>} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
