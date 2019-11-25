import React from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import sprintf from 'sprintf-js';
import {
    PRESS_URL,
    CREATE_PRESS_URL,
    UPDATE_PRESS_URL,
    DELETE_PRESS_URL
} from '../../../../constants/ApiConstants';

export default class PressData extends React.Component {
    constructor() {
        super();
        this.state = {
            columns: [
                { title: 'Name', field: 'name', headerStyle: {width: '20%',  textAlign:'center'}, cellStyle: {width: '20%',  textAlign:'center'}  },
                { title: 'Inch', field: 'inch', type: 'numeric', headerStyle: {width: '20%',  textAlign:'center'}, cellStyle: {width: '20%',  textAlign:'center'}  },
                { title: 'BilletDiameter', field: 'billet_dia', type: 'numeric', headerStyle: {width: '20%',  textAlign:'center'}, cellStyle: {width: '20%',  textAlign:'center'}  },
                { title: 'ContainerDiameter', field: 'container_dia', type: 'numeric', headerStyle: {width: '20%',  textAlign:'center'}, cellStyle: {width: '20%',  textAlign:'center'}  },
                { title: 'Billet Lenght max', field: 'billet_length_max', type: 'numeric', headerStyle: {width: '20%',  textAlign:'center'}, cellStyle: {width: '20%',  textAlign:'center'}  },
                { title: 'Table Lenght max', field: 'table_length_max', type: 'numeric', headerStyle: {width: '20%',  textAlign:'center'}, cellStyle: {width: '20%',  textAlign:'center'}  },
                { title: 'Ram speed max', field: 'ram_speed_max', type: 'numeric', headerStyle: {width: '20%',  textAlign:'center'}, cellStyle: {width: '20%',  textAlign:'center'}  },
                { title: 'max Profilbreite', field: 'max_profile_width', type: 'numeric', headerStyle: {width: '20%',  textAlign:'center'}, cellStyle: {width: '20%',  textAlign:'center'}  },
                { title: 'BilletSprung', field: 'billet_sprung', type: 'numeric', headerStyle: {width: '20%',  textAlign:'center'}, cellStyle: {width: '20%',  textAlign:'center'}  },
                { title: 'Speed IST', field: 'speedIST', type: 'numeric', headerStyle: {width: '20%',  textAlign:'center'}, cellStyle: {width: '20%',  textAlign:'center'}  },
                { title: 'DeadCycle', field: 'dead_cycle', type: 'numeric', headerStyle: {width: '20%',  textAlign:'center'}, cellStyle: {width: '20%',  textAlign:'center'}  },
                { title: 'Max Puller', field: 'max_puller', type: 'numeric', headerStyle: {width: '20%',  textAlign:'center'}, cellStyle: {width: '20%',  textAlign:'center'}  },
                { title: 'Max Strangzahl', field: 'max_strangzahl', type: 'numeric', headerStyle: {width: '20%',  textAlign:'center'}, cellStyle: {width: '20%',  textAlign:'center'}  },
                { title: 'Rampenverlust', field: 'rampernverlust', type: 'numeric', headerStyle: {width: '20%',  textAlign:'center'}, cellStyle: {width: '20%',  textAlign:'center'}  },
                {
                  title: 'Log/Billet',
                  field: 'log_billet',
                  lookup: { 'log': 'Log', 'billet': 'Billet' },
                },
                { title: 'Value Spreading', field: 'value_spreading', type: 'numeric' },
                { title: 'Min Ratio Extrusion', field: 'ratio_extrusion_min', type: 'numeric'},
                { title: 'Max Ratio Extrusion', field: 'ratio_extrusion_max', type: 'numeric'}
              ],
            data: []        
        }
    };

    componentWillMount() {
        axios.get(PRESS_URL)
            .then(res => {
                const data = res.data;
                if (data) {
                    if (data.success) {
                        console.log(data.data.press_data)
                        this.setState({data: data.data.press_data})
                    }
                }
        })  
    };

    render() {
        return (
            <MaterialTable
                title="PRESSDATA TABLE"
                columns={this.state.columns}
                data={this.state.data}
                editable={{
                    onRowAdd: newData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                            resolve();
                            axios.post(CREATE_PRESS_URL, newData)
                            .then(res => {
                                const dat = res.data;
                                if (dat) {
                                    if (dat.success) {
                                        console.log('success');
                                        this.setState(prevState => {
                                            const data = [...prevState.data];
                                            data.push(newData);
                                            console.log(data)
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
                                
                                axios.put(sprintf.vsprintf(UPDATE_PRESS_URL, [oldData.name]), newData)
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
                            
                            axios.delete(sprintf.vsprintf(DELETE_PRESS_URL, [oldData.name]))
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