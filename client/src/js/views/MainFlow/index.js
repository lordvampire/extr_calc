import React, {Fragment} from 'react';
import ResultComponent from './ResultComponent'
import {
    Alert,
    Button, Form,
    FormGroup, Label,
    Input, InputGroup, InputGroupAddon,
    Col, Row,
    Card, CardBody, CardHeader
} from 'reactstrap';

import {
    PROFILE_TYPE_URL,
    ALLOY_URL,
    SURFACE_URL,
    COMPLEXITY_URL,
    PRESS_URL
} from '../../../constants/ApiConstants'
import axios from 'axios'

const initialState = {
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
    },
    errors: {
        profile_width: '',
        profile_height: '',
        profile_weight: '',
        profile_length: '',
        profile_usage: ''
    },
    show_result: false
};

export default class MainFlow extends React.Component {
    constructor() {
        super();
        this.state = initialState;
        this.all_press = []
        this.gotoNextStep = this.gotoNextStep.bind(this);
        this.clearProfile = this.clearProfile.bind(this);
    };
    
    get_options_data() {    
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

        axios.get(PRESS_URL)
            .then(res => {
                const data = res.data;
                if (data) {
                    if (data.success) {
                        this.all_press = data.data.press_data;
                        console.log(this.all_press)
                    }
                }
            })
    };

        
    componentWillMount() {
        this.get_options_data();
    };

    gotoNextStep() {
        let profile = this.state.current_state;
        console.log("alloy", this.state.alloys)
        console.log("surfaces", this.state.surfaces)
        console.log("complexity", this.state.complexities)
        console.log(this.state.alloys)
        let result = []

        if (this.all_press.length != 0) {
            
            for (const [index, press] of this.all_press.entries()) {
                let sub_result = {};
                let number_of_cavity = 0;
                let ratio_extrusion_min = 0;
                let ratio_extrusion_max = 0;

                let weight_billet1m = Math.pow(press.billet_dia, 2) * PI / 4 * this.state.alloys.Rho;
                let weight_billet1m_compressed = Math.pow(press.container_dia, 2) * Math.PI / 4 * this.state.alloys.Rho;
                let axdisatance = press.container_dia * 0.1;
                let usable_dia = press.container_dia * press.value_spreading / 100;
                let cimcumscribing_profile = Math.sqrt(Math.pow(profile.cur_width, 2) + Math.pow(profile.cur_height, 2));
                let extratio_profile = weight_billet1m / profile.cur_weight;
                let max_height_2cav = Math.sqrt(pow((press.console/2), 2) - pow((profile.cur_height/2), 2)) - axdisatance;
                let max_height_4cav = Math.sqrt(pow((usable_dia/2), 2) - pow((profile.cur_height+axdisatance), 2)) - axdisatance;
                let max_cs_6cav = usable_dia / 3;
                let max_cs_8cav = Math.sin(Math.PI / 4);

                if (press.max_profile_width > profile.cur_width) number_of_cavity = 0;
                else if ((cimcumscribing_profile < (max_cs_8cav - axdisatance)) && 
                        (ratio_extrusion_min < (extratio_profile/8)) && 
                        ((extratio_profile/8) < ratio_extrusion_max))
                    number_of_cavity = 8;
                else if ((cimcumscribing_profile < (max_cs_6cav - axdisatance)) && 
                        (ratio_extrusion_min < (extratio_profile/6)) && 
                        ((extratio_profile/6) < ratio_extrusion_max)) 
                    number_of_cavity = 6;
                else if (profile.cur_width < max_height_4cav || 
                        (cimcumscribing_profile < (usable_dia/2-axdisatance) && 
                        (ratio_extrusion_min < (extratio_profile/4)) &&
                        ((extratio_profile/4) < ratio_extrusion_max)))
                    number_of_cavity = 4;
                else if (profile.cur_width < max_height_2cav || 
                        (cimcumscribing_profile < (usable_dia/2-axdisatance/2) && 
                        (ratio_extrusion_min < (extratio_profile/2)) &&
                        ((extratio_profile/2) < ratio_extrusion_max)))
                    number_of_cavity = 2;
                else if ((cimcumscribing_profile < usable_dia) &&
                        (ratio_extrusion_min < extratio_profile) &&
                        (extratio_profile < ratio_extrusion_max))
                    number_of_cavity = 1;
                else
                    number_of_cavity = 0;

                sub_result.number_of_cavity = 0

                // extruction Speed Auto
                let ramspeed = press.ram_speed_max * this.state.alloys.extru * this.state.surfaces.extru * this.state.complexities.extru;

                //scrap length Auto
                let length_scrap = 0;
                let length_buttend = 0;

                // Billet length
                let volume_rate_container_billet = Math.pow(press.container_dia, 2) / Math.pow(press.billet_dia, 2);
                let ratio_extruction = weight_billet1m / profile.cur_weight / number_of_cavity;
                let max_producable_length = ((press.container_length/volume_rate_container_billet)-length_buttend) / ratio_extruction;
                let max_producable_costlen = (max_producable_length - length_scrap) / profile.length;
                let max_producable_cl_table = (length_cooltable - length_scrap) / profile.length;
                let number_costumer_length = Math.min(max_producable_cl_table, max_producable_costlen)
                let weight_number_cslength = number_costumer_length * (profile.cur_length/1000) * profile.cur_weight;
                let weight_buttend = length_buttend * weight_billet1m_compressed / 1000;
                let weight_billetlength = weight_number_cslength + weight_buttend;
                let length_billet = weight_billetlength / weight_billet1m * 1000;
                let length_billet_compressed = length_billet / volume_rate_container_billet;

                // productivity
                let time_extrusion_billet = length_billet_compressed / ramspeed;
                let time_process = time_extrusion_billet + press.dead_cycle;
                let net_productivity = weight_number_cslength / time_process * 3600;
                let gros_productivity = weight_billetlength / time_process * 3600;

            }

        }        
    };

    clearProfile() {
        this.setState({...initialState});
        this.get_options_data();
    };

    render() {
        const {errors} = this.state;
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

        
        const handleChange = (event) => {
            event.preventDefault();
            const { name, value } = event.target;
            let errors = this.state.errors;
            
            const validRegex = RegExp(/^\d*\.?(?:\d{1,20})?$/);
            switch (name) {
                case 'profile_weight': 
                    errors.profile_weight = 
                    !validRegex.test(value)
                        ? 'input value is invalid. Must be NUMBER!'
                        : '';
                    break;
                case 'profile_width': 
                    errors.profile_width = 
                    !validRegex.test(value)
                        ? 'input value is invalid. Must be NUMBER!'
                        : '';
                    break;
                case 'profile_length': 
                    errors.profile_length = 
                    !validRegex.test(value)
                        ? 'input value is invalid. Must be NUMBER!'
                        : '';
                    break;
                case 'profile_height': 
                    errors.profile_height = 
                    !validRegex.test(value)
                        ? 'input value is invalid. Must be NUMBER!'
                        : '';
                    break;
                case 'profile_usage': 
                    errors.profile_usage = 
                    !validRegex.test(value)
                        ? 'input value is invalid. Must be NUMBER!'
                        : '';
                    break;
                default:
                    break;
            }

            this.setState({errors, [name]: value});
        };

        return (
            <Row>
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
                                            placeholder="Kunde" onChange={e => this.setState({cur_customer: update_state('cur_customer', e)})} noValidate/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="profile_weight">Profilgewicht</Label>
                                    <InputGroup>
                                        <Input name="profile_weight" id="profile_weight" 
                                                placeholder="Profilgewicht" onChange={e => { handleChange(e); this.setState({cur_weight: update_state('cur_weight', e)})}} noValidate/>
                                        <InputGroupAddon addonType="append">[kg/m](0....10^6)</InputGroupAddon>
                                    </InputGroup>
                                    {errors.profile_weight.length > 0 && 
                                    <Alert color='danger'>{errors.profile_weight}</Alert>}
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
                                                placeholder="Profilbreite" onChange={e => { handleChange(e); this.setState({cur_width: update_state('cur_width', e)})}}/>
                                        <InputGroupAddon addonType="append">[mm] (0....10^6)</InputGroupAddon>
                                    </InputGroup>
                                    {errors.profile_width.length > 0 && 
                                    <Alert color='danger'>{errors.profile_width}</Alert>}
                                </FormGroup>
                                <FormGroup>
                                    <Label for="profile_width">Profilhöhe</Label>
                                    <InputGroup>
                                        <Input name="profile_height" id="profile_height" 
                                                placeholder="Profilhöhe" onChange={e => { handleChange(e); this.setState({cur_height: update_state('cur_height', e)})}}/>
                                        <InputGroupAddon addonType="append">[mm] (0....10^6)</InputGroupAddon>
                                    </InputGroup>
                                    {errors.profile_height.length > 0 && 
                                    <Alert color='danger'>{errors.profile_height}</Alert>}
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
                                                placeholder="Kundenlänge" onChange={e => { handleChange(e); this.setState({cur_length: update_state('cur_length', e)})}}/>
                                        <InputGroupAddon addonType="append">[mm] (0....10^6)</InputGroupAddon>
                                    </InputGroup>
                                    {errors.profile_length.length > 0 && 
                                    <Alert color='danger'>{errors.profile_length}</Alert>}
                                </FormGroup>
                                <FormGroup>
                                    <Label for="profile_usage">Anwendung</Label>
                                    <InputGroup>
                                        <Input name="profile_usage" id="profile_usage" 
                                                placeholder="Anwendung" onChange={e => { handleChange(e); this.setState({cur_usage: update_state('cur_usage', e)})}}/>
                                        <InputGroupAddon addonType="append">[mm] (0....10^6)</InputGroupAddon>
                                    </InputGroup>
                                    {errors.profile_usage.length > 0 && 
                                    <Alert color='danger'>{errors.profile_usage}</Alert>}
                                </FormGroup>
                                <Button color="info" className="mr-2 mb-2" onClick={this.clearProfile}>Clear</Button>
                                <Button color="primary" className="mr-2 mb-2" onClick={this.gotoNextStep}>Next Step</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="6">
                {
                    this.state.show_result?
                        <Fragment>
                            <ResultComponent />
                        </Fragment>
                    : null
                }
                </Col>
            </Row>
        );
    }
}
