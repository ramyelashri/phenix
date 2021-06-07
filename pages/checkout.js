import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import useCheckoutStore from 'store/checkoutStore';
import useUserStore from 'store/userStore';
import { useRouter } from 'next/router';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useFormik} from "formik";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Checkout(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const user = useUserStore(state => state.user);

  const [
    address,
    setAddress,
    orderItems,
    payment,
    setPayment,
    total,
    currency,
    createOrder,
    isOrderSuccess,
    loading
  ] = useCheckoutStore(state => [
    state.address,
    state.setAddress,
    state.orderItems,
    state.payment,
    state.setPayment,
    state.total,
    state.currency,
    state.createOrder,
    state.isOrderSuccess,
    state.loading
  ]);

  const steps = ['Shipping address', 'Payment details', 'Review your order'];
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const addressFormik = useFormik({
    initialValues: {
      firstName: 'First',
      lastName: 'last',
      address: 'somewhere, dubai',
      city: 'Dubai',
      zip: '78000',
      country: 'UAE',
      phone: '12345678',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      address: Yup.string().required('Required'),
      city: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      zip: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      country: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    }),
    onSubmit: values => {
      setAddress(values)
      handleNext()
    },
  });

  const paymentFormik = useFormik({
    initialValues: {
      cardName: 'Full name',
      cardNumber: '4444444444444444',
      expDate: '21/23',
      cvv: '123',
    },
    validationSchema: Yup.object({
      cardName: Yup.string()
        .max(40, 'Must be 40 characters or less')
        .required('Required'),
      cardNumber: Yup.number()
        .typeError('Must be a number')
        .positive()
        .required('Required'),
      expDate: Yup.string()
        .typeError('Not a valid expiration date. Example: MM/YY')
        .max(5, 'Not a valid expiration date. Example: MM/YY')
        .matches(
          /([0-9]{2})\/([0-9]{2})/,
          'Not a valid expiration date. Example: MM/YY'
        )
        .required('Expiration date is required'),
      cvv: Yup.number()
        .typeError('Must be a number')
        .required('Required'),
    }),
    onSubmit: values => {
      setPayment(values)
      handleNext()
    },
  });

  React.useEffect(() => {
    if(activeStep === steps.length) {
      setTimeout(() => {
        handleOpen()
      }, 5000);
    }
  }, [activeStep]);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      address,
      payment,
      orderItems,
      total,
      user
     };
    createOrder(orderData);
    handleNext();
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>
                  <Typography variant="body2" component="h3">
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {/* Thank you step */}
            {activeStep === steps.length && !loading && isOrderSuccess ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is <b>#2001539</b>.
                  <br/>
                  We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                  <hr/>
                  <b>Order items</b>
                  <List disablePadding>
                    {orderItems.map((item) => (
                      <ListItem className={classes.listItem} key={item.title}>
                        <ListItemText primary={item.title}  />
                        <Typography variant="body2">{item.quantity} x {item.price} {item.currency}</Typography>
                      </ListItem>
                    ))}
                  </List>
                  <div>
                  </div>
                </Typography>
                <Dialog
                  open={open}
                  onClose={handleClose}
                >
                  <DialogContent>
                    <DialogContentText>
                      Continue shopping now by&nbsp;
                      <Button onClick={() => router.push('/cart')} color="primary">Clicking here</Button>
                    </DialogContentText>
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <>
                {/* Shipping address form step */}
                {activeStep === 0 &&
                  <>
                    <Typography variant="h6" gutterBottom>
                      Shipping address
                    </Typography>
                    <form onSubmit={addressFormik.handleSubmit}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              error={addressFormik.touched.firstName && addressFormik.errors.firstName}
                              helperText={addressFormik.touched.firstName && addressFormik.errors.firstName ? addressFormik.errors.firstName : ''}
                              id="firstName"
                              name="firstName"
                              label="First name"
                              fullWidth
                              autoComplete="given-name"
                              onChange={addressFormik.handleChange}
                              onBlur={addressFormik.handleBlur}
                              value={addressFormik.values.firstName}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              error={addressFormik.touched.lastName && addressFormik.errors.lastName}
                              helperText={addressFormik.touched.lastName && addressFormik.errors.lastName ? addressFormik.errors.lastName : ''}
                              id="lastName"
                              name="lastName"
                              label="Last name"
                              fullWidth
                              autoComplete="family-name"
                              onChange={addressFormik.handleChange}
                              onBlur={addressFormik.handleBlur}
                              value={addressFormik.values.lastName}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              error={addressFormik.touched.address && addressFormik.errors.address}
                              helperText={addressFormik.touched.address && addressFormik.errors.address ? addressFormik.errors.address : ''}
                              id="address"
                              name="address"
                              label="Address"
                              fullWidth
                              autoComplete="shipping address-line1"
                              onChange={addressFormik.handleChange}
                              onBlur={addressFormik.handleBlur}
                              value={addressFormik.values.address}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              error={addressFormik.touched.city && addressFormik.errors.city}
                              helperText={addressFormik.touched.city && addressFormik.errors.city ? addressFormik.errors.city : ''}
                              id="city"
                              name="city"
                              label="City"
                              fullWidth
                              autoComplete="shipping city"
                              onChange={addressFormik.handleChange}
                              onBlur={addressFormik.handleBlur}
                              value={addressFormik.values.city}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField id="state" name="state" label="State/Province/Region" fullWidth />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              error={addressFormik.touched.zip && addressFormik.errors.zip}
                              helperText={addressFormik.touched.zip && addressFormik.errors.zip ? addressFormik.errors.zip : ''}
                              id="zip"
                              name="zip"
                              label="Zip / Postal code"
                              fullWidth
                              autoComplete="shipping postal-code"
                              onChange={addressFormik.handleChange}
                              onBlur={addressFormik.handleBlur}
                              value={addressFormik.values.zip}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              error={addressFormik.touched.country && addressFormik.errors.country}
                              helperText={addressFormik.touched.country && addressFormik.errors.country ? addressFormik.errors.country : ''}
                              id="country"
                              name="country"
                              label="Country"
                              fullWidth
                              autoComplete="shipping country"
                              onChange={addressFormik.handleChange}
                              onBlur={addressFormik.handleBlur}
                              value={addressFormik.values.country}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              error={addressFormik.touched.phone && addressFormik.errors.phone}
                              helperText={addressFormik.touched.phone && addressFormik.errors.phone ? addressFormik.errors.phone : ''}
                              id="phone"
                              name="phone"
                              label="Phone number"
                              fullWidth
                              autoComplete="shipping phone"
                              onChange={addressFormik.handleChange}
                              onBlur={addressFormik.handleBlur}
                              value={addressFormik.values.phone}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <FormControlLabel
                              control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                              label="Use this address for payment details"
                            />
                          </Grid>
                        </Grid>
                        <div className={classes.buttons}>
                          {activeStep !== 0 && (
                            <Button onClick={handleBack} className={classes.button}>
                              Back
                            </Button>
                          )}
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.button}
                          >
                            {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                          </Button>
                        </div>
                      </form>
                  </>
                }
                {/* Payment form step */}
                {activeStep === 1 &&
                  <>
                    <form onSubmit={paymentFormik.handleSubmit}>
                      <Typography variant="h6" gutterBottom>
                        Payment method
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            error={paymentFormik.touched.cardName && paymentFormik.errors.cardName}
                            helperText={paymentFormik.touched.cardName && paymentFormik.errors.cardName ? paymentFormik.errors.cardName : ''}
                            id="cardName"
                            name="cardName"
                            label="Name on card"
                            fullWidth
                            autoComplete="cc-name"
                            onChange={paymentFormik.handleChange}
                            onBlur={paymentFormik.handleBlur}
                            value={paymentFormik.values.cardName}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            error={paymentFormik.touched.cardNumber && paymentFormik.errors.cardNumber}
                            helperText={paymentFormik.touched.cardNumber && paymentFormik.errors.cardNumber ? paymentFormik.errors.cardNumber : ''}
                            id="cardNumber"
                            label="Card number"
                            name="cardNumber"
                            fullWidth
                            autoComplete="cc-number"
                            onChange={paymentFormik.handleChange}
                            onBlur={paymentFormik.handleBlur}
                            value={paymentFormik.values.cardNumber}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            error={paymentFormik.touched.expDate && paymentFormik.errors.expDate}
                            helperText={paymentFormik.touched.expDate && paymentFormik.errors.expDate ? paymentFormik.errors.expDate : ''}
                            id="expDate"
                            name="expDate"
                            label="Expiry date"
                            fullWidth autoComplete="cc-exp"
                            onChange={paymentFormik.handleChange}
                            onBlur={paymentFormik.handleBlur}
                            value={paymentFormik.values.expDate}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            error={paymentFormik.touched.cvv && paymentFormik.errors.cvv}
                            helperText={paymentFormik.touched.cvv && paymentFormik.errors.cvv ? paymentFormik.errors.cvv : ''}
                            id="cvv"
                            label="CVV"
                            name="cvv"
                            inputProps={{ maxLength: 3 }}
                            fullWidth
                            autoComplete="cc-csc"
                            onChange={paymentFormik.handleChange}
                            onBlur={paymentFormik.handleBlur}
                            value={paymentFormik.values.cvv}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                            label="Remember credit card details for next time"
                          />
                        </Grid>
                      </Grid>
                      <div className={classes.buttons}>
                        {activeStep !== 0 && (
                          <Button onClick={handleBack} className={classes.button}>
                            Back
                          </Button>
                        )}
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                        </Button>
                      </div>
                    </form>
                  </>
                }
                {/* Step for reviewing order details before placing it */}
                {activeStep === 2 &&
                  <>
                    <Typography variant="h6" gutterBottom>
                      Order summary
                    </Typography>
                    <List disablePadding>
                      {orderItems.map((item) => (
                        <ListItem className={classes.listItem} key={item.title}>
                          <ListItemText primary={item.title}  />
                          <Typography variant="body2">{item.quantity} x {item.price} {item.currency}</Typography>
                        </ListItem>
                      ))}
                      <ListItem className={classes.listItem}>
                        <ListItemText primary="Shipping cost" />
                        <Typography variant="body2">
                          Free Shipping because you're awesome!
                        </Typography>
                      </ListItem>
                    </List>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom className={classes.title}>
                          Shipping
                        </Typography>
                        <Typography gutterBottom>{address.firstName} {address.lastName}</Typography>
                        <Typography gutterBottom>{address.address}</Typography>
                      </Grid>
                      <Grid item container direction="column" xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom className={classes.title}>
                          Payment details
                        </Typography>
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography gutterBottom>{payment.cardName}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography gutterBottom>xxxx xxxx xxxx {payment.cardNumber.slice(-4)}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <div className={classes.buttons}>
                      {activeStep !== 0 && (
                        <Button onClick={handleBack} className={classes.button}>
                          Back
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePlaceOrder}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                      </Button>
                    </div>
                  </>
                }
                {/* Placing order loader */}
                {activeStep === steps.length && loading &&
                  <>
                    <Grid container justify="center">
                      <CircularProgress />
                    </Grid>
                  </>
                }
                {/* Order failure */}
                {activeStep === steps.length && !loading && !isOrderSuccess &&
                <>
                  <Grid container justify="center">
                    Sorry something went wrong, please try again...
                  </Grid>
                </>
                }
              </>
            )}
          </>
        </Paper>
      </div>
    </>
  );
}