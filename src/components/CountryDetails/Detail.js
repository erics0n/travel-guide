import React from "react";
import "../../styles/Region.css";
import Loader from "../utils/Loader";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";

class Detail extends React.Component {
  state = {
    details: null
  };

  componentDidMount = () => {
    const { id } = this.props.match.params;
    axios.get(`https://restcountries.eu/rest/v2/name/${id}`).then(response => {
      if (id.toLowerCase() === "india") {
        this.setState({ details: response.data[1] });
      } else {
        this.setState({ details: response.data[0] });
      }
    });
  };

  renderDetail = () => {
    const { details } = this.state;

    if (!details) {
      return <Loader />;
    }
    return (
      <div>
        <img alt={details.region} src={details.flag} height="100" width="200" />
        <h1>{this.props.match.params.id}</h1>
        <h3>Population: {details.population.toLocaleString()}</h3>
        <h3>
          <strong>Capital</strong>: {details.capital}
        </h3>
        <h3>
          <strong>Call Code</strong>: {details.callingCodes}
        </h3>
        <h3>
          <strong>Region</strong>: {details.region}
        </h3>
        <h3>
          <strong>Native</strong>: {details.demonym}
        </h3>
        <h3>
          <strong>Currencies</strong>: {details.currencies.map(currency => `${currency.name} (${currency.code})`).join(', ')}
        </h3>
        <h3>
          <strong>Time Zone(s)</strong>: {details.timezones.join(', ')}
        </h3>
        <Link
          className="f6 link dim br-pill ph4 pv2 mb2 dib white bg-purple"
          to={`/travel-guide/${details.region.toLowerCase()}`}
        >
          BACK
        </Link>
      </div>
    );
  };

  render() {
    return (
      <div className="centerflex">
        <div className="tc bg-white-90 code dib br3 pb1 mt3 mb3 bw2 shadow-5 region">
          {this.renderDetail()}
        </div>
      </div>
    );
  }
}

export default withRouter(Detail);
