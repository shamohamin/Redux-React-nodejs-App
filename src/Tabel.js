import React from 'react' ;
import { withStyles, makeStyles } from '@material-ui/core/styles' ;
import Table from '@material-ui/core/Table' ;
import TableBody from '@material-ui/core/TableBody' ;
import TableCell from '@material-ui/core/TableCell' ;
import TableHead from '@material-ui/core/TableHead' ;
import TableRow from '@material-ui/core/TableRow' ;
import Paper from '@material-ui/core/Paper' ;
import {connect} from 'react-redux' ;

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(first_name, last_name, age, gender, phone_number) {
  return { first_name, last_name, age, gender, phone_number };
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}));

function totalUser(data){
    let count = 0;
    data.map(i => count++)
    return count;
}

export const CustomizedTables = ({data}) => {
    
    const classes = useStyles();
    
    const row = data.map(item => {
        return createData(item.first_name,item.last_name,item.age,item.gender,item.phone_number)
    })

  return (
    <Paper className={classes.root} >
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {/* <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{ 'aria-label': 'select all desserts' }}
            /> */}
            <StyledTableCell align="right">First_name</StyledTableCell>
            <StyledTableCell align="right">Last_name</StyledTableCell>
            <StyledTableCell align="right">Age</StyledTableCell>
            <StyledTableCell align="right">Gender&nbsp;(male,female)</StyledTableCell>
            <StyledTableCell align="right">Phone_number</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map(rows => (
            <StyledTableRow key={rows.name}>
              <StyledTableCell align="right" component="th" scope="row">
                {rows.first_name}
              </StyledTableCell>
              <StyledTableCell align="right">{rows.last_name}</StyledTableCell>
              <StyledTableCell align="right">{rows.age}</StyledTableCell>
              <StyledTableCell align="right">{rows.gender}</StyledTableCell>
              <StyledTableCell align="right">{rows.phone_number}</StyledTableCell>
            </StyledTableRow>
          ))}
            <TableRow>
                <StyledTableCell rowSpan={3}/>
                <StyledTableCell colSpan={2}>Total User</StyledTableCell>
                <StyledTableCell align="right">{totalUser(data)} </StyledTableCell>
            </TableRow> 
        </TableBody>
      </Table>
    </Paper>
  );
}

const mapStateToProps = state => ({
    data : state.data
})

export default connect(mapStateToProps)(CustomizedTables);