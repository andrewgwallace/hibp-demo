import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ResultsTable from './components/ResultsTable';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Header from './components/Header';
import Error from './components/Error';
import * as EmailValidator from 'email-validator';

const useStyles = makeStyles({
  main: {
    padding: '15px',
  },
  email: {
    width: "500px",
    alignContent: 'center',
    fontSize: "48px",
  },
  button: {
    marginTop: '15px',
  }
});

function App() {
  const classes = useStyles();
  const [account, setAccount] = useState('');
  const [breachResults, setBreachResults] = useState();
  const [loading, setLoading] = useState(false);
  const [party, setParty] = useState(false);
  const [error, setError] = useState(false)
  
  useEffect(() => {
    return setBreachResults(null)
  }, [account])

  useEffect(() => {
    return setParty(false)
  },[account])

  useEffect(() => {
    return setError(false)
  }, [account])
  
  const getBreaches = async (e) => {
    e.preventDefault();
    setLoading(!loading);
    try {
      const response = await fetch(`/breaches/${account}`)
      const data = await response.json();
      setLoading(false);
      if (data.status === 401) {
        setError(true)
      }
      data.status === 404 ? setParty(true) && setError(data.status) : setBreachResults(data)
    } catch (err) {
      console.log('ERROR', err);
    }
  }

  const isEmail = (email) => {
    return EmailValidator.validate(email)
  }

  return (
    <Grid 
      container
      className={classes.main}
      direction="column"
      justify="center"
      alignItems="center"
    >
    <Grid item>
      <Header party={party} error={error} breachResults={breachResults} />
    </Grid>
    <form onSubmit={getBreaches}>
      <Grid item>
        <TextField
            type="email"
            label="Email"
            value={account} 
            onChange={e => setAccount(e.target.value)}
            required
            className={classes.email}
          />
      </Grid>
      <Grid item>
        <Button
          type="submit"
          value="submit"
          variant="contained" 
          color="primary" 
          onClick={getBreaches}
          className={classes.button}
          disabled={!isEmail(account)}
        >
        {(isEmail(account) ? "Let's Find Out!" : "I'm rootin' for ya!")}
        </Button>
      </Grid>
    </form>
      {error && <Grid item><Error /></Grid>}
      {breachResults?.length > 0 ? <Grid item><ResultsTable breaches={breachResults}/></Grid> : ''}
      {loading && <CircularProgress color="primary"/>}
    </Grid>
  )
}

export default App;
