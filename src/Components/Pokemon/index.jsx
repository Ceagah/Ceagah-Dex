import { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../../service/api.js';
import { colors, sizes } from '../../styles/themes';

const Pokemon  = (data) => {
  const [pokemonData, setPokemonData] = useState();
  const [pokemonMainType, setPokemonMainType] = useState();
  const [pokemonSecondType, setPokemonSecondType] = useState();

  const path = data.url.split('/');
  const dexNumber = path[6];

  useEffect(() => {
    api.get(`pokemon/${dexNumber}/`).then(
      (response) => {
        setPokemonData(response.data);
        setPokemonMainType(response.data.types[0].type.name);
        if(response.data.types[1]){
          setPokemonSecondType(response.data.types[1].type.name);
        } 
      }
    )
  })
  if(pokemonData === null){
    return <></>
  }

  return (
    <S.Container backgroundColor={pokemonMainType} onClick={data.onClick}>
      <S.PokemonSprite src={pokemonData?.sprites?.front_default} />
      <S.PokemonName>
        {data.name.toUpperCase()}
      </S.PokemonName>
      <S.PokemonExp>
        Base Exp: {pokemonData?.base_experience}	
      </S.PokemonExp>
    </S.Container>
  )
}

const S = {
  Container : styled.div.attrs((props) => ({
    borderColor: props.borderColor,
    backgroundColor: props.backgroundColor,
    color: props.color,
  }))`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 8vw;
    height: 25vh;
    margin: 10px;
    border-radius: 15px;
    cursor: pointer;
    background-color: ${(props) => colors[props.backgroundColor]};
    &:hover{
      transform: scale(1.1);
      box-shadow: 5px 2px 1px rgba(0, 0, 0, .2)
    }

    @media(max-width: 1420px){
      width: 15vw;
      height: 35vh;
    }

    @media(max-width: 900px){
      width: 25vw;
    }

    @media(max-width: 600px){
      width: 30vw;
    }

      @media(max-width: 400px){
      width: 75vw;
    }
  `,
  PokemonName: styled.h3`
    font-size: ${sizes["large"]};
    color: ${colors["black"]};
    font-weight: bold;
    
    @media(max-width: 1420px){
      font-size: ${sizes["large"]};
    }
  `,
  PokemonExp: styled.span`
    color: ${colors["black"]};
    font-size: ${sizes["normal"]};
  `,
  PokemonSprite: styled.img``,
}

export default Pokemon;