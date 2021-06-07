import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useCheckoutStore from 'store/checkoutStore';
import { useRouter } from 'next/router'
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';


export default function Cart() {
  const router = useRouter();
  const [
    orderItems,
    getOrderItems,
    loading
  ] = useCheckoutStore(state => [
    state.orderItems,
    state.getOrderItems,
    state.loading
  ])

  React.useEffect(() => {
    getOrderItems();
  }, [])

  return (
    <div className="cart">
      <h1>
          Cart
      </h1>

      {orderItems.length === 0 && loading &&
      <>
        <Grid container justify="center">
          Loading Products ...
          <CircularProgress />
        </Grid>
      </>
      }

      {orderItems.length > 0 &&
        orderItems.map((item, index) => (
          <React.Fragment key={index}>
            <br/>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={item.title}
                  height="140"
                  image={item.image}
                />
                <CardContent>
                  <Typography gutterBottom variant="body1" component="h2">
                    {item.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button onClick={() => {alert('decrease button clicked')}} size="small" color="primary">
                  -
                </Button>
                1
                <Button onClick={() => {alert('increase button clicked')}} size="small" color="primary">
                  +
                </Button>
                <Button onClick={() => {alert('delete button clicked')}} size="small" color="primary">
                  delete item
                </Button>
              </CardActions>
            </Card>
          </React.Fragment>
        ))
      }

      <br/><br/>

      <Grid container justify="flex-end">
        <Button 
          onClick={() => router.push('/checkout')}
          variant="contained"
          size="large"
          color="primary"
        >
          Checkout Now 💳
        </Button>
      </Grid>
    </div>
  )
}
