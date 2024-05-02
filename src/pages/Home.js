import { useState, useEffect } from "react";
import api from "../utils/api";

import Card from "../components/Card";
import Search from "../components/Search";

const Home = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      api.get("/pets").then((response) => {
        setPets(response.data.pets);
      });
      setLoading(false);
    }
    )();

    // Clean nup functoin
    return () => {
      setPets([]);
    };
  },[]);

  async function handleSubmit(query) {
    setLoading(true);
    await api.post(`/pets/search/${query}`).then((response) => {
      setPets(response.data.pets);
      setLoading(false);
    });
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <section className="md:mb-20">

      <Search handleSubmit={handleSubmit} />
      
      {!pets && <p>Não há pets cadastrados ou disponível para adoção.</p>}

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 md:mx-0">
        {pets.map((pet) => (
          <Card key={pet._id} pet={pet} />
        ))}
      </div>
    </section>
  );
};

export default Home;
