import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Form } from "react-bootstrap";
import currencies from "../../assets/currencies";
import axios from "axios";
import setDate from "../../assets/help-functions";
import ComparisonGraph from "../ComparisonGraph/ComparisonGraph";
import ComparisonList from "../ComparisonList/ComparisonList";

function ComparisonPage(props) {
  const [currency, setCurrency] = useState(currencies[0]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get("https://api.exchangerate.host/timeseries", {
        params: {
          start_date: startDate,
          end_date: endDate,
        },
      })
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, [startDate, endDate]);

  return (
    <div className="pt5 pb5">
      <Container>
        <Form>
          <Form.Group>
            <Row>
              <Col lg={6} md={6}>
                <Form.Label>Currency</Form.Label>
                <Form.Select
                  aria-label="Currency value"
                  onChange={(event) => setCurrency(event.target.value)}
                  value={currency}
                >
                  {currencies.map((value) => (
                    <option key={`from-${value}`} value={value}>
                      {value}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col lg={6} md={6}>
                <Form.Label>Start date</Form.Label>
                <Form.Control
                  aria-label="Currency value"
                  type="date"
                  onChange={setDate(setStartDate)}
                  value={startDate.toISOString().slice(0, 10)}
                />
              </Col>
              <Col lg={6} md={6}>
                <Form.Label>End date</Form.Label>
                <Form.Control
                  aria-label="Currency value"
                  type="date"
                  onChange={setDate(setEndDate)}
                  value={endDate.toISOString().slice(0, 10)}
                />
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Container>
      {data && <ComparisonList {...{ rates: data?.rates, currency: currency }} />}
      {data && <ComparisonGraph {...{ rates: data?.rates, currency: currency }} />}
    </div>
  );
}

export default ComparisonPage;
