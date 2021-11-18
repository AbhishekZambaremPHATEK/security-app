import { Grid, Card } from "@mui/material";
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
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import AssessmentIcon from '@mui/icons-material/Assessment';
import AndroidOutlinedIcon from '@mui/icons-material/AndroidOutlined';
import ScannerIcon from '@mui/icons-material/Scanner';
import { Navigate, useNavigate } from 'react-router-dom';
import clsx from "clsx";
import React from "react";
import "./ScanManagement.css";



function EnhancedTableHead(props) {
    const { onSelectAllClick, numSelected, rowCount, headCells } = props;

    return (
        <TableHead >
            <TableRow id={"tablecell"} className={"tableHeader"}>

                {headCells.map((headCell) => (
                    <TableCell
                        // key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? "none" : "default"}
                        width={headCell.width}
                        style={{ minWidth: headCell.width }}
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
    const selectedDoc = props.selected;
    console.log("selected Doc : ", selectedDoc);
    const deleteRow = (deleteRows) => {
        console.log("in delete row : ", deleteRows);
        props.deleteRow(selectedDoc);
    }
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

export default function TableView(props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [selected, setSelected] = React.useState([]);
    const history = useNavigate();  
    let headCells = props.columns;
    let title = props.title;
    let selectedRowIndex = null;
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    const deleteRow = (selectedDoc) => {
        console.log("in delete row : ", selectedDoc);
        props.deleteRow(selectedDoc);
    }
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = props.rows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name, id, index) => {
        const selectedIndex = selected.indexOf(id);
        selectedRowIndex = selectedIndex;
        console.log("selected index : ", selectedRowIndex, " id :", id);
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
        props.handleClick(event, index, id);
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        // console.log(newPage)
        props.ChangeCurrentPage(newPage+1);
        // props.pageNumber()
    };

    const handleChangeRowsPerPage = (event) => {
        props.ChangeRowsPerPage(parseInt(event.target.value));
        // props.ChangeCurrentPage(0);
    };

    const onAndroidButtonClick = (id,team_id) => {

        // var getId = e.currentTarget.id.split("_")[1];

        props.redirectScan(id,team_id)

    }

    const onReportButtonClick = (id) => {
console.log("app_id",id);
        // var getId = e.currentTarget.id.split("_")[1];
localStorage.setItem("app_id",id);
        // props.reportScan(getId)
        history(`/report`);

    }

    
    

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.rows.length - page * rowsPerPage);

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
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
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
                                            onClick={(event) => handleClick(event, row.name, row.id, index)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >


                                            <TableCell className={"tableRowPadding"}
                                                component="th"
                                                align="center"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.teamname}
                                            </TableCell>
                                            <TableCell className={"tableRowPadding"}
                                                component="th"
                                                align="center"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.applicationname}
                                            </TableCell>
                                            <TableCell className={"tableRowPadding"}
                                                component="th"
                                                align="center"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.scan_types ? row.scan_types.map((type,index)=> { 
                                                    if(row.scan_types.length==index+1){ return type.toUpperCase() }else{  return type.toUpperCase()+"," } 
                                                }): ''}
                                            </TableCell>
                                            <TableCell className={"tableRowPadding"}
                                                component="th"
                                                align="center"
                                                scope="row"
                                                padding="none"
                                            >
                                                { row.date_of_scan == "No Data Available" ? row.date_of_scan : new Date(row.date_of_scan).toLocaleString()}
                                            </TableCell>

                                            <TableCell className={"tableRowPadding"}
                                                component="th"
                                                align="center"
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.next_scheduled_date == "No Data Available" ? row.next_scheduled_date :new Date(row.next_scheduled_date).toLocaleString()}
                                            </TableCell>

                                            <TableCell className={"tableRowPadding"}
                                                component="th"
                                                align="center"
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.status}
                                            </TableCell>

                                            <TableCell className={"tableRowPadding"}
                                                component="th"
                                                align="center"
                                                scope="row"
                                                padding="none"
                                            >

                                                <Grid item xs={6} style={{ display: "inline-block" }} align="cenete">
                                                    <IconButton   onClick={() => onReportButtonClick(row.id)}>
                                                        <AssessmentIcon />
                                                    </IconButton>

                                                </Grid>
                                                <Grid item xs={6} style={{ display: "inline-block" }} align="cenete">
                                                    <IconButton onClick={() => onAndroidButtonClick(row.id,row.team_id)}>
                                                        <ScannerIcon />
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
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={props.show}
                rowsPerPage={props.numberOfrows}
                page={props.currentPage-1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Card>
        </div>
    );
}
