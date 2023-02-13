import { useEffect, useState } from 'react';
import { CgPokemon } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import Pokemon from '../../Components/Pokemon';
import api from '../../service/api';

import { BackButton, BackButtonText, Container, Header, HeaderTitle, Section } from './styles';

const Favorites  = () => {
  const [favPokeIds, setFavPokeIds] = useState()
  const [pokemonData, setPokemonData] = useState();
  const [pokemonNames, setPokemonNames] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    const favPokeIds = JSON.parse(localStorage.getItem("favPokeIds")) || [];
    setFavPokeIds(favPokeIds);
  }, []);

  useEffect(() => {
    if(favPokeIds){
      favPokeIds.forEach((id) => {
        api.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((response) => {
          setPokemonNames((prevNames) => [...prevNames, response.data.name]);
        });
      });
    }
  }, [favPokeIds]);

return (
  <Container>
    <Header>
      <HeaderTitle>Favorite pokemons</HeaderTitle>
    </Header>
    <BackButton onClick={() => navigation('/')}>
        <CgPokemon size={24} />
        <BackButtonText>
          Back to home
        </BackButtonText>
      </BackButton>
    <Section>
      {favPokeIds && favPokeIds.map((id, index) => ( pokemonNames[index] && (
        <Pokemon
          key={id}
          url={`https://pokeapi.co/api/v2/pokemon/${id}/`}
          name={pokemonNames[index]}
          onClick={() => navigation(`/details/${id}`)} 
          data={undefined}
        />
      )
    ))}
    </Section>

  </Container>
);
}

export default Favorites;