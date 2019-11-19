import React from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import sprintf from 'sprintf-js';
import {
    COMPLEXITY_URL,
    CREATE_COMPLEXITY_URL,
    UPDATE_COMPLEXITY_URL,
    DELETE_COMPLEXITY_URL
} from '../../../../constants/ApiConstants';

export default class Complexity extends React.Component {
    constructor() {
        super();
        this.state = {
            columns: [
                { title: 'Name', field: 'name' },
                { title: 'Extrudability', field: 'extru' }
              ],
            data: []        
        }
    };

    componentWillMount() {
        axios.get(COMPLEXITY_URL)
            .then(res => {
                const data = res.data;
                if (data) {
                    if (data.success) {
                        this.setState({data: data.data.complexities})
                    }
                }
        })  
    };

    render() {
        return (
            <MaterialTable
                title="COMPLEXITY TABLE"
                columns={this.state.columns}
                data={this.state.data}
                editable={{
                    onRowAdd: newData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                            resolve();
                            this.setState(prevState => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });

                            axios.post(CREATE_COMPLEXITY_URL, newData)
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
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                            resolve();
                            if (oldData) {
                                this.setState(prevState => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                                
                                axios.put(sprintf.vsprintf(UPDATE_COMPLEXITY_URL, [oldData.name]), newData)
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
                            
                            axios.delete(sprintf.vsprintf(DELETE_COMPLEXITY_URL, [oldData.name]))
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
        );
    }
}