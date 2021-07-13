import { Card, 
    CardMedia, 
    CardContent, 
    CardActions, 
    Button,
    Typography, 
    CardHeader,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    TextField,
    Grid,
    Box} from '@material-ui/core';
import Head from 'next/head'
import Image from 'next/image'
import { Product } from '../../../model';
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';
import http from '../../../http';
import { useRouter } from 'next/dist/client/router';
import axios from 'axios';

interface OrderPageProps{
  product: Product
}

const OrderPage: NextPage<OrderPageProps> = ({product}) => {

  return (
    <div>
      <Head>
        <title>Pagamento</title>
      </Head>    
      <Typography component="h1" variant="h3" color="textPrimary" gutterBottom>
        Checkout
      </Typography>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={product.image_url}/>
        </ListItemAvatar>
        <ListItemText
          primary={product.name}
          secondary={`R$ ${product.price}`}
        />
      </ListItem>
      <Typography component="h2" variant="h6" gutterBottom>
        Pague com cartão de crédito
      </Typography> 
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField label="Nome" required fullWidth/>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Numero do cartão" required fullWidth inputProps={{ maxLength: 16 }}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField type="number" label="CVV" required fullWidth/>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField type="number" label="Expiração mês" required fullWidth/>
              </Grid>
              <Grid item xs={6}>
                <TextField type="number" label="Expiração ano" required fullWidth/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box marginTop={3}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Pagar
          </Button>
        </Box>
      </form> 
    </div>
  )
}

export default OrderPage;

export const getServerSideProps: GetServerSideProps<OrderPageProps, {slug: string}> = async (context) => {
  const {slug} = context.params!;

  try{
  const {data: product} = await http.get(`products/${slug}`);
  console.log(product)
  return {
    props:{
      product
    },
  };
}catch(e){
  if(axios.isAxiosError(e) && e.response?.status === 404){
    return { notFound: true };
  }
  throw e;
}
}