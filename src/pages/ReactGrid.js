import React from "react"
import { ReactGrid  } from "@silevis/reactgrid";

const getColumns = data => {
    if (data.length === 0) {
        return []
    }
    return Object.keys(data[0]).map((key, idx) => {
        return { columnId: key.toString(), width: 150}
    })
    }

    const getRows = (data, headerRow) => [
    headerRow,
    ...data.map((data, idx) => ({
        rowId: idx,
        cells: [
        { type: "text", text: data.Ind.toString() },
        { type: "text", text: data.Col1.toString() },
        { type: "text", text: data.Col2.toString() },
        { type: "text", text: data.Col3.toString() }
        ]
    }))
    ]
    
    const headers = data => {
        if (data.length === 0) {
            return []
        }
        return Object.keys(data[0]).map((key, idx) => {
            return { type: "header", text: key }
        })
    }

function ReactGridExample({data}){
    const headerRow = {
        rowId: "header",
        cells: headers(data)
      }

    const rows = getRows(data, headerRow)
    const columns = getColumns(data)

    return(
        <div className="d-flex justify-content-center">
            <h5> React-Grid </h5>
            <ReactGrid rows={rows} columns={columns}  />
        </div>
    )
}
export default ReactGridExample