import React, {useEffect, useState} from "react"
import * as XLSX from 'xlsx';
import { ReactGrid  } from "@silevis/reactgrid";
import Button from 'react-bootstrap/Button';
import ReactGridExample from "./ReactGrid";
import SyncfusionGrid from "./SyncfusoinGrid";
import DevExtremeGridExample from "./DevExtremeGrid";
import AGGridExample from "./AGGrid";

  
const getColumns = data => {
if (data.length === 0) {
    return []
}
return Object.keys(data[0]).map((key, idx) => {
    return { columnId: "header", width: 150}
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

function Home(){
    const [data, setData] = useState([]);
    const [reactGrid, setReactGrid] = useState(false)
    const [syncfusionGrid, setSyncfusionGrid] = useState(false)
    const [devExtremeGrid, setDevExtremeGrid] = useState(false)
    const [agGrid, setAGGrid] = useState(false)
    
    const headerRow = {
      rowId: "header",
      cells: headers(data)
    }

    const rows = getRows(data, headerRow)
    const columns = getColumns(data)
    
    useEffect( () => {
       function fetchData(){
        fetch('http://127.0.0.1:5000/api')
        .then(response => response.json())
        .then(data => setData(data));
       }
        //  fetchData();
    }, []);

    
    const handleFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, {type: 'binary'});
            workbook.SheetNames.forEach(sheet => {
                const rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                const jsonObject = (rowObject);
                // console.log(jsonObject);
                setData(jsonObject);
                localStorage.setItem("data", JSON.stringify(jsonObject))
          
                            });
        };
        reader.readAsBinaryString(file);
    }
    

    return (
        <>
            <input className="my-3" type="file" accept="xlsx" onChange={e => handleFile(e)}  name="file" />
            
            <div className="my-3">
                <Button variant="primary" onClick={()=>setReactGrid(!reactGrid)}>React-Grid</Button>{' '}
                <Button variant="secondary" onClick={()=>setSyncfusionGrid(!syncfusionGrid)}>Syncfusion-React-Grid</Button>{' '}
                <Button variant="success" onClick={()=>setDevExtremeGrid(!devExtremeGrid)}>DevExtreme-Data-Grid</Button>{' '}
                <Button variant="warning" onClick={()=>setAGGrid(!agGrid)}>AG-Grid</Button>{' '}
            </div>
            <div className="my-3">
                {reactGrid?<ReactGridExample data={data}/>:null}
                {syncfusionGrid?<SyncfusionGrid data={data} />:null}
                {devExtremeGrid?<DevExtremeGridExample data={data} />:null}
                {agGrid?<AGGridExample data={data} />:null}
            </div>
        </>
    )
}

export default Home;