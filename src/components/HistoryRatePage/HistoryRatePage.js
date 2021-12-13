import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {
  Container,
  Row,
  Col,
  Form
} from "react-bootstrap";
import currencies from "../../assets/currencies";
import axios from "axios";
import setDate from "../../assets/help-functions";

function HistoryRatePage(props) {
  const [currency, setCurrency] = useState(currencies[0]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState();

  useEffect(() => {
    axios.get(
      `https://api.exchangerate.host/${selectedDate.toISOString().slice(0, 10)}`
    )
      .then(response => setData(response.data))
      .catch(error => console.log(error))
  }, [selectedDate])

  return (
    <div className="pt5">
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
                  {currencies.map(value => (
                    <option key={`from-${value}`} value={value}>
                      {value}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col lg={6} md={6}>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  aria-label="Currency value"
                  type="date"
                  onChange={setDate(setSelectedDate)}
                  value={selectedDate.toISOString().slice(0, 10)}
                />
              </Col>
            </Row>
          </Form.Group>
        </Form>
        <div className="history_result">
          <p>{
          // @ts-ignore
          data?.rates[currency]}</p>
        </div>
      </Container>
    </div>
  );
}

export default HistoryRatePage;
