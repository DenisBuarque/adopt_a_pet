import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Lei from "./pages/Lei";
import MyPets from "./pages/MyPets";
import MyVisits from "./pages/MyVisits";
import AddPet from "./pages/AddPet";
import EditPet from "./pages/EditPet";
import PetShow from "./pages/PetShow";
import MyAdoptions from "./pages/MyAdoptions";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Auth/Profile";
// Componentes
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Message from "./components/Message";
// Context
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/lei" element={<Lei />} />
            <Route path="/mypets" element={<MyPets />} />
            <Route path="/myvisits" element={<MyVisits />} />
            <Route path="/addpet" element={<AddPet />} />
            <Route path="/editpet/:id" element={<EditPet />} />
            <Route path="/petshow/:id" element={<PetShow />} />
            <Route path="/myadoptions" element={<MyAdoptions />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
