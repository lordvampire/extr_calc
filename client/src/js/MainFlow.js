import React from 'react';
import {
    Button, Form,
    FormGroup, Label,
    Input, InputGroup, InputGroupAddon,
    Col,
    Card, CardBody, CardHeader
} from 'reactstrap';

import {
    get_profile_types,
    get_alloys,
    get_complexities,
    get_surfaces
} from '../util/ApiUtils'
import axios from 'axios'

const propTypes = {

}

export default class MainFlow extends React.Component {
    constructor() {
        super();
        this.state = {
            profile_types: [],
            alloys: [],
            surfaces: [],
            complexities: []
        }
        // this.onGotoNextStep = this.onGotoNextStep(this);
    }

    componentDidMount() {
        // const data = get_profile_types();
        
        // console.log('2222', data)
        // if (data != undefined) {
        //     if (data.data.success) {
        //         this.setState({profile_types: data.data.types});
        //     }
        // }

        axios.get('http://localhost:5000/calculator/v1/profile_types')
            .then(res => {
                const data = res.data;
                console.log(data)
                this.setState({profile_types: data.data.types});
            })
        
        // this.setState({alloys: get_alloys()});
        // this.setState({surfaces: get_surfaces()});
        // this.setState({complexities: get_complexities()});
    }

    render() {
        if (this.state.profile_types.length == 0)
            return <div>Loading...</div>;

        const profile_type_options = []
        const alloy_options = []
        const surface_options = []
        const complexity_options = []

        for (const [index, value] of this.state.profile_types.entries()) {
            profile_type_options.push(<option value={index}>{value.type_name}</option>)
        }
        return (
          <Col md="6">
              <Card className="main-card mb-3">
                  <CardHeader>
                      <i className="header-icon lnr-license icon-gradient bg-plum-plate"> </i>
                      Profile
                  </CardHeader>
                  <CardBody>
                      <Form>
                          <FormGroup>
                              <Label for="customer">Kunde</Label>
                              <Input name="customer" id="customer" 
                                      placeholder="Kunde"/>
                          </FormGroup>
                          <FormGroup>
                              <Label for="profile_weight">Profilgewicht</Label>
                              <InputGroup>
                                <Input name="profile_weight" id="profile_weight" 
                                        placeholder="Profilgewicht"/>
                                <InputGroupAddon addonType="append">[kg/m](0....10^6)</InputGroupAddon>
                              </InputGroup>
                          </FormGroup>
                          <FormGroup>
                              <Label for="profile_type">Select</Label>
                              <Input type="select" name="select" id="profile_type">
                                  {profile_type_options}
                              </Input>
                          </FormGroup>
                          <FormGroup>
                              <Label for="profile_complexity">WS min</Label>
                              <Input type="select" name="select" id="profile_complexity">
                                  <option>1</option>
                                  <option>2</option>
                              </Input>
                          </FormGroup>
                          <FormGroup>
                              <Label for="profile_width">Profilbreite</Label>
                              <InputGroup>
                                <Input name="profile_width" id="profile_width" 
                                        placeholder="Profilbreite"/>
                                <InputGroupAddon addonType="append">[mm] (0....10^6)</InputGroupAddon>
                              </InputGroup>
                          </FormGroup>
                          <FormGroup>
                              <Label for="profile_width">Profilhöhe</Label>
                              <InputGroup>
                                <Input name="profile_height" id="profile_height" 
                                        placeholder="Profilhöhe"/>
                                <InputGroupAddon addonType="append">[mm] (0....10^6)</InputGroupAddon>
                              </InputGroup>
                          </FormGroup>
                          <FormGroup>
                              <Label for="alloy">Legierung</Label>
                              <Input type="select" name="select" id="alloy">
                                  <option>1</option>
                                  <option>2</option>
                              </Input>
                          </FormGroup>
                          <FormGroup>
                              <Label for="profile_surface">Oberfläche</Label>
                              <Input type="select" name="select" id="profile_surface">
                                  <option>1</option>
                                  <option>2</option>
                              </Input>
                          </FormGroup>
                          <FormGroup>
                              <Label for="profile_length">Kundenlänge</Label>
                              <InputGroup>
                                <Input name="profile_length" id="profile_length" 
                                        placeholder="Kundenlänge"/>
                                <InputGroupAddon addonType="append">[mm] (0....10^6)</InputGroupAddon>
                              </InputGroup>
                          </FormGroup>
                          <FormGroup>
                              <Label for="profile_usage">Anwendung</Label>
                              <InputGroup>
                                <Input name="profile_usage" id="profile_usage" 
                                        placeholder="Anwendung"/>
                                <InputGroupAddon addonType="append">[mm] (0....10^6)</InputGroupAddon>
                              </InputGroup>
                          </FormGroup>
                          <Button color="primary" className="mt-1">Next Step</Button>
                      </Form>
                  </CardBody>
              </Card>
          </Col>
        );
    }
}
