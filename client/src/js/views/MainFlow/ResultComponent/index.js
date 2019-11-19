import React from 'react';


import {
    Button, Form,
    FormGroup, Label,
    Input, InputGroup, InputGroupAddon,
    Col,
    Card, CardBody, CardHeader
} from 'reactstrap';

import {
    PROFILE_TYPE_URL,
    ALLOY_URL,
    SURFACE_URL,
    COMPLEXITY_URL
} from '../../../../constants/ApiConstants'
import axios from 'axios'

export default class ResultComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            profile_types: [],
            alloys: [],
            surfaces: [],
            complexities: [],
            current_state: {
                cur_customer: '',
                cur_weight: '',
                cur_type: '0',
                cur_ws: '0',
                cur_width: '',
                cur_height: '',
                cur_alloy: '0',
                cur_surface: '0',
                cur_length: '',
                cur_usage: ''
            }
        }
        this.gotoNextStep = this.gotoNextStep.bind(this);
    }

    componentWillMount() {    
        axios.get(PROFILE_TYPE_URL)
            .then(res => {
                const data = res.data;
                if (data) {
                    if (data.success) {
                        this.setState({profile_types: data.data.types})
                    }
                }
        })  
        axios.get(ALLOY_URL)
            .then(res => {
                const data = res.data;
                if (data) {
                    if (data.success) {
                        this.setState({alloys: data.data.alloys})
                    }
                }
        })  
        axios.get(SURFACE_URL)
            .then(res => {
                const data = res.data;
                if (data) {
                    if (data.success) {
                        this.setState({surfaces: data.data.surfaces})
                    }
                }
        })  
        axios.get(COMPLEXITY_URL)
            .then(res => {
                const data = res.data;
                if (data) {
                    if (data.success) {
                        this.setState({complexities: data.data.complexities})
                    }
                }
        })
    }

    gotoNextStep() {
        console.log(this.state.current_state)
    }

    render() {
        if (this.state.profile_types.length == 0)
            return <div>Loading...</div>;

        const profile_type_options = []
        const alloy_options = []
        const surface_options = []
        const complexity_options = []

        for (const [index, value] of this.state.profile_types.entries()) {
            profile_type_options.push(<option value={index} key={index}>{value.type_name}</option>)
        }
    
        for (const [index, value] of this.state.alloys.entries()) {
            alloy_options.push(<option value={index} key={index}>{value.name}</option>)
        }
    
        for (const [index, value] of this.state.surfaces.entries()) {
            surface_options.push(<option value={index} key={index}>{value.name}</option>)
        }
        for (const [index, value] of this.state.complexities.entries()) {
            complexity_options.push(<option value={index} key={index}>{value.name}</option>)
        }

        const update_state = (nestedIndex, e) => {
            const { current_state } = { ...this.state };
            const currentState = current_state;
            const { name, value } = e.target;
            currentState[nestedIndex] = value;

            return currentState;
        };

        const required = (value) => {
            if (!value.toString().trim().length) {
                // We can return string or jsx as the 'error' prop for the validated Component
                return 'require';
            }
        };
        
        const check_number = (value) => {
            const re = /^[0-9\b]+$/;

            // if value is not blank, then test the regex

            if (value === '' || re.test(value)) {
                return 'only number';
            }
        };

        return (
          <Col>
              <Card className="main-card mb-3">
                  <CardHeader>
                      <i className="header-icon lnr-license icon-gradient bg-plum-plate"> </i>
                      Output
                  </CardHeader>
                  <CardBody>
                      <Form>
                          <FormGroup>
                              <Label for="customer">Kunde</Label>
                              <Input name="customer" id="customer" 
                                      placeholder="Kunde" onChange={e => this.setState({cur_customer: update_state('cur_customer', e)})}/>
                          </FormGroup>
                          <FormGroup>
                              <Label for="profile_weight">Profilgewicht</Label>
                              <InputGroup>
                                <Input name="profile_weight" id="profile_weight" 
                                        placeholder="Profilgewicht" onChange={e => this.setState({cur_weight: update_state('cur_weight', e)})}/>
                                <InputGroupAddon addonType="append">[kg/m](0....10^6)</InputGroupAddon>
                              </InputGroup>
                          </FormGroup>
                          <FormGroup>
                              <Label for="profile_type">Profiltyp</Label>
                              <Input type="select" name="select" id="profile_type" onChange={e => this.setState({cur_type: update_state('cur_type', e)})}>
                                  {profile_type_options}
                              </Input>
                          </FormGroup>
                          <FormGroup>
                              <Label for="profile_complexity">WS min</Label>
                              <Input type="select" name="select" id="profile_complexity" onChange={e => this.setState({cur_ws: update_state('cur_ws', e)})}>
                                  {complexity_options}
                              </Input>
                          </FormGroup>
                          <FormGroup>
                              <Label for="profile_width">Profilbreite</Label>
                              <InputGroup>
                                <Input name="profile_width" id="profile_width" 
                                        placeholder="Profilbreite" onChange={e => this.setState({cur_width: update_state('cur_width', e)})}/>
                                <InputGroupAddon addonType="append">[mm] (0....10^6)</InputGroupAddon>
                              </InputGroup>
                          </FormGroup>
                          <FormGroup>
                              <Label for="profile_width">Profilhöhe</Label>
                              <InputGroup>
                                <Input name="profile_height" id="profile_height" 
                                        placeholder="Profilhöhe" onChange={e => this.setState({cur_height: update_state('cur_height', e)})}/>
                                <InputGroupAddon addonType="append">[mm] (0....10^6)</InputGroupAddon>
                              </InputGroup>
                          </FormGroup>
                          <FormGroup>
                              <Label for="alloy">Legierung</Label>
                              <Input type="select" name="select" id="alloy" onChange={e => this.setState({cur_alloy: update_state('cur_alloy', e)})}>
                                  {alloy_options}
                              </Input>
                          </FormGroup>
                          <FormGroup>
                              <Label for="profile_surface">Oberfläche</Label>
                              <Input type="select" name="select" id="profile_surface" onChange={e => this.setState({cur_surface: update_state('cur_surface', e)})}>
                                  {surface_options}
                              </Input>
                          </FormGroup>
                          <FormGroup>
                              <Label for="profile_length">Kundenlänge</Label>
                              <InputGroup>
                                <Input name="profile_length" id="profile_length" 
                                        placeholder="Kundenlänge" onChange={e => this.setState({cur_length: update_state('cur_length', e)})}/>
                                <InputGroupAddon addonType="append">[mm] (0....10^6)</InputGroupAddon>
                              </InputGroup>
                          </FormGroup>
                          <FormGroup>
                              <Label for="profile_usage">Anwendung</Label>
                              <InputGroup>
                                <Input name="profile_usage" id="profile_usage" 
                                        placeholder="Anwendung" onChange={e => this.setState({cur_usage: update_state('cur_usage', e)})}/>
                                <InputGroupAddon addonType="append">[mm] (0....10^6)</InputGroupAddon>
                              </InputGroup>
                          </FormGroup>
                          <Button color="primary" className="mt-1" onClick={this.gotoNextStep}>Next Step</Button>
                      </Form>
                  </CardBody>
              </Card>
          </Col>
        );
    }
}
