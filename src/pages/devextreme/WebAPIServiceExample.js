  import React from 'react';
  import {Column, DataGrid, Editing, Export } from 'devextreme-react/data-grid';
  import 'devextreme/data/odata/store';
  import { createStore } from 'devextreme-aspnet-data-nojquery';

  const getPostUrl = 'http://localhost:5000/get_post_data';
  const updateDeleteUrl = 'http://localhost:5000/update_delete_data';
  
  const dataSource = createStore({
    key: 'Ind',
    loadUrl: `${getPostUrl}`,
    insertUrl: `${getPostUrl}`,
    updateUrl: `${updateDeleteUrl}`,
    deleteUrl: `${updateDeleteUrl}`,
    onBeforeSend: (method, ajaxOptions) => {
      ajaxOptions.xhrFields = { withCredentials: true };
    },
  });
  
  
  function DevExtremeWebAPIServiceExample(){
    
    return (
        <>
        <div className='p-5'>
          <h5>DevExtreme Web API</h5>
        <DataGrid
          dataSource={dataSource}
          showBorders={true}
          width="100%"
          remoteOperations={true}
          allowColumnReordering={true}
          repaintChangesOnly
          >

          <Editing
            mode="row"
            allowAdding={true}
            allowDeleting={true}
            allowUpdating={true}
          />

          <Column dataField="Ind" allowEditing={false}>
          </Column>

          <Column dataField="Col1" >
          </Column>

          <Column dataField="Col2">
          </Column>

          <Column dataField="Col3">
          </Column>

    
        </DataGrid>
        </div>
        </>
    )
  }

  export default DevExtremeWebAPIServiceExample;
  