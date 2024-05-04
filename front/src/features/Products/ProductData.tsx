import {useAppDispatch, useAppSelector} from '../../App/hooks';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Card, CardContent, CardMedia, Grid, styled, Typography} from '@mui/material';
import {selectProducts} from './productsSlice';
import {useEffect} from 'react';
import {deleteOneProduct, getProducts} from './productsThunks';
import {selectUser} from '../Users/usersSlice';

const ProductData = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const products = useAppSelector(selectProducts);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUrl = async () => {
      await dispatch(getProducts());
    };

    void fetchUrl();
  }, [dispatch]);

  const ImageCardMedia = styled(CardMedia)({
    paddingTop: '30%',
    width: '40%',
    height: 0,
    marginRight: '30px',
  });

  const product = products.find(elemId => elemId._id === params.id);

  const deleteProduct = async () => {
    if (params.id) {
      await dispatch(deleteOneProduct(params.id));
    }

    navigate('/');
  };

  return (
    <>
      {product && <Grid container sx={{display: 'flex', flexDirection: 'row', gap: 3, mt: '20px'}}>
        <Grid container>
          <Card sx={{width: 700, mr: 'auto', ml: 'auto'}}>
            <CardContent sx={{display: 'flex'}}>
              {product.image !== null ? <ImageCardMedia image={'http://localhost:8000' + '/' + product.image}/> : ''}
              <Typography component="div" sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography gutterBottom component="div">
                  Name: {product.user.displayName}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  Title: {product.title}
                </Typography>
                <Typography gutterBottom component="div">
                  Description:
                  {product.description}
                </Typography>
                <Typography component="div">
                  phone: {product.user.phone}
                </Typography>
                <Typography component="div">
                  category: {product.category}
                </Typography>
                <Typography sx={{color: 'red', mt: 'auto'}} variant="h5" component="div">
                  Price: {product.price} som
                </Typography>
                {user?._id === product.user._id ? <Button onClick={deleteProduct}>Sold</Button> : ''}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>}

    </>
  );
};

export default ProductData;