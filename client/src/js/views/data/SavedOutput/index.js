import React from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import sprintf from 'sprintf-js';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import {
    OUTPUT_URL, 
    OUTPUT_DATE_URL
} from '../../../../constants/ApiConstants';

export default class SavedOutput extends React.Component {
    constructor() {
        super();
        this.state = {
            columns: [
                { title: 'Press', field: 'press'},
                { title: 'Profilgewicht', field: 'profile_weight', type: 'numeric', headerStyle: {width: '20%',  textAlign:'center'}, cellStyle: {width: '20%',  textAlign:'center'}  },
                { title: 'Strangzahl', field: 'number_cavity', type: 'numeric' },
                { title: 'Kundenlänge', field: 'profile_length', type: 'numeric' },
                { title: 'Bolzenlänge', field: 'billet_length', type: 'numeric' },
                { title: 'Pressrest', field: 'buttend_length', type: 'numeric' },
                { title: 'Schrotte', field: 'scrap_length', type: 'numeric' },
                { title: 'Anzahl K-Länge', field: 'num_costumer_length', type: 'numeric' },
                { title: 'Ausziehlänge', field: 'extrusion_length', type: 'numeric' },
                { title: 'PullerSpeed', field: 'puller_speed', type: 'numeric' },
                { title: 'Brutto kg/h', field: 'gros_productivity', type: 'numeric' },
                { title: 'Netto kg/h', field: 'net_productivity', type: 'numeric' },
                { title: 'Recovery', field: 'recovery', type: 'numeric' },
                { title: 'Stangenrest Recovery', field: 'logend_recovery', type: 'numeric' },
                { title: 'Bereichkosten', field: 'area_cost', type: 'numeric' },
                { title: 'Werkskosten', field: 'plant_cost', type: 'numeric' },
                { title: 'BU SGA', field: 'bu_sga', type: 'numeric' },
                { title: 'Verpackung', field: 'packing_cost', type: 'numeric' },
                { title: 'Fracht', field: 'freight_cost', type: 'numeric' },
                { title: 'Werkzeugkosten', field: 'die_cost', type: 'numeric' },
                { title: 'Recovery Loss', field: 'recovery_loss', type: 'numeric' },
                { title: 'VP ExtMargin', field: 'extrusion_margin', type: 'numeric' },
                { title: 'Saved Date', field: 'timestamp' }
            ],
            data: [],   
            date_list: [],
            selected_date: ''     
        }
    };

    componentWillMount() {
        axios.get(OUTPUT_DATE_URL)
            .then(res => {
                const data = res.data;
                if (data) {
                    if (data.success) {
                        this.setState({date_list: data.data.outputs})
                        console.log(data.data.outputs);
                    }
                }
        })  
    };

    render() {
        const date_options = []
        for (const [index, value] of this.state.date_list.entries()) {
            date_options.push(<option value={index} key={index}>{value._id}</option>)
        }
        return (
            <div>
                <Row>
                    <Col xs="12" md="6">
                        <Card>
                        <CardHeader>
                            <strong>Basic Form</strong> Elements
                        </CardHeader>
                        <CardBody>
                            <FormGroup row>
                                <Col md="12">
                                    <Label htmlFor="select">Select Date</Label>
                                    <Input type="select" name="select" id="select" onChange={e => this.setState({selected_date: e.target.value})}>
                                        <option value="0">Please select</option>
                                        {date_options}
                                    </Input>
                                </Col>
                            </FormGroup>
                        </CardBody>
                        <CardFooter>
                            <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Show</Button>
                        </CardFooter>
                        </Card>
                    </Col>
                </Row>
                <MaterialTable
                    title="SAVED OUTPUT TABLE"
                    columns={this.state.columns}
                    data={this.state.data}        
                    options={{
                        filtering: true
                    }}
                />
            </div>
        );
    }
}