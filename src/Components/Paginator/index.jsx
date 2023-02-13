import styled from 'styled-components';
import { colors } from '../../styles/themes';
const MAX_ITEMS = 9;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

const Paginator = ({total, limit, offset, setOffset}) => {
  const current = offset ? (offset / limit) + 1 : 1;
  const pages = Math.ceil(total / limit);
  const first = Math.max(current - MAX_LEFT, 1);

  function onPageChange(page) {
    setOffset((page - 1) * limit);
    console.log('PAGE NUMBER', page)
  }

  return(
    <S.Container>
      <S.ContainerList>
          <S.PrevAndNextButton
            onClick={() => onPageChange(current - 1)}
            disabled={current === 1}
          >
          Previous
        </S.PrevAndNextButton>
        <S.ListItem>
        </S.ListItem>
        {Array.from({ length: Math.min(MAX_ITEMS, pages) })
        .map((_,index) => index + first)
        .map((page) =>( 
          <S.ListItem key={page}>
            <S.Button onClick={() => onPageChange(page)}>
              {page}
            </S.Button>
          </S.ListItem>
        ))}
          <S.ListItem>
        </S.ListItem>
          <S.PrevAndNextButton
            onClick={() => onPageChange(current + 1)}
            disabled={current === pages}
          >
          Next
        </S.PrevAndNextButton>
      </S.ContainerList>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  ContainerList: styled.ul`
    width: 40%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    @media(max-width: 550px){
      width: 90vw;
  }
  `,
  ListItem: styled.li`
    list-style: none;
    @media(max-width: 550px){
      display: none;
    }
  
  `,
  Button: styled.button`
    width: 30px;
    height: 30px;
    border-radius: 15px;
    cursor: pointer;
    border: none;
    transition: background ease-in-out .1s linear;
    &:hover {
      background: ${colors["dark"]};
      color: ${colors["white"]};
    }
  `,
  PrevAndNextButton : styled.button`
    width: 75px;
    height: 25px;
    border-radius: 20px;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer' };
    border: none;
    transition: background ease-in-out .1s  ;

    &:hover {
      background: ${colors["dark"]};
      color: ${colors["white"]};
    }
  `,
}

export default Paginator;