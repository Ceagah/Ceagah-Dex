
import { useEffect, useState } from 'react';
import { CgPokemon } from 'react-icons/cg';
import { FaRegStar, FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../service/api.js';
import { colors, sizes } from '../../styles/themes';


const PokeDetails = () => {
  const [pokemonData, setPokemonData] = useState();
  const [pokemonMainType, setPokemonMainType] = useState();
  const [isFavorite, setIsFavorite] = useState();

  const fullPath = window.location.href;
  const path = fullPath.split('/');
  const Pokename = path[4];
  const navigate = useNavigate()

const checkFavoritePokemon = (id) => {
  const favPokeIds = JSON.parse(localStorage.getItem("favPokeIds")) || [];
setIsFavorite(favPokeIds.includes(id));
}

useEffect(() => {
  api.get(`/pokemon/${Pokename}/`).then(
  (response) => {
  setPokemonData(response.data);
  setPokemonMainType(response.data.types[0].type.name);
  checkFavoritePokemon(response.data.id);
})},[])

const handleFavorite = () => {
  const favPokeIds = JSON.parse(localStorage.getItem("favPokeIds")) || [];
  const currentPokemonId = pokemonData?.id;
  const alreadyAdded = favPokeIds.includes(currentPokemonId);
  if (!alreadyAdded) {
    favPokeIds.push(currentPokemonId);
    localStorage.setItem("favPokeIds", JSON.stringify(favPokeIds));
    setIsFavorite(true);
    alert("Your pokemon is added to favorite!");
  } else {
    setIsFavorite(false);
    localStorage.setItem(
      "favPokeIds",
      JSON.stringify(favPokeIds.filter((id) => id !== currentPokemonId))
    );
    alert("Your pokemon was removed from favorite!");
  }
};

  if(pokemonData === null){
    return <></>
  }
  
  return(
    <S.Container backgroundColor={pokemonMainType}>  
      <S.Header>
        <S.HeaderTitle>
          {pokemonData?.name.toUpperCase()} -
          # {pokemonData?.id}
        </S.HeaderTitle>
      </S.Header>
        <S.SpritesContainer>
          <S.PokemonSprite src={pokemonData?.sprites?.front_default} />
          <S.SpriteDetails>Normal Sprite</S.SpriteDetails>
          <S.PokemonSprite src={pokemonData?.sprites?.front_shiny} />
          <S.SpriteDetails>Shiny Sprite</S.SpriteDetails>
        </S.SpritesContainer>
      <S.Main>
        <S.DetailsContainer>
          <S.DetailsTitle>Basic Info</S.DetailsTitle>
          <S.DetailsRow>
            <S.DetailsSubtitles>Main Type : </S.DetailsSubtitles>
            <S.DetailsText>{pokemonData?.types[0]?.type.name.toUpperCase()}</S.DetailsText>
          </S.DetailsRow>
          { pokemonData?.types[1] && (
              <S.DetailsRow> 
                <S.DetailsSubtitles>Secondary Type : </S.DetailsSubtitles>
                <S.DetailsText>{pokemonData?.types[1]?.type.name.toUpperCase()}</S.DetailsText>
              </S.DetailsRow>
          )}
          <S.DetailsRow>
            <S.DetailsSubtitles>Base Experience : </S.DetailsSubtitles>
            <S.DetailsText>{pokemonData?.base_experience}</S.DetailsText>
          </S.DetailsRow>
          <S.DetailsRow>
            <S.DetailsSubtitles>National Dex Number : </S.DetailsSubtitles>
            <S.DetailsText>{pokemonData?.id}</S.DetailsText>
          </S.DetailsRow>
          <S.DetailsRow>
            <S.DetailsSubtitles>Height : </S.DetailsSubtitles>
            <S.DetailsText>{pokemonData?.height}ft</S.DetailsText>
          </S.DetailsRow>
          <S.DetailsRow>
            <S.DetailsSubtitles>Weight : </S.DetailsSubtitles>
            <S.DetailsText>{pokemonData?.weight}lb</S.DetailsText>
          </S.DetailsRow>
        </S.DetailsContainer>
        <S.StatsContainer>
          <S.DetailsTitle>Base Stats</S.DetailsTitle>
          <S.DetailsRow>
            <S.DetailsSubtitles>HP : </S.DetailsSubtitles>
            <S.DetailsText>{pokemonData?.stats[0]?.base_stat}</S.DetailsText>
          </S.DetailsRow>
          <S.DetailsRow>
            <S.DetailsSubtitles>Attack : </S.DetailsSubtitles>
            <S.DetailsText>{pokemonData?.stats[1]?.base_stat}</S.DetailsText>
          </S.DetailsRow>
          <S.DetailsRow>
            <S.DetailsSubtitles>Defense : </S.DetailsSubtitles>
            <S.DetailsText>{pokemonData?.stats[2]?.base_stat}</S.DetailsText>
          </S.DetailsRow>
          <S.DetailsRow>
            <S.DetailsSubtitles>Special Attack : </S.DetailsSubtitles>
            <S.DetailsText>{pokemonData?.stats[3]?.base_stat}</S.DetailsText>
          </S.DetailsRow>
          <S.DetailsRow>
            <S.DetailsSubtitles>Special Defense : </S.DetailsSubtitles>
            <S.DetailsText>{pokemonData?.stats[4]?.base_stat}</S.DetailsText>
          </S.DetailsRow>
          <S.DetailsRow>
            <S.DetailsSubtitles>Speed : </S.DetailsSubtitles>
            <S.DetailsText>{pokemonData?.stats[5]?.base_stat}</S.DetailsText>
          </S.DetailsRow>
        </S.StatsContainer>
      </S.Main>
      <S.Footer>
        <S.Button onClick={() => handleFavorite()}>
          {isFavorite ? <FaStar/> : <FaRegStar/>} Favorite Pokemon
        </S.Button>
        <S.Button onClick={() => navigate('/')}>
            <CgPokemon/>
            Back to home
        </S.Button>
      </S.Footer>
    </S.Container>
  );
}

const S = {
  Container : styled.div.attrs((props) => ({
    backgroundColor: props.backgroundColor,
  }))`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    min-width: 100vw;
    min-height: 100vh;
    background-color: ${(props) => colors[props.backgroundColor]};
  `,
  Header: styled.header`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors["black"]};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  `,
  HeaderTitle: styled.h3`
  font-size: ${sizes["large"]};
  color: ${colors["white"]};
  letter-spacing: 3px;
  `,
  Main : styled.main`
    width: 100%;
    height: 90%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    margin-bottom: 20px;
    
  `,
  SpritesContainer: styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
  `,
  PokemonSprite: styled.img`
    width: 16rem;
    height: 16rem;
  `,
  SpriteDetails: styled.span`
    font-size: 1.5rem;
    color: ${colors["black"]};
    font-weight: bold;
  `,
  DetailsContainer: styled.div`
    width: 50%;
    height: 15%;
    border: 5px solid #000;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    background: ${colors["white"]};
  `,
  StatsContainer: styled.div`
    border: 5px solid #000;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    background: ${colors["white"]};
  `,
  DetailsRow: styled.div`
    margin-top: 5px;
  `,
  DetailsTitle: styled.h3``,
  DetailsSubtitles: styled.span`
    font-size: ${sizes["large"]}
  `,
  
  DetailsText: styled.span`
    font-weight: bold;
  `,
  Footer: styled.footer`
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;
  `,
  Button: styled.button`
    width: 150px;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-radius: 20px; 
    border: none; 
    cursor: pointer;
  `,
  ButtonText: styled.span``,
}

export default PokeDetails;