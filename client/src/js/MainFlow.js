import React from 'react';

import {
    Button, Form,
    FormGroup, Label,
    Input, InputGroup, InputGroupAddon,
    Col,
    Card, CardBody, CardHeader
} from 'reactstrap';

export default class MainFlow extends React.Component {
    render() {
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
                                  <option>flat</option>
                                  <option>hollow</option>
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
