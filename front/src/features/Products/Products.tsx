import {Link, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../App/hooks';
import {selectLoadingProducts, selectProducts} from './productsSlice';
import {Card, CardContent, CardMedia, CircularProgress, Grid, Typography} from '@mui/material';
import {useEffect} from 'react';
import {getProducts} from './productsThunks';

const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectLoadingProducts);
  const params = useParams();

  useEffect(() => {
    const fetchUrl = async () => {
      await dispatch(getProducts());
    };

    void fetchUrl();
  }, [dispatch]);

  const productsCategory = products.filter(product => product.category === params.id);

  return (
      <>
        <Grid sx={{display: "flex", gap: 5}}>
          <Link to="/">All items</Link>
          <Link to="/cars">Cars</Link>
          <Link to="/computers">Computers</Link>
          <Link to="/household">Household</Link>
          <Link to="/other">Household</Link>
        </Grid>

        <Grid container sx={{display: 'flex', flexDirection: 'row', gap: 3, mt: '20px'}}>
          {!isLoading ? productsCategory.map((elem) => (
              <Grid item key={elem._id} sx={{width: 300, mr: 'auto', ml: 'auto'}}>
                <Link to={`/product/${elem._id}`}>
                  <Card>
                    <CardContent>
                      {elem.image !== null ?
                          <CardMedia
                              component="img"
                              image={'http://localhost:8000' + '/' + elem.image}
                              sx={{ paddingTop: '80%', height: 0, width: '90%', margin: 'auto' }}
                          /> : ''}
                      <Typography component="div" sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography gutterBottom variant="h6" component="div">
                          {elem.title}
                        </Typography>
                        <Typography variant="h5" component="div" sx={{ color: '#34a853' }}> {/* Зеленый текст */}
                          {elem.price} som
                        </Typography>
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
          )) : <CircularProgress sx={{ color: '#34a853' }} />} {/* Зеленый индикатор загрузки */}

          {!isLoading && !params.id ? products.map((elem) => (
              <Grid item key={elem._id} sx={{width: 300, mr: 'auto', ml: 'auto'}}>
                <Link to={`/product/${elem._id}`}>
                  <Card>
                    <CardContent>
                      {elem.image !== null ?
                          <CardMedia
                              component="img"
                              image={'http://localhost:8000' + '/' + elem.image}
                              sx={{ paddingTop: '80%', height: 0, width: '90%', margin: 'auto' }}
                          /> : ''}
                      <Typography component="div" sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography gutterBottom variant="h6" component="div">
                          {elem.title}
                        </Typography>
                        <Typography variant="h5" component="div" sx={{ color: '#34a853' }}> {/* Зеленый текст */}
                          {elem.price} som
                        </Typography>
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
          )) : ''}
        </Grid>
      </>
  );
};

export default Products;