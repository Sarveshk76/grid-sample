import React, {useEffect, useState} from "react"
import { AgGridReact } from 'ag-grid-react';
import { Button } from 'react-bootstrap';

const getColumns = data => {
    if (data.length === 0) {
        return []
    }
    return Object.keys(data[0]).map((key, idx) => {
            return { field: key.toString(), aggFunc: 'sum'}
        
    })
    }
       
function AGGridExample({data}){
    
    const [rowData, setRowData] = useState([])
    const [colDefs, setColDefs] = useState([])
    const [rowNum, setRowNum] = useState([])
    const isRowSelectable = React.useCallback((node) => node.data.value > rowData, [rowData]);

    const defaultColDef = React.useMemo(() => {
        return {
          flex: 1,
          minWidth: 150,
          editable: true,
        };
      }, []);

      function onCellValueChanged(event) {
        // console.log('Data after change is', (event));
        fetch('http://localhost:5000/update_delete_data/', {
            method: 'PUT',
            body: JSON.stringify(event.data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
              }
        },)
      }

      function onRowSelected(event){
        // console.log(event.data)
        setRowNum(event.data['__rowNum__'])
        
      }

      function deleteRow(){
        
        fetch('http://localhost:5000/update_delete_data/', {
            method: 'DELETE',
            body: JSON.stringify({'rowNum': rowNum}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
              }
        },)
      }
    
    const gridOptions = {
        overlayLoadingTemplate:
    '<div aria-live="polite" aria-atomic="true" style="position:absolute;top:0;left:0;right:0; bottom:0; background: url(https://ag-grid.com/images/ag-grid-loading-spinner.svg) center no-repeat" aria-label="loading"></div>',
        overlayNoRowsTemplate:
    '<span aria-live="polite" aria-atomic="true" style="padding: 10px; border: 2px solid #666; background: #55AA77;">This is a custom \'no rows\' overlay</span>',
    }

    useEffect(()=>{
        setRowData(data)
        setRowData(row => [...row, ...[{}]])
        setColDefs(getColumns(data))
        if(data.length !== 0){
            setColDefs(col =>[...col,...[{ field: 'Total', enableValue: true, editable: false, valueGetter: (params) => params.data.Col1 + params.data.Col2 + params.data.Col3 }]])
        }
    },[data, rowNum])

    return (
        <>
        <h5>AG Grid</h5>
        <div className="ag-theme-quartz p-5">
            <div className="p-2">
                <Button variant="outline-primary">Add Record</Button>
                <Button variant="outline-danger" onClick={deleteRow}>Delete Record</Button>
            </div>
            <AgGridReact rowData={rowData} columnDefs={colDefs}
                domLayout='autoHeight' isRowMaster={isRowSelectable} 
                defaultColDef={ defaultColDef }
                gridOptions={ gridOptions }
                overlayNoRowsTemplate='<span aria-live="polite" aria-atomic="true" style="padding: 10px; border: 2px solid #666; background: #55AA77;">This is a custom no rows overlay</span>'
                overlayLoadingTemplate='<div aria-live="polite" aria-atomic="true" style="position:absolute;top:0;left:0;right:0; bottom:0; background: url(https://ag-grid.com/images/ag-grid-loading-spinner.svg) center no-repeat" aria-label="loading"></div>'
                onCellValueChanged={onCellValueChanged}
                rowSelection="single"
                onRowSelected={onRowSelected}
                />
        </div>
        </>
    )
}
export default AGGridExample