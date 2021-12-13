import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import currencies from "../../assets/currencies";
import axios from "axios";
import CurrencyHistoryComponent from "../CurrencyHistoryComponent/CurrencyHistoryComponent";
import { useLocalStorage } from "beautiful-react-hooks";

function CurrencyConversionPage(props) {
  const [fromCurrency, setFromCurrency] = useState(currencies[0]);
  const [fromCurrencyValue, setFromCurrencyValue] = useState(0);
  const [toCurrency, setToCurrency] = useState(currencies[1]);
  const [toCurrencyValue, setToCurrencyValue] = useState(0);
  const [currencyHistory, setCurrencyHistory] = useLocalStorage(
    "currency-history",
    []
  );

  function convert() {
    axios
      .get("https://api.exchangerate.host/convert", {
        params: {
          from: fromCurrency,
          to: toCurrency,
          amount: fromCurrencyValue,
        },
      })
      .then((response) => {
        const value =
          Math.round((response.data.result + Number.EPSILON) * 100) / 100;
        setToCurrencyValue(value);
        const historyItem = {
          fromCurrency: fromCurrency,
          fromCurrencyValue: fromCurrencyValue,
          toCurrency: toCurrency,
          toCurrencyValue: value,
          time: Date.now(),
        };
        setCurrencyHistory([historyItem, ...currencyHistory]);
      })
      .catch((error) => console.log(error));
  }

  function preventEmpty(value) {
    setFromCurrencyValue(value || 0);
  }
  return (
    <div className="pt5">
      <Container>
        <Form>
          <Form.Group>
            <Row>
              <Col lg={6} md={6}>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  as={CurrencyInput}
                  value={fromCurrencyValue}
                  placeholder="Currency"
                  id="currency-from"
                  decimalsLimit={2}
                  allowNegativeValue={false}
                  onValueChange={preventEmpty}
                />
              </Col>
              <Col lg={6} md={6}>
                <Form.Label>Currency From</Form.Label>
                <Form.Select
                  aria-label="Currency value"
                  onChange={(event) => setFromCurrency(event.target.value)}
                  value={fromCurrency}
                >
                  {currencies.map((value) => (
                    <option key={`from-${value}`} value={value}>
                      {value}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              <Col lg={6} md={6}>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  as={CurrencyInput}
                  value={toCurrencyValue}
                  placeholder="Currency"
                  id="currency-to"
                  disabled
                  defaultValue={0}
                  decimalsLimit={2}
                  allowNegativeValue={false}
                />
              </Col>
              <Col lg={6} md={6}>
                <Form.Label>Currency To</Form.Label>
                <Form.Select
                  aria-label="Currency value"
                  onChange={(event) => setToCurrency(event.target.value)}
                  value={toCurrency}
                >
                  {currencies.map((value) => (
                    <option key={`to-${value}`} value={value}>
                      {value}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col className="mt2" lg={12}>
                <Button className="def_button" onClick={convert}>
                  Convert
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
        {!!currencyHistory?.length && (
          <CurrencyHistoryComponent history={currencyHistory} />
        )}
      </Container>
    </div>
  );
}

export default CurrencyConversionPage;
