import { Grid, Typography, Card } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import { alpha } from '@mui/material/styles';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import clsx from "clsx";
import {  setUserInfo } from '../../Redux-Action';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import "./TeamView.css";
//import "./manageSpace.css";


function EnhancedTableHead(props) {
    const { onSelectAllClick, numSelected, rowCount, headCells } = props;

    return (
        <TableHead >
            <TableRow id={"tablecell"}  className ={"tableHeader"}>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ "aria-label": "select all desserts" }}
                        color="primary"
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                    style ={{fontSize: 25}}
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? "none" : "default"}
                        width={headCell.width}
                        style={{ minWidth: headCell.width , fontSize: 16}}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1)
    },
    highlight:
        theme.palette.type === "light"
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: alpha(theme.palette.secondary.light, 0.85)
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark
            },
    title: {
        flex: "1 1 100%"
    }
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;
    const title = props.title;
    // const [checkSelectedTeams, setcheckSelectedTeams] = React.useState([]);
    const selectedDoc = props.selected;


    return (

        <Toolbar id={"toolbar"}
            className={" row " + clsx(classes.root, {
                [classes.highlight]: numSelected > 0
            })}
        >


        </Toolbar>
    );
};
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%"
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2)
    },
    table: {
        width: "100%"
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1
    }
}));

function TableView(props) {
    const classes = useStyles();
    const history = useNavigate();
    // const [order, setOrder] = React.useState("asc");
    // const [orderBy, setOrderBy] = React.useState("calories");
    const [openModel1, setModelOpen1] = useState(false);
    const [selected, setSelected] = React.useState([]);
    let headCells = props.columns;
    // if(props.getTeamData !== null){
    //      rows =  props.getTeamData;
    // }
    let title = props.title;
    let selectedRowIndex = null;
    // const handleRequestSort = (event, property) => {
    //     const isAsc = orderBy === property && order === "asc";
    //     setOrder(isAsc ? "desc" : "asc");
    //     setOrderBy(property);
    // };
    const deleteRow = (selectedDoc) => {
        console.log("in delete row : ", selectedDoc);
        props.deleteRow(selectedDoc);
    }
    const handleSelectAllClick = (event) => {
        for (var i = 0; i < props.rows.length; i++) {

            document.getElementById("action_" + props.rows[i].id).style.display = "none"
            document.getElementById("actiondel_" + props.rows[i].id).style.display = "none"
            document.getElementById("actionDis_" + props.rows[i].id).style.display = "table-cell"
            document.getElementById("actionDisdel_" + props.rows[i].id).style.display = "table-cell"


        }
        if (event.target.checked) {
            const newSelecteds = props.rows.map((n) => n.id);
            setSelected(newSelecteds);
            // console.log(selected);
            props.checkSelectedTeams(newSelecteds);

            return;
        } else {
            const newSelecteds = [];
            props.checkSelectedTeams(newSelecteds);
        }
        setSelected([]);
    };

    const handleClick = (event, name, id, index, rowId, disRowId, teamDelID, desteamDelID) => {
        // console.log(selected);
        if (selected.length === 0) {


            if (event.target.checked === true) {

                document.getElementById(rowId).style.display = "table-cell"
                document.getElementById(teamDelID).style.display = "table-cell"
                document.getElementById(disRowId).style.display = "none"
                document.getElementById(desteamDelID).style.display = "none"
            } else {
                document.getElementById(rowId).style.display = "none"
                document.getElementById(teamDelID).style.display = "none"
                document.getElementById(disRowId).style.display = "table-cell"
                document.getElementById(desteamDelID).style.display = "table-cell"
            }
        } else {
            for (var i = 0; i < props.rows.length; i++) {
                document.getElementById("action_" + props.rows[i].id).style.display = "none"
                document.getElementById("actiondel_" + props.rows[i].id).style.display = "none"
                document.getElementById("actionDis_" + props.rows[i].id).style.display = "table-cell"
                document.getElementById("actionDisdel_" + props.rows[i].id).style.display = "table-cell"
            }
        }
        const selectedIndex = selected.indexOf(id);
        selectedRowIndex = selectedIndex;
        // console.log("selected index : ", selectedRowIndex, " id :", id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        console.log("selected : ", newSelected);
        if (newSelected.length === 1) {
            document.getElementById("action_" + newSelected[0]).style.display = "table-cell"
            document.getElementById("actiondel_" + newSelected[0]).style.display = "table-cell"
            document.getElementById("actionDis_" + newSelected[0]).style.display = "none"
            document.getElementById("actionDisdel_" + newSelected[0]).style.display = "none"

        }
        props.handleClick(event, newSelected, id);
        setSelected(newSelected);
        props.checkSelectedTeams(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        // setPage(newPage);
          props.ChangeCurrentPage(newPage+1);
        //   props.ChangeRowsPerPage(newPage+1);
    };
    const onCellClickDeleteTeam = (e) => {
        var getId = e.currentTarget.id.split("_")[1];
        let deleteTeamsSel = [];
        deleteTeamsSel.push(Number(getId));
        if (getId !== null) {
            props.singleTeamDelete(Number(getId));

        }
    }

    const onCellClick = (id) => {
        localStorage.setItem('viewApplicationListTid', id);
        history("/viewApplication");
    }

    const onCellClickEditTeam = (e) => {

        var getId = e.currentTarget.id.split("_")[1];

        props.editTeam(getId)

    }


    const handleChangeRowsPerPage = (event) => {
        // setRowsPerPage(parseInt(event.target.value, 10));
        // setPage(0);
        props.ChangeRowsPerPage(parseInt(event.target.value));
        //  props.ChangeCurrentPage(1);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // const emptyRows =rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    console.log(props.getTeamData);
    return (
        <div className={classes.root}>
            <Card className={classes.paper}>
            <EnhancedTableToolbar
                deleteRow={(rowForDelete) => { deleteRow(rowForDelete) }}
                numSelected={selected.length}
                title={title} selected={selected} />
            <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size="small"
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        // order={order}
                        // orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        //  onRequestSort={handleRequestSort}
                        rowCount={props.rows.length}
                        headCells={headCells}
                        title={title}
                    />
                    <TableBody>
                        {
                            // stableSort(rows, getComparator(order, orderBy))
                            props.rows
                                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    onClick={(event) => handleClick(event, row.name, row.id, index, "action_" + row.id, "actionDis_" + row.id, "actiondel_" + row.id, "actionDisdel_" + row.id)}
                                                    inputProps={{ "aria-labelledby": labelId }}
                                                    color="primary"
                                                />
                                            </TableCell>
                                            <TableCell align="left"
                                                color="blue"
                                                padding="none">
                                                {row.teamname}
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                align="left"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                                title="View Application List" 
                                            >
                                                
                                                <IconButton id={"" + row.id} onClick={() => onCellClick(row.id)}
                                                        className="checkApplication"
                                                        title="View Application List" >
                                                        {row.applications}
                                                    </IconButton>
                                                
                                            </TableCell>
                                            <TableCell xs={12} data-tag={"" + row.id} align="left"  >
                                                <Grid item xs={6} style={{ display: "inline-block" }} align="cenete">
                                                    <IconButton id={"action_" + row.id} onClick={onCellClickEditTeam}
                                                        className="createApp"
                                                        title="Edit Team" style={{ display: "none" }} color="primary">
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton id={"actionDis_" + row.id} onClick={onCellClickEditTeam}
                                                        disabled title="Edit Team" style={{ display: "block" }} color="primary">
                                                        <EditIcon />
                                                    </IconButton>
                                                </Grid>
                                                <Grid item xs={6} style={{ display: "inline-block" }} align="cenete">
                                                    <IconButton id={"actiondel_" + row.id} onClick={onCellClickDeleteTeam}
                                                        className="createApp"
                                                        title="Delete Team" style={{ display: "none" }} color="secondary">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <IconButton id={"actionDisdel_" + row.id} onClick={onCellClickDeleteTeam}
                                                        disabled title="Delete Team" style={{ display: "block" }} color="secondary">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Grid>




                                            </TableCell>

                                        </TableRow>
                                    );
                                })
                        }
                        {/* {emptyRows > 0 && (
                            <TableRow style={{ height: 33 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )} */}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                rowsPerPageOptions={[5, 10, 25]}
                count={props.show}
                page={props.currentPage-1}
                onPageChange={handleChangePage}
                rowsPerPage={props.numberOfrows}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {/* <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
            </Card>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        getUserData: state.getUserData,
        getTeamData:state.getTeamData,
    }
}

const mapDispatchToProps = () => {
    return {
        setUserInfo,
    }

}

export default connect(mapStateToProps, mapDispatchToProps())(TableView);