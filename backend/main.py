from flask import Flask, make_response, request
from flask_cors import CORS, cross_origin
import pandas as pd
import json

app = Flask(__name__)
cors = CORS(app, origins=['http://localhost:3000'], 
            supports_credentials=True, 
            methods=["GET", "POST", "PUT", "DELETE","OPTIONS"])
app.config['CORS_HEADERS'] = 'Content-Type'
app.json.sort_keys = False


@app.after_request
def add_header(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response

@app.route('/get_post_data/', methods=['GET','POST','OPTIONS'])
@cross_origin(supports_credentials=True)
def excel_data_api():
    if request.method == 'GET':
        df = pd.read_excel("data.xlsx")
        df = list(df.to_dict('index').values())
        return make_response(df, 200)
    
    if request.method == 'POST':
        # df = pd.read_excel("data.xlsx")
        # data_dict = json.loads(request.form)
        # data_dict['Ind'] = df.shape[0]+1
        # new_df = pd.DataFrame([data_dict])
        # df = pd.concat([df, new_df], )
        # df.to_excel('data.xlsx', index=False)
        # print(f"Data Inserted!!")

        
        return make_response("Data Posted")

@app.route('/update_delete_data/', methods=['PUT', 'DELETE', 'OPTIONS'])
@cross_origin(supports_credentials=True)
def excel_data_update_api():
    if request.method == 'PUT':
        # key = request.form.get("key")
        # value = request.form.get("values")
        # v = json.loads(value)
        # df = pd.read_excel("data.xlsx")
        # df[list(v.keys())[0]].iloc[int(key)-1] = v[list(v.keys())[0]]
        # df.to_excel('data.xlsx', index=False)
        # print(f"Key:{key}, Value:{value}")

        #for AG-Grid
        print(json.loads(request.data.decode('utf-8')))
        return make_response(f"Data Updated")
    
    if request.method == 'DELETE':
        # key = request.form.get("key")
        # df = pd.read_excel("data.xlsx")
        # df = df.drop(int(key)-1)
        # df.to_excel('data.xlsx', index=False)
        # print(f"Key: {key}")

        print(json.loads(request.data.decode('utf-8')))
        return make_response(f"Data Deleted")

