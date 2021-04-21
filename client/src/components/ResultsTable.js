import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'; 
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { format } from 'date-fns';

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
})

function ResultsTable({ breaches }) {
  const classes = useStyles();
  const [filteredList, setFilteredList] = useState(breaches)

  const filterList = (e) => {
    let filtered = breaches.filter(result => result.Name.toLowerCase().includes(e.target.value))
    setFilteredList(filtered)
  }

  return (
    <>
    <TextField 
      label="Search"
      onChange={filterList}
      fullWidth
    />
    <TableContainer>
      <Table className={classes.table} aria-label="results table">
      <TableHead>
        <TableRow>     
          <TableCell>Name</TableCell>
          <TableCell>Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {filteredList.map((breach, index) => {
      const { Name, BreachDate } = breach
      return (
        <TableRow key={index}>
          <TableCell component="th" scope="row">
            {Name}
          </TableCell>
          <TableCell component="th" scope="row">
            {format(new Date(BreachDate), 'MM/dd/yyyy')}
          </TableCell>
        </TableRow>
      )
      })}
      </TableBody>
    </Table>
    </TableContainer>
    </>
  )
}

export default ResultsTable