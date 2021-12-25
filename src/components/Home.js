import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setMovies } from '../features/movie/movieSlice';
import { selectUserName } from '../features/user/userSlice';
import { db } from '../firebase';
import ImgSlider from './ImgSlider';
import NewDisney from './NewDisney';
import Originals from './Originals';
import Recommends from './Recommends';
import Trending from './Trending';
import Viewers from './Viewers';

const Home = props => {
  const dispatch = useDispatch();
  const username = useSelector(selectUserName);
  let recommends = [];
  let newDisneys = [];
  let originals = [];
  let trending = [];

  //! firebase get data and store redux
  const movieData = async () => {
    const q = query(collection(db, 'movies'));

    const querySnapshot = await getDocs(q);
    querySnapshot.docs.map(doc => {
      // console.log(recommends);
      switch (doc.data().type) {
        case 'recommend':
          recommends = [...recommends, { id: doc.id, ...doc.data() }];
          break;
        case 'original':
          newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
          break;
        case 'new':
          originals = [...originals, { id: doc.id, ...doc.data() }];
          break;
        case 'trending':
          trending = [...trending, { id: doc.id, ...doc.data() }];
          break;

        default:
          break;
      }
    });
    dispatch(
      setMovies({
        recommend: recommends,
        newDisney: newDisneys,
        original: originals,
        trending: trending
      })
    );
  };

  useEffect(() => {
    movieData();
  }, [username]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  &:after {
    background: url('/images/home-background.png') center center / cover no-repeat fixed;
    content: '';
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
