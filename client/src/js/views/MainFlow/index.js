import React, { Fragment } from "react";
import ResultComponent from "./ResultComponent";
import axios from "axios";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  Col,
  Row,
  Card,
  CardBody,
  CardHeader
} from "reactstrap";
import {
  PROFILE_TYPE_URL,
  ALLOY_URL,
  SURFACE_URL,
  COMPLEXITY_URL,
  PRESS_URL,
  USAGE_URL
} from "../../../constants/ApiConstants";

const initialState = {
  profile_types: [],
  alloys: [],
  surfaces: [],
  complexities: [],
  usages: [],
  checked_nbr_cavity: false,
  checked_speed_extru: false,
  checked_scrap_len: false,
  current_state: {
    cur_customer: "",
    cur_weight: "",
    cur_type: "0",
    cur_complexity: "0",
    cur_width: "",
    cur_height: "",
    cur_alloy: "0",
    cur_surface: "0",
    cur_length: "",
    cur_usage: "0",
    cur_nbr_cavity: "",
    cur_speed_extrusion: "",
    cur_scrap_length: ""
  },
  errors: {
    profile_width: "",
    profile_height: "",
    profile_weight: "",
    profile_length: "",
    profile_usage: "",
    nbr_cavity: "",
    speed_extrusion: "",
    scrap_len: ""
  },
  show_result: false,
  prev_state: {},
  result: null
};

export default class MainFlow extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    this.all_press = [];
    this.dies = {};
    this.gotoNextStep = this.gotoNextStep.bind(this);
    this.clearProfile = this.clearProfile.bind(this);
  }

  get_options_data() {
    axios.get(PROFILE_TYPE_URL).then(res => {
      const data = res.data;
      if (data) {
        if (data.success) {
          this.setState({ profile_types: data.data.types });
        }
      }
    });
    axios.get(ALLOY_URL).then(res => {
      const data = res.data;
      if (data) {
        if (data.success) {
          this.setState({ alloys: data.data.alloys });
        }
      }
    });
    axios.get(SURFACE_URL).then(res => {
      const data = res.data;
      if (data) {
        if (data.success) {
          this.setState({ surfaces: data.data.surfaces });
        }
      }
    });
    axios.get(COMPLEXITY_URL).then(res => {
      const data = res.data;
      if (data) {
        if (data.success) {
          this.setState({ complexities: data.data.complexities });
        }
      }
    });

    axios.get(USAGE_URL).then(res => {
      const data = res.data;
      if (data) {
        if (data.success) {
          this.setState({ usages: data.data.usages });
        }
      }
    });

    axios.get(PRESS_URL).then(res => {
      const data = res.data;
      if (data) {
        if (data.success) {
          this.all_press = data.data.press_data;
          console.log("press data", data.data.press_data)

          this.dies.dieTypeA_volume = Math.pow(this.all_press.die_typeA_dia, 2) * Math.PI / 4 * this.all_press.die_typeA_height / 1000;
          this.dies.weight = this.dies.dieTypeA_volume * 7.87 / 1000;
          this.dies.dieBaseprice = - Math.ln(this.dies.weight) * 2 + 14;
          this.dies.axdistance = 20;
          this.dies.upcharge_cavity = 5;

        }
      }
    });
  }

  componentDidMount() {
    this.get_options_data();
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.state.show_result) {
      if (JSON.stringify(nextState.current_state) != this.prev_state) {
        this.gotoNextStep();
        this.prev_state = JSON.stringify(nextState.current_state);
      }
    }
  }

  gotoNextStep() {
    let result = [];
    let ret_val = true;
    let profile = this.state.current_state;

    if (ret_val == true && this.all_press.length != 0) {
      for (const [index, press] of this.all_press.entries()) {
        let sub_result = {};
        let number_of_cavity = 0;
        let ratio_extrusion_min = press.ratio_extrusion_min;
        let ratio_extrusion_max = press.ratio_extrusion_max;

        let weight_billet1m =
          (((Math.pow(press.billet_dia, 2) * Math.PI) / 4) *
            this.state.alloys[parseInt(profile.cur_alloy, 10)].Rho) /
          1000;
        let weight_billet1m_compressed =
          (((Math.pow(press.container_dia, 2) * Math.PI) / 4) *
            this.state.alloys[parseInt(profile.cur_alloy, 10)].Rho) /
          1000;
        let axdisatance = press.container_dia * 0.1;
        let usable_dia =
          (press.container_dia * (100 + press.value_spreading)) / 100;
        let cimcumscribing_profile = Math.sqrt(
          Math.pow(parseInt(profile.cur_width, 10), 2) +
            Math.pow(parseInt(profile.cur_height, 10), 2)
        );
        let extratio_profile =
          weight_billet1m_compressed / parseInt(profile.cur_weight, 10);
        let max_height_2cav =
          Math.sqrt(
            Math.pow(press.container_dia / 2, 2) -
              Math.pow(parseInt(profile.cur_height, 10) / 2, 2)
          ) - axdisatance;
        let max_height_4cav =
          Math.sqrt(
            Math.pow(usable_dia / 2, 2) -
              Math.pow(parseInt(profile.cur_height, 10) + axdisatance, 2)
          ) - axdisatance;
        let max_cs_6cav = usable_dia / 3;
        let max_cs_8cav = (Math.sin(Math.PI / 4) * usable_dia) / 4;

        if (this.state.checked_nbr_cavity)
          number_of_cavity = Number(profile.cur_nbr_cavity);
        else {
          if (press.max_profile_width < parseInt(profile.cur_width, 10))
            number_of_cavity = 0;
          else if (
            cimcumscribing_profile < max_cs_8cav - axdisatance &&
            ratio_extrusion_min < extratio_profile / 6 &&
            extratio_profile / 6 < ratio_extrusion_max
          )
            number_of_cavity = 8;
          else if (
            cimcumscribing_profile < max_cs_6cav - axdisatance &&
            ratio_extrusion_min < extratio_profile / 6 &&
            extratio_profile / 6 < ratio_extrusion_max
          )
            number_of_cavity = 6;
          else if (
            (parseInt(profile.cur_width, 10) < max_height_4cav ||
              cimcumscribing_profile < usable_dia / 2 - axdisatance) &&
            ratio_extrusion_min < extratio_profile / 4 &&
            extratio_profile / 4 < ratio_extrusion_max
          )
            number_of_cavity = 4;
          else if (
            (parseInt(profile.cur_width, 10) < max_height_2cav ||
              cimcumscribing_profile < usable_dia / 2 - axdisatance / 2) &&
            ratio_extrusion_min < extratio_profile / 2 &&
            extratio_profile / 2 < ratio_extrusion_max
          )
            number_of_cavity = 2;
          else if (
            cimcumscribing_profile < usable_dia &&
            ratio_extrusion_min < extratio_profile &&
            extratio_profile < ratio_extrusion_max
          )
            number_of_cavity = 1;
          else number_of_cavity = 0;
        }
        console.log("number of cavity", number_of_cavity);
        let ramspeed = 0;
        // extruction Speed Auto
        if (this.state.checked_speed_extru)
          ramspeed = Number(profile.cur_speed_extrusion);
        else
          ramspeed =
            press.ram_speed_max *
            this.state.alloys[parseInt(profile.cur_alloy, 10)].extru *
            this.state.surfaces[parseInt(profile.cur_surface, 10)].extru *
            this.state.complexities[parseInt(profile.cur_complexity, 10)].extru;
        console.log("ramspeed", ramspeed);
        let length_scrap = 0;
        //scrap length Auto
        if (this.state.checked_scrap_len)
          length_scrap = Number(profile.cur_scrap_length);
        else length_scrap = 4;
        console.log("length of scrap", length_scrap);
        let length_buttend = 40;

        // Billet length
        let volume_rate_container_billet =
          Math.pow(press.container_dia, 2) / Math.pow(press.billet_dia, 2);
        let ratio_extruction =
          weight_billet1m_compressed /
          parseInt(profile.cur_weight, 10) /
          number_of_cavity;
        let max_producable_length =
          ((press.billet_length_max / volume_rate_container_billet -
            length_buttend) *
            ratio_extruction) /
          1000;
        let max_producable_costlen = Math.floor(
          ((max_producable_length - length_scrap) /
            parseInt(profile.cur_length, 10)) *
            1000
        );
        let max_producable_cl_table = Math.floor(
          ((press.table_length_max - length_scrap) /
            parseInt(profile.cur_length, 10)) *
            1000
        );
        let number_costumer_length = Math.min(
          max_producable_cl_table,
          max_producable_costlen
        );
        let weight_number_cslength =
          number_costumer_length *
          (parseInt(profile.cur_length, 10) / 1000) *
          parseInt(profile.cur_weight, 10);
        let weight_buttend =
          (length_buttend * weight_billet1m_compressed) / 1000;
        let weight_scrap = length_scrap * parseInt(profile.cur_weight, 10);
        let weight_billetlength =
          (weight_number_cslength + weight_scrap) * number_of_cavity +
          weight_buttend;
        let length_billet = Math.ceil(
          (weight_billetlength / weight_billet1m) * 1000 + 0.5
        );
        let length_billet_compressed = Math.ceil(
          length_billet / volume_rate_container_billet + 0.5
        );

        // productivity
        let time_extrusion_billet =
          (length_billet_compressed - length_buttend) / ramspeed;
        let time_process = time_extrusion_billet + press.dead_cycle;
        let net_productivity =
          ((weight_number_cslength * number_of_cavity) / time_process) * 3600;
        let gros_productivity = (weight_billetlength / time_process) * 3600;

        let today = new Date();
        let date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        let time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        let dateTime = date + " " + time;

        sub_result = {
          press: press.name,
          profile_weight: parseInt(profile.cur_weight, 10),
          number_cavity: number_of_cavity,
          profile_length: parseInt(profile.cur_length, 10),
          billet_length: length_billet,
          buttend_length: length_buttend,
          scrap_length: length_scrap,
          num_costumer_length: number_costumer_length,
          extrusion_length: 0,
          puller_speed: 0,
          gros_productivity: gros_productivity,
          net_productivity: net_productivity,
          recovery: 0,
          logend_recovery: 0,
          area_cost: 0,
          plant_cost: 0,
          bu_sga: 0,
          packing_cost: 0,
          freight_cost: 0,
          die_cost: 0,
          recovery_loss: 0,
          extrusion_margin: 0,
          timestamp: dateTime
        };
        result.push(sub_result);
      }
      this.setState({ result: result });
      this.setState({ show_result: true });
    }
  }

  clearProfile() {
    this.setState({ ...initialState });
    this.get_options_data();
  }

  render() {
    const { errors } = this.state;
    if (this.state.profile_types.length == 0) return <div>Loading...</div>;

    const profile_type_options = [];
    const alloy_options = [];
    const surface_options = [];
    const complexity_options = [];
    const usage_options = [];

    for (const [index, value] of this.state.profile_types.entries()) {
      profile_type_options.push(
        <option value={index} key={index}>
          {value.type_name}
        </option>
      );
    }

    for (const [index, value] of this.state.alloys.entries()) {
      alloy_options.push(
        <option value={index} key={index}>
          {value.name}
        </option>
      );
    }

    for (const [index, value] of this.state.surfaces.entries()) {
      surface_options.push(
        <option value={index} key={index}>
          {value.name}
        </option>
      );
    }
    for (const [index, value] of this.state.complexities.entries()) {
      complexity_options.push(
        <option value={index} key={index}>
          {value.name}
        </option>
      );
    }
    for (const [index, value] of this.state.usages.entries()) {
      usage_options.push(
        <option value={index} key={index}>
          {value.name}
        </option>
      );
    }

    const update_state = (nestedIndex, e) => {
      const { current_state } = { ...this.state };
      const currentState = current_state;
      this.prev_state = JSON.stringify(currentState);
      const { name, value } = e.target;
      currentState[nestedIndex] = value;

      return currentState;
    };

    const handleChange = event => {
      event.preventDefault();
      const { name, value } = event.target;
      let errors = this.state.errors;

      const validRegex = RegExp(/^\d*\.?(?:\d{1,20})?$/);
      switch (name) {
        case "profile_weight":
          errors.profile_weight =
            !validRegex.test(value) || value == ""
              ? "input value is invalid. Must be NUMBER!"
              : "";
          break;
        case "profile_width":
          errors.profile_width =
            !validRegex.test(value) || value == ""
              ? "input value is invalid. Must be NUMBER!"
              : "";
          break;
        case "profile_length":
          errors.profile_length =
            !validRegex.test(value) || value == ""
              ? "input value is invalid. Must be NUMBER!"
              : "";
          break;
        case "profile_height":
          errors.profile_height =
            !validRegex.test(value) || value == ""
              ? "input value is invalid. Must be NUMBER!"
              : "";
          break;
        case "profile_usage":
          errors.profile_usage =
            !validRegex.test(value) || value == ""
              ? "input value is invalid. Must be NUMBER!"
              : "";
          break;
        case "profile_speed_extru":
          errors.speed_extrusion =
            !validRegex.test(value) || value == ""
              ? "input value is invalid. Must be NUMBER!"
              : "";
          break;
        case "profile_scrap_len":
          errors.scrap_len =
            !validRegex.test(value) || value == ""
              ? "input value is invalid. Must be NUMBER!"
              : "";
          break;
        case "profile_nbr_cavity":
          errors.nbr_cavity =
            !validRegex.test(value) || value == ""
              ? "input value is invalid. Must be NUMBER!"
              : "";
          break;
        default:
          break;
      }

      this.setState({ errors, [name]: value });
    };

    return (
      <Row>
        <Col xs="12">
          <Card className="main-card">
            <CardHeader>
              <i className="header-icon lnr-license icon-gradient bg-plum-plate">
                {" "}
              </i>
              <strong>Profile</strong>
            </CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Col md="6">
                    <Label for="customer">Kunde</Label>
                    <Input
                      name="customer"
                      id="customer"
                      placeholder="Kunde"
                      onBlur={e =>
                        this.setState({
                          cur_customer: update_state("cur_customer", e)
                        })
                      }
                      noValidate
                    />
                  </Col>
                  <Col md="6">
                    <Label for="profile_weight">Profilgewicht</Label>
                    <InputGroup>
                      <Input
                        name="profile_weight"
                        id="profile_weight"
                        placeholder="Profilgewicht"
                        onBlur={e => {
                          handleChange(e);
                          this.setState({
                            cur_weight: update_state("cur_weight", e)
                          });
                        }}
                        noValidate
                      />
                      <InputGroupAddon addonType="append">
                        [kg/m](0....10^6)
                      </InputGroupAddon>
                    </InputGroup>
                    {errors.profile_weight.length > 0 && (
                      <Alert color="danger">{errors.profile_weight}</Alert>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="6">
                    <Label for="profile_type">Profiltyp</Label>
                    <Input
                      type="select"
                      name="select"
                      id="profile_type"
                      onBlur={e =>
                        this.setState({ cur_type: update_state("cur_type", e) })
                      }
                    >
                      {profile_type_options}
                    </Input>
                  </Col>
                  <Col md="6">
                    <Label for="profile_complexity">Komplexität</Label>
                    <Input
                      type="select"
                      name="select"
                      id="profile_complexity"
                      onBlur={e =>
                        this.setState({
                          cur_complexity: update_state("cur_complexity", e)
                        })
                      }
                    >
                      {complexity_options}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="6">
                    <Label for="profile_width">Profilbreite</Label>
                    <InputGroup>
                      <Input
                        name="profile_width"
                        id="profile_width"
                        placeholder="Profilbreite"
                        onBlur={e => {
                          handleChange(e);
                          this.setState({
                            cur_width: update_state("cur_width", e)
                          });
                        }}
                      />
                      <InputGroupAddon addonType="append">
                        [mm] (0....10^6)
                      </InputGroupAddon>
                    </InputGroup>
                    {errors.profile_width.length > 0 && (
                      <Alert color="danger">{errors.profile_width}</Alert>
                    )}
                  </Col>
                  <Col md="6">
                    <Label for="profile_width">Profilhöhe</Label>
                    <InputGroup>
                      <Input
                        name="profile_height"
                        id="profile_height"
                        placeholder="Profilhöhe"
                        onBlur={e => {
                          handleChange(e);
                          this.setState({
                            cur_height: update_state("cur_height", e)
                          });
                        }}
                      />
                      <InputGroupAddon addonType="append">
                        [mm] (0....10^6)
                      </InputGroupAddon>
                    </InputGroup>
                    {errors.profile_height.length > 0 && (
                      <Alert color="danger">{errors.profile_height}</Alert>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="6">
                    <Label for="alloy">Legierung</Label>
                    <Input
                      type="select"
                      name="select"
                      id="alloy"
                      onBlur={e =>
                        this.setState({
                          cur_alloy: update_state("cur_alloy", e)
                        })
                      }
                    >
                      {alloy_options}
                    </Input>
                  </Col>
                  <Col md="6">
                    <Label for="profile_surface">Oberfläche</Label>
                    <Input
                      type="select"
                      name="select"
                      id="profile_surface"
                      onBlur={e =>
                        this.setState({
                          cur_surface: update_state("cur_surface", e)
                        })
                      }
                    >
                      {surface_options}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="6">
                    <Label for="profile_length">Kundenlänge</Label>
                    <InputGroup>
                      <Input
                        name="profile_length"
                        id="profile_length"
                        placeholder="Kundenlänge"
                        onBlur={e => {
                          handleChange(e);
                          this.setState({
                            cur_length: update_state("cur_length", e)
                          });
                        }}
                      />
                      <InputGroupAddon addonType="append">
                        [mm] (0....10^6)
                      </InputGroupAddon>
                    </InputGroup>
                    {errors.profile_length.length > 0 && (
                      <Alert color="danger">{errors.profile_length}</Alert>
                    )}
                  </Col>
                  <Col md="6">
                    <Label for="profile_usage">Anwendung</Label>
                    <Input
                      type="select"
                      name="select"
                      id="profile_usage"
                      onBlur={e =>
                        this.setState({
                          cur_usage: update_state("cur_usage", e)
                        })
                      }
                    >
                      {usage_options}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="6">
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="nbr_cavity_check"
                      name="nbr_cavity_check"
                      value="option1"
                      style={{ marginLeft: 2 }}
                      onChange={e => {
                        this.setState({ checked_nbr_cavity: e.target.checked });
                      }}
                    />
                    <Label
                      for="Profile_nbr_cavity"
                      className="form-check-label"
                      style={{ marginLeft: 20 }}
                    >
                      Number of Cavity
                    </Label>
                    {this.state.checked_nbr_cavity && (
                      <InputGroup>
                        <Input
                          name="profile_nbr_cavity"
                          id="profile_nbr_cavity"
                          placeholder="Number of Cavity"
                          onBlur={e => {
                            handleChange(e);
                            this.setState({
                              cur_nbr_cavity: update_state("cur_nbr_cavity", e)
                            });
                          }}
                        />
                        <InputGroupAddon addonType="append">
                          Cavities
                        </InputGroupAddon>
                      </InputGroup>
                    )}
                    {this.state.checked_nbr_cavity &&
                      errors.nbr_cavity.length > 0 && (
                        <Alert color="danger">{errors.nbr_cavity}</Alert>
                      )}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="6">
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="speed_extru_check"
                      name="speed_extru_check"
                      value="option1"
                      style={{ marginLeft: 2 }}
                      onChange={e => {
                        this.setState({
                          checked_speed_extru: e.target.checked
                        });
                      }}
                    />
                    <Label
                      for="profile_speed_extru"
                      className="form-check-label"
                      style={{ marginLeft: 20 }}
                    >
                      Speed Extrusion
                    </Label>
                    {this.state.checked_speed_extru && (
                      <InputGroup>
                        <Input
                          name="profile_speed_extru"
                          id="profile_speed_extru"
                          placeholder="Speed Extrusion"
                          onBlur={e => {
                            handleChange(e);
                            this.setState({
                              cur_speed_extrusion: update_state(
                                "cur_speed_extrusion",
                                e
                              )
                            });
                          }}
                        />
                        <InputGroupAddon addonType="append">
                          [mm/s]
                        </InputGroupAddon>
                      </InputGroup>
                    )}
                    {this.state.checked_speed_extru &&
                      errors.speed_extrusion.length > 0 && (
                        <Alert color="danger">{errors.speed_extrusion}</Alert>
                      )}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="6">
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="scrap_len_check"
                      name="scrap_len_check"
                      value="option1"
                      style={{ marginLeft: 2 }}
                      onChange={e => {
                        this.setState({ checked_scrap_len: e.target.checked });
                      }}
                    />
                    <Label
                      for="profile_scrap_len"
                      className="form-check-label"
                      style={{ marginLeft: 20 }}
                    >
                      Scrap Length
                    </Label>
                    {this.state.checked_scrap_len && (
                      <InputGroup>
                        <Input
                          name="profile_scrap_len"
                          id="profile_scrap_len"
                          placeholder="Scrap Length"
                          onBlur={e => {
                            handleChange(e);
                            this.setState({
                              cur_scrap_length: update_state(
                                "cur_scrap_length",
                                e
                              )
                            });
                          }}
                        />
                        <InputGroupAddon addonType="append">
                          [mm]
                        </InputGroupAddon>
                      </InputGroup>
                    )}
                    {this.state.checked_scrap_len &&
                      errors.speed_extrusion.length > 0 && (
                        <Alert color="danger">{errors.speed_extrusion}</Alert>
                      )}
                  </Col>
                </FormGroup>
                <Button
                  color="info"
                  className="mr-2 mb-2"
                  onClick={this.clearProfile}
                >
                  Clear
                </Button>
                <Button
                  color="primary"
                  className="mr-2 mb-2"
                  onClick={this.gotoNextStep}
                >
                  Next Step
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col md="12">
          {this.state.show_result ? (
            <Fragment>
              <ResultComponent outputData={this.state.result} />
            </Fragment>
          ) : null}
        </Col>
      </Row>
    );
  }
}
