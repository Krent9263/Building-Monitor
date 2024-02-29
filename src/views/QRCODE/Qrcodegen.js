import React, { useState } from "react";
import QRCode from "qrcode";
import {
  Button,
  Col,
  FloatingLabel,
  Form,
  Container,
  Row,
} from "react-bootstrap";
import SideBar from "../../components/SideBar";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";

const Qrcodegen = () => {
  const [url, setUrl] = useState();
  const [qrCodeText, setQrCodeText] = useState("");

  const [qrCodeValue, setCodeValue] = useState("No qrcode scanned");

  const downloadQRCode = (e) => {
    e.preventDefault();
    toast.success("QR Code Generated", { position: "top-center" });
    QRCode.toDataURL(url, (err, url) => {
      if (err) return console.error(err);
      console.log("url:", url);
      setQrCodeText(url);
    });
  };

  console.log("qrCodeText:", qrCodeText);

  return (
    <Container fluid className="dashboard">
      <Row>
        <SideBar />
      </Row>
      <Row className="containers-dashboard">
        <Col>
          <div className="qr-container">
            <div className="box">
              <div className="qr-gen">
                {qrCodeText != "" ? (
                  <>
                    <img src={qrCodeText} className="qr" />
                    <br />
                    <a
                      href={qrCodeText}
                      download={`${url}.png`}
                      className="d-btn"
                    >
                      Download
                    </a>
                  </>
                ) : (
                  <>
                    <div className="text-center">
                      <h3>
                        Input Employee ID <br /> to generate QR
                      </h3>
                    </div>

                    <FontAwesomeIcon className="f-10" icon={faQrcode} />
                  </>
                )}
              </div>
              <Form onSubmit={downloadQRCode}>
                <Row className="generator">
                  <Col>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Input Employee ID"
                    >
                      <Form.Control
                        onChange={(e) => setUrl(e.target.value)}
                        value={url}
                        placeholder="name@example.com"
                        required
                      />
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <Button
                      type="submit"
                      download={qrCodeText}
                      variant="primary"
                      className="mt-4 generate-btn1"
                    >
                      Generate QR Code
                    </Button>
                  </Col>
                </Row>
              </Form>
              {/* <span className="mt-4">Scan QR for testing: {qrCodeValue}</span> */}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Qrcodegen;
