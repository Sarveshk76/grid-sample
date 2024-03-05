import React from "react"
// import {Button} from "react-bootstrap"
import DataGrid, {
    Column,
    FilterRow,
    Grouping,
    GroupPanel,
    LoadPanel,
    Pager,
    Paging,
    Toolbar,
    Item,
    RequiredRule,
    Editing,
    Summary,
    TotalItem
  } from 'devextreme-react/data-grid';
  import Button from 'devextreme-react/button';


function DevExtremeGridExample({data}){
    var localData =  JSON.parse(localStorage.getItem("data"))
    const [storedData, setStoredData] = React.useState(localData?(localData):[]);
    
    React.useEffect(()=>{
        if (storedData.length===0){
            setStoredData(data)
        console.log(`stored data: ${storedData}`)
        }
        
    },[data, storedData])
    
    return (
        <div className='p-5' id="dataGrid">
            <h5>DevExtreme Data Grid</h5>

            <DataGrid
            dataSource={storedData}
            keyExpr={'Ind'}
            showBorders={true}
            allowColumnReordering={true}
            repaintChangesOnly
            
            >
                <LoadPanel enabled={true} />
                {/* <GroupPanel visible={true} />
                <Grouping autoExpandAll={true} />
                <FilterRow visible={true} />
                <Selection mode={'multiple'} /> */}
            
                <Column
                dataField={'Ind'}
                >
                </Column>
                <Column dataField={'Col1'}><RequiredRule /></Column>
                <Column dataField={'Col2'} sortOrder={'asc'} />
                <Column dataField={'Col3'} visible={false} />
                <Editing
                    // mode="row"
                    // mode="popup"
                    mode="batch"
                    allowUpdating={true}
                    allowDeleting={true}
                    allowAdding={true}
                    
                />
                <Summary>
                <TotalItem
                    column="Col1"
                    summaryType="sum"
                    displayFormat="Column1: {0}" 
                />
                <TotalItem
                    column="Col2"
                    summaryType="sum"
                    displayFormat="Column2: {0}" 
                />
                <TotalItem
                    column="Col3"
                    summaryType="sum"
                    displayFormat="Column3: {0}" 
                />
                </Summary>
                {/* <Toolbar>
                    <Item location="before">
                        <Button
                        text="delCol"
                        />
                    </Item>
                </Toolbar> */}
               
                <Pager allowedPageSizes={[5, 10, 20]} showPageSizeSelector={true} />
                <Paging defaultPageSize={10} />
            </DataGrid>
            
        </div>
    )
}
export default DevExtremeGridExample