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
import AndroidOutlinedIcon from '@mui/icons-material/AndroidOutlined';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import jsPDF from "jspdf";
import clsx from "clsx";
import React from "react";
import "./Report.css";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

function EnhancedTableHead(props) {
    const { onSelectAllClick, numSelected, rowCount, headCells } = props;

    return (
        <TableHead >
            <TableRow id={"tablecell"} className={"tableHeader"}>

                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
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
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [open, setOpen] = React.useState([]);
    // let open=[];

    let headCells = props.columns;
    let rows = props.rows;
    let title = props.title;
    let selectedRowIndex = null;

    const [value, setValue] = React.useState(0);
    function ForceUpdate(){
        // integer state
        setValue(value => value + 1); // update the state to force render
    }

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
            const newSelecteds = rows.map((n) => n.id);
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
        // setPage(newPage);
        setOpen([])
        props.ChangeCurrentPage(newPage+1)
    };

    const handleChangeRowsPerPage = (event) => {
        props.ChangeRowsPerPage(parseInt(event.target.value));
    };

    function msToTime(duration) {
        var milliseconds = Math.floor((duration % 1000) / 100),
          seconds = Math.floor((duration / 1000) % 60),
          minutes = Math.floor((duration / (1000 * 60)) % 60),
          hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
      
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
      
        return hours + ":" + minutes + ":" + seconds;
      }

    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
      }

    const datediff=(start,end)=>{
        const date1 = new Date(start);
const date2 = new Date(end);
const diffTime = Math.abs(date2 - date1);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
console.log(diffTime + " milliseconds");
console.log(diffDays + " days");

return msToTime(diffTime);
    }
    const onAndroidButtonClick = (e) => {

        var getId = e.currentTarget.id.split("_")[1];

        props.redirectScan(getId)

    }
    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    const exportPDF = (rowData) => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Job Report";
        
        // const headers = [["Team Name", "Application Name", "Scan start date", "Scan end date", "Scan done by", "Time taken", "Scan type", "Scan result"]];
    
        //,,,,,,]];
    
        // let content = {
        //   startY: 50,
        //   head: headers,
        //   body: data
        // };
    
        //  const headersnew = [{title: "Team Name"},{title:  "Application Name"},{title:  "Scan start date"}, {title: "Scan end date"},{title:  "Scan done by"},{title:  "Time taken"}, {title: "Scan type"},{title:  "Scan result"}];
        const headersnew= [{
            title: "",
            dataKey: 'details'
          },
          {
            title: "",
            dataKey: 'colan'
         }, 
         {
            title: "",
            dataKey: 'values'
         }]; 
        const filterdata={ 
             "Team Name":rowData.teamname!=""||null||undefined ? rowData.teamname :"No Data", 
             "Application Name":rowData.applicationname!=""||null||undefined ? rowData.applicationname :"No Data", 
             "Job Start Date":rowData.jobstartdate!=""||null||undefined ? rowData.jobstartdate :"No Data", 
             "Job End Date":rowData.jobenddate!=""||null||undefined ? rowData.jobenddate :"No Data", 
             "Scan Don By":rowData.username!=""||null||undefined ? rowData.username :"No Data", 
             "Time Taken":(rowData.jobenddate!=""||null||undefined) || (rowData.jobstartdate!=""||null||undefined)? datediff(rowData.jobenddate,rowData.jobstartdate) :"No Data", 
             "Scan Types":rowData.scan_types!=""||null||undefined ? rowData.scan_types :"No Data",
             "Job Result":rowData.jobresult!=""||null||undefined ? rowData.jobresult :"No Data"
        }

        const datanew = Object.keys(filterdata).map((key) => {  
            return { 'details': key, 'colan': ":",'values': filterdata[key] };
            // return [rowData[key] ];
          });
         const doc2 = new jsPDF().autoTable(headersnew,datanew, {
            drawHeaderRow: () => false,
            columnStyles: {
                // details: {fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold'}
                details: { fontStyle: 'bold'}

            }
          });
        //   doc2.save("test.pdf")


        const currentDate = new Date();
        const timestamp = currentDate.getTime();
    
        doc.text(title, marginLeft, 40);
        doc2.text(title, 15, 8);
        // doc.autoTable(content);
        
        let headers2=[],content2={},data2=[];
        Object.keys(rowData.report_dict).map(key => {
            // doc2.text(key, 15, 90);
            //   doc.autoTable(content2);
            
            
            //   doc2.autoTable({
            //     head: [[capitalizeFirstLetter(key)]]
            //   });

            doc2.autoTable([{
                title: '',
                dataKey: 'details'
              }],[{ 'details': capitalizeFirstLetter(key)}], {
                drawHeaderRow: () => false,
                columnStyles: {
                    details: {fillColor: [255, 255, 255], textColor: 0, fontStyle: 'bold'}
    
                }
              });

             headers2 = [["Name", "Description", "Reference", "Uri","Severity","Target Hostname"]];
             data2= rowData.report_dict[key].map((historyRow) => (
                [
                historyRow.name!=""||null||undefined ? historyRow.name :"No Data",
                historyRow.description!=""||null||undefined ? historyRow.description :"No Data",
                historyRow.reference!=""||null||undefined ? historyRow.reference :"No Data",
                historyRow.uri!=""||null||undefined ? historyRow.uri :"No Data",
                historyRow.severity!=""||null||undefined ? historyRow.severity :"No Data",
                historyRow.targethostname!=""||null||undefined ? historyRow.targethostname :"No Data",
                
                
                ]
              ))
               content2 = {
                // startY: 100,
                head: headers2,
                body: data2,
                columnStyles: {
                    0: {cellWidth: 25},
                    1: {cellWidth: 25},
                    3: {cellWidth: 25},
                    4: {cellWidth: 25},
                    5: {cellWidth: 25},
                    6: {cellWidth: 25},
                    // etc
                  }
              };
            //   doc.autoTable(content2);
              doc2.autoTable(content2);
        })

        // doc.save("RportPDF_" + timestamp+ ".pdf")
        doc2.save("RportPDF_" + timestamp+ ".pdf")
      }

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
 
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
                        rowCount={rows.length}
                        headCells={headCells}
                        title={title}
                    />
                    <TableBody>
                        {
                            // stableSort(rows, getComparator(order, orderBy))
                            rows
                                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    // copying the old datas array
                                    // newArr[index] = false;
                                    
                                    // open=newArr;
                                    return (
                                        <>
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.name, row.id, index)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >

<TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => {
            //   {setOpen(newArr)}
               let newArr = [...open]; // copying the old datas array
               open[index]==true ? newArr[index] = false: newArr[index] = true;
            //    open=newArr;
            //    ForceUpdate()
            setOpen(newArr)
               }}>
            {open[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
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
                                                {row.jobstartdate}
                                            </TableCell>
                                            <TableCell className={"tableRowPadding"}
                                                component="th"
                                                align="center"
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.jobenddate }
                                            </TableCell>
                                            <TableCell className={"tableRowPadding"}
                                                component="th"
                                                align="center"
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.username}
                                            </TableCell>
                                            
                                            <TableCell className={"tableRowPadding"}
                                                component="th"
                                                align="center"
                                                scope="row"
                                                padding="none"
                                            >
                                                {datediff(row.jobenddate,row.jobstartdate)}
                                            </TableCell>
                                            
                                            {/* <TableCell className={"tableRowPadding"}
                                                component="th"
                                                align="center"
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.TimeStamp}
                                            </TableCell> */}
                                            <TableCell className={"tableRowPadding"}
                                                component="th"
                                                align="center"
                                                scope="row"
                                                padding="none"
                                            >
                                               {row.scan_types}
                                            </TableCell>
                                            
                                            <TableCell className={"tableRowPadding"}
                                                component="th"
                                                align="center"
                                                scope="row"
                                                padding="none"
                                            >
                                               {row.jobresult} 
                                            </TableCell>
                                            
                                            <TableCell className={"tableRowPadding"}
                                                component="th"
                                                align="center"
                                                scope="row"
                                                padding="none"
                                            >
                                                    <Button
                                 onClick={() => exportPDF(row)}
                                variant="contained"
                                color="primary"
                                type="submit"

                            >
                                Download
                                     </Button>
                                            </TableCell>

                                        </TableRow>


<TableRow>
<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
  <Collapse in={open[index]} timeout="auto" unmountOnExit>
  {
  row.report_dict && Object.keys(row.report_dict).map(key => 
        // console.log("key",key,"value",value)
        <Box margin={1}>
            <Card>
        <Typography align="center" variant="h6" gutterBottom component="div">
            {key}
        </Typography>
        <Table size="small" aria-label="purchases">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Reference</TableCell>
              <TableCell align="right">URL</TableCell>
              <TableCell align="right">Severity</TableCell>
              <TableCell align="right">Target Hostname</TableCell>
              

            </TableRow>
          </TableHead>
          <TableBody>
            {row.report_dict[key].map((historyRow) => (
              <TableRow>
                <TableCell component="th" scope="row">
                  {historyRow.name!="" ?  historyRow.name:"No Data" }
                </TableCell>
                <TableCell>{historyRow.description!="" ?  historyRow.description:"No Data"}</TableCell>
                <TableCell align="right">{historyRow.reference!="" ?  historyRow.reference:"No Data"}</TableCell>
                <TableCell align="right">
                  {historyRow.uri!="" ?  historyRow.uri:"No Data"}
                </TableCell>
                

                <TableCell align="right">
                  {historyRow.severity!="" ?  historyRow.severity:"No Data"}
                </TableCell>
                <TableCell align="right">
                  {historyRow.targethostname!="" ?  historyRow.targethostname:"No Data"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </Card>
      </Box>
    // }
  )
  }
    {/* <Box margin={1}>
      <Typography variant="h6" gutterBottom component="div">
        Dict
      </Typography>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Reference</TableCell>
            <TableCell align="right">URL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.report_dict && row.report_dict.dast.map((historyRow) => (
            <TableRow>
              <TableCell component="th" scope="row">
                {historyRow.description}
              </TableCell>
              <TableCell>{historyRow.name}</TableCell>
              <TableCell align="right">{historyRow.reference}</TableCell>
              <TableCell align="right">
                {historyRow.uri}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box> */}
  </Collapse>
</TableCell>
</TableRow>
</>
                                    );
                                })
                        }
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 33 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
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
