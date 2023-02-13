import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Paginator from '../../Components/Paginator';
import Pokemon from '../../Components/Pokemon';
import api from '../../service/api';
import { Container, FavButton, FavButtonText, FavButtonTextSmall, Header, HeaderTitle, Section } from './styles';

const LIMIT = 20;
const OFFSET = 0;
const TOTAL = 1279; 

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offSet, setOffSet] = useState(OFFSET);
  const navigation = useNavigate();

  useEffect(() => {
    api.get(`/pokemon?limit=${LIMIT}&offset=${offSet}`).then((response) => {
      setPokemons(response.data.results);
    });
  },[offSet])
  
    if(pokemons === null){
      return <></>
    }

  return(
    <Container>
      <Header>
        <HeaderTitle>
          Tekever Pokedex
        </HeaderTitle>
        
      </Header>
      <FavButton onClick={() => navigation('/favorites')}>
          <FavButtonText>
            Check your favorite pokemons !
          </FavButtonText>
          <FavButtonTextSmall>
            Fav Pokemons
          </FavButtonTextSmall>
      </FavButton>
      <Paginator setOffset={setOffSet} limit={LIMIT} total={TOTAL} offset={offSet}/>
      <Section>
        {pokemons.map((pokemon) => (
          <Pokemon key={pokemon.name} url={pokemon.url} name={pokemon.name} data={pokemon} onClick={() => navigation(`/details/${pokemon.name}`)}/>
        ))}
      </Section>
    </Container>
  );
}

export default Home;