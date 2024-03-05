import { ColumnDirective, ColumnsDirective, Edit, GridComponent } from '@syncfusion/ej2-react-grids';
import { Inject, Toolbar, PageEventArgs } from '@syncfusion/ej2-react-grids';
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data';
import * as React from 'react';

const getColumns = data => {
    if (data.length === 0) {
        return []
    }
    // console.log(data[0])
    return Object.keys(data[0])
    }



function SyncfusionWebAPIServiceExample() {

    const [colHeaders, setColHeaders] = React.useState([])
    const [dataSource, setDataSource] = React.useState([]) 
    
      const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true };
      const toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
      var dataManager = React.useRef();
      
      React.useEffect(()=>{ 
        dataManager.current = new DataManager({
            adaptor: new WebApiAdaptor(),
            url: 'http://localhost:5000/get_post_data',
            insertUrl: 'http://localhost:5000/get_post_data',
            removeUrl:'http://localhost:5000/update_delete_data',
            updateUrl: 'http://localhost:5000/update_delete_data',
        }).executeQuery(new Query()).then((e) => e.result).then(
            data=>{
                setDataSource(data)
        })
    },[])

    
    React.useEffect(()=>{
        if (!dataSource) return 
        setColHeaders(getColumns(dataSource))
    },[dataSource])

    const actionBegin = (args) => {
        alert(args.requestType);
      }

    const beginEdit = (args) =>{
        console.log(args.requestType)
    }

    const dataStateChange = (args) => {
        console.log(args.data)
    }

    
    return (
        <>
            <div className='p-5'>
            <h5>Syncfusion Data Grid</h5>

            { colHeaders.length>0 && 
                 <GridComponent dataSource={dataSource} editSettings={editOptions} toolbar={toolbarOptions} allowPaging={true}  dataStateChange={dataStateChange}>
                    <ColumnsDirective>
                        {
                          
                        colHeaders.map((element, idx) => (
                             <ColumnDirective field={element} headerText={element} key={idx}/>
                        ))}
                    </ColumnsDirective>
                   
                    <Inject services={[Edit, Toolbar]} />
                </GridComponent>}
            </div>
        </>
    )
};
export default SyncfusionWebAPIServiceExample;