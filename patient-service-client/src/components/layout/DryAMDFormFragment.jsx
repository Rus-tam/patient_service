import Form from "react-bootstrap/Form";
import React from "react";

const DryAMDFormFragment = (
  <div>
    <Form.Group className="mb-3" controlId="formOfDisease">
      <Form.Label>
        <strong>Форма заболевания: </strong>
      </Form.Label>
      <Form.Check
        type="radio"
        label="Первичная"
        name="formOfDisease"
        value="primary"
        // checked={additionalFields === "primary"}
        // onChange={dryAMD}
      />
      <Form.Check
        type="radio"
        label="Вторичная"
        name="formOfDisease"
        value="secondary"
        // checked={additionalFields === "dry"}
        // onChange={dryAMD}
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="VEGFTherapyHistory">
      <Form.Label>
        <strong>Данные по ранее проводимой анти-VEGF терапия,</strong>
      </Form.Label>
      <Form.Control as="textarea" rows={4} placeholder="Введите результаты" />
    </Form.Group>
  </div>
);

export default DryAMDFormFragment;
