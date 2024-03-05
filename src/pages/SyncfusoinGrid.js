import { ColumnDirective, ColumnsDirective, Edit, GridComponent } from '@syncfusion/ej2-react-grids';
import { AggregateColumnDirective, Inject, Aggregate } from '@syncfusion/ej2-react-grids';
import { AggregateColumnsDirective, AggregateDirective, AggregatesDirective } from '@syncfusion/ej2-react-grids';
import * as React from 'react';

const getColumns = data => {
    if (data.length === 0) {
        return []
    }
    // console.log(Object.keys(data[0]))
    return Object.keys(data[0])
    }

function SyncfusionGrid({data}) {

    const [colHeaders, setColHeaders] = React.useState([]) 
    const footerSum = (props) => {
        return (<span>Sum: {props.Sum}</span>);
      };
    const footerMax = (props) => {
        return (<span>Max: {props.Max}</span>);
      };

      // const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true };

      React.useEffect(()=>{
        // console.log(getColumns(data))
        setColHeaders(getColumns(data))
        
      },[data])

    return (
        <>
            <div className='p-5'>
            <h5>Syncfusion Data Grid</h5>
                { colHeaders.length>0 && 
                 <GridComponent dataSource={data} allowPaging={true} >
                    <ColumnsDirective>

                        {
                          
                        colHeaders.map((element, idx) => (
                            
                             <ColumnDirective field={element} headerText={element} key={idx}/>
                        ))}
                        {/* <ColumnDirective field='Ind' headerText='Ind'/>
                        <ColumnDirective field='Col1' headerText='Col1' />
                        <ColumnDirective field='Col2' headerText='Col2' />
                        <ColumnDirective field='Col3' headerText='Col3' /> */}
                    </ColumnsDirective>
                    <AggregatesDirective>
      <AggregateDirective>
        <AggregateColumnsDirective>
          <AggregateColumnDirective field='Col1' type='Sum' footerTemplate={footerSum} />
          <AggregateColumnDirective field='Col2' type='Sum' footerTemplate={footerSum} />
        </AggregateColumnsDirective>
      </AggregateDirective>
      <AggregateDirective>
        <AggregateColumnsDirective>
          <AggregateColumnDirective field='Col1' type='Max' footerTemplate={footerMax} />
          <AggregateColumnDirective field='Col2' type='Max' footerTemplate={footerMax} />
        </AggregateColumnsDirective>
      </AggregateDirective>
    </AggregatesDirective>
    <Inject services={[Aggregate]} />
                </GridComponent>}
            </div>
        </>
    )
};
export default SyncfusionGrid;