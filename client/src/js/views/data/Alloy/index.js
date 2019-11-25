import React from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import sprintf from 'sprintf-js';
import {
    ALLOY_URL,
    CREATE_ALLOY_URL,
    UPDATE_ALLOY_URL,
    DELETE_ALLOY_URL
} from '../../../../constants/ApiConstants';

export default class Alloy extends React.Component {
    constructor() {
        super();
        this.state = {
            columns: [
                { title: 'Name', field: 'name', headerStyle: {width: '20%',  textAlign:'center'}, cellStyle: {width: '20%',  textAlign:'center'} },
                { title: 'Extrudability', field: 'extru', headerStyle: {width: '30%', textAlign:'center'}, cellStyle: {width: '20%',  textAlign:'center'} },
                { title: 'Length', field: 'length', type: 'numeric', headerStyle: {width: '30%', textAlign:'center'}, cellStyle: {width: '20%',  textAlign:'center'} },
                { title: 'Rho', field: 'Rho', headerStyle: {width: '20%', textAlign:'center'}, cellStyle: {width: '20%',  textAlign:'center'}},
              ],
            data: []        
        }
    };

    componentWillMount() {
        axios.get(ALLOY_URL)
            .then(res => {
                const data = res.data;
                if (data) {
                    if (data.success) {
                        this.setState({data: data.data.alloys})
                    }
                }
        })  
    };

    render() {
        return (
            <div className="animated fadeIn">
                <MaterialTable
                    title="ALLOY TABLE"
                    columns={this.state.columns}
                    data={this.state.data}
                    editable={{
                        onRowAdd: newData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                resolve();
                                axios.post(CREATE_ALLOY_URL, newData)
                                .then(res => {
                                    const dat = res.data;
                                    if (dat) {
                                        if (dat.success) {
                                            console.log('success');
                                            this.setState(prevState => {
                                                const data = [...prevState.data];
                                                data.push(newData);
                                                return { ...prevState, data };
                                            });
                                        } else {
                                            console.log('failure');
                                        }
                                    }
                                })
                            }, 600);
                        }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    
                                    axios.put(sprintf.vsprintf(UPDATE_ALLOY_URL, [oldData.name]), newData)
                                    .then(res => {
                                        const dat = res.data;
                                        if (dat) {
                                            if (dat.success) {
                                                console.log('success');
                                                this.setState(prevState => {
                                                    const data = [...prevState.data];
                                                    data[data.indexOf(oldData)] = newData;
                                                    return { ...prevState, data };
                                                });
                                            } else {
                                                console.log('failure');
                                            }
                                        }
                                    })
                                }
                            }, 600);
                        }),
                        onRowDelete: oldData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                resolve();
                                this.setState(prevState => {
                                    const data = [...prevState.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    return { ...prevState, data };
                                });
                                
                                axios.delete(sprintf.vsprintf(DELETE_ALLOY_URL, [oldData.name]))
                                .then(res => {
                                    const dat = res.data;
                                    if (dat) {
                                        if (dat.success) {
                                            console.log('success');
                                        } else {
                                            console.log('failure');
                                        }
                                    }
                                })
                            }, 600);
                        }),
                    }}
                />
            </div>
        );
    }
}