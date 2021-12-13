import React from "react";
import { Row, Col } from "react-bootstrap";
import "./CurrencyHistoryComponent.css";

function CurrencyHistoryComponent({history}) {
  
  return(
    <div>
      <Row className="pt5">
        <Col className="mb2" lg={12}>
          <h2>Historical rates</h2>
        </Col>
        {history.map(item => (
          <Col className="currency_history" lg={12} key={item.time}>
          <p>{`${item.fromCurrency} ${item.fromCurrencyValue}`}</p>
          <p>{`${item.toCurrency} ${item.toCurrencyValue}`}</p>
          <p>{(new Date(item.time)).toUTCString()}</p>
        </Col>
        ))}
      </Row>
    </div>
  );
}

export default CurrencyHistoryComponent;
