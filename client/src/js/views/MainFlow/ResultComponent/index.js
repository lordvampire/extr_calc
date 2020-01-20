import React from "react";
import MaterialTable from "material-table";
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
import { WRITE_OUTPUT_URL } from "../../../../constants/ApiConstants";

export default class ResultComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.columns = [
      { title: "Press", field: "press" },
      { title: "Profilgewicht", field: "profile_weight", type: "numeric" },
      { title: "Strangzahl", field: "number_cavity", type: "numeric" },
      { title: "Kundenlänge", field: "profile_length", type: "numeric" },
      { title: "Bolzenlänge", field: "billet_length", type: "numeric" },
      { title: "Pressrest", field: "buttend_length", type: "numeric" },
      { title: "Schrotte", field: "scrap_length", type: "numeric" },
      {
        title: "Anzahl K-Länge",
        field: "num_costumer_length",
        type: "numeric"
      },
      { title: "Ausziehlänge", field: "extrusion_length", type: "numeric" },
      { title: "PullerSpeed", field: "puller_speed", type: "numeric" },
      { title: "Brutto kg/h", field: "gros_productivity", type: "numeric" },
      { title: "Netto kg/h", field: "net_productivity", type: "numeric" },
      { title: "Recovery", field: "recovery", type: "numeric" },
      {
        title: "Stangenrest Recovery",
        field: "logend_recovery",
        type: "numeric"
      },
      { title: "Bereichkosten", field: "area_cost", type: "numeric" },
      { title: "Werkskosten", field: "plant_cost", type: "numeric" },
      { title: "BU SGA", field: "bu_sga", type: "numeric" },
      { title: "Verpackung", field: "packing_cost", type: "numeric" },
      { title: "Fracht", field: "freight_cost", type: "numeric" },
      { title: "Werkzeugkosten", field: "die_cost", type: "numeric" },
      { title: "Recovery Loss", field: "recovery_loss", type: "numeric" },
      { title: "VP ExtMargin", field: "extrusion_margin", type: "numeric" }
    ];
    this.saveOutput = this.saveOutput.bind(this);
  }

  saveOutput() {
    this.props.outputData.forEach((data, index) => {
      if (!(Object.entries(data).length === 0 && data.constructor === Object)) {
        axios.post(WRITE_OUTPUT_URL, data).then(res => {
          const dat = res.data;
          if (dat) {
            if (dat.success) {
              console.log("success");
            } else {
              console.log("failure");
            }
          }
        });
      }
    });
  }

  render() {
    return (
      <Row>
        <Col xs="12">
          <Card className="main-card">
            <CardHeader>
              <i className="header-icon lnr-license icon-gradient bg-plum-plate">
                {" "}
              </i>
              <strong>Output</strong>
            </CardHeader>
            <CardBody>
              <MaterialTable
                title=" "
                columns={this.columns}
                data={this.props.outputData}
                options={{
                  filtering: true
                }}
              />

              <Button
                color="primary"
                className="mr-2 mb-2"
                onClick={this.saveOutput}
                style={{ marginTop: 1 + "em" }}
              >
                Save
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
