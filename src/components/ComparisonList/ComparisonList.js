import React from "react";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";

function ComparisonList(props) {
  console.log(props);
  return (
    <Container>
    <div className="comparison_wrapper">
      {props?.rates &&
        Object.keys(props?.rates).map((date) => {
          return (
            <div className="comparison_result">
              <p>{date}</p>
              <p> {props.rates[date][props.currency]}</p>
            </div>
          );
        })}
    </div>
    </Container>
  );
}

export default ComparisonList;
