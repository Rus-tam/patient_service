import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const InvitingForm = () => {
  const { id } = useParams();

  const [patientData, setPatientData] = useState({
    id: "",
    name: "",
    surname: "",
    patronymic: "",
    patientBirthDate: "",
    phone: "",
    kinsmenPhone: "",
    medicalExaminations: [],
    tomography: [],
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/patient/${id}`).then((resp) => {
      if (resp.status === 200) {
        setPatientData(resp.data);
      } else {
        alert("Произошла ошибка");
      }
    });
  }, [setPatientData]);

  // Поиск последних результатов осмотра
  let examinationId = 0;
  let lastExamination = {};
  patientData.medicalExaminations.forEach((examination) => {
    // eslint-disable-next-line no-unused-expressions
    examination.id > examinationId ? (lastExamination = examination) : null;
  });
  if (lastExamination.AMDType === "dry") {
    lastExamination.AMDType = "dry";
  } else if (lastExamination.AMDType === "wet") {
    lastExamination.AMDType = "wet";
  }

  console.log(lastExamination);

  return (
    <div>
      <p className="text-center">
        <strong>
          Уважаемый (ая) {patientData.surname} {patientData.name} {patientData.patronymic}! <br />
          Вы записаны на госпитализацию для выполнения инъекции антивазопролиферативного препарата{" "}
          {lastExamination.nextInjectionDate} к {lastExamination.nextInjectionTime}
        </strong>
        <br />
        В назначенную дату Вам необходимо явиться по адресу: <br />
        {lastExamination.clinicAddress}
      </p>
      <hr />
      <br />
      <p>
        <strong>При себе необходимо иметь: </strong> <br />
        - паспорт (оригинал и 1 копия); <br />
        - полис обязательного медицинского страхования (оригинал и 1 копия); <br />
        - страховое свидетельство государственного пенсионного страхования – СНИЛС (оригинал и 1 копия). <br />
      </p>

      <br />

      <p>
        <strong>А также результаты анализов и заключений специалистов: </strong> <br />
        - общий анализ крови развернутый с лейкоцитарной формулой (действителен 14 дней); <br />
        - общий анализ мочи (действителен 14 дней); <br />
        - анализ крови на содержание глюкозы (действителен 14 дней); <br />
        - анализ крови на КСР (RW) (действителен 3 месяца); <br />
        - анализ крови на ВИЧ, HBSAg, гепатит С – при положительных результатах; <br />- заключение от
        врача-инфекциониста о возможности госпитализации на плановое лечение (действительно 3 месяца); <br />
        - биохимический анализ крови (действителен 30 дней); <br />
        - флюорография (действительно 1 год). <br />
      </p>

      <p>
        <strong>Заключение: </strong>
        - врач-терапевт – наличие осмотра с указанием АД, ЭКГ с расшифровкой, с диагнозом и уточнением возможности
        оперативного лечения (действительно 14 дней); <br />
        - ЛОР-врач (действительно 1 месяц); <br />
        - врач-стоматолог (действительно 6 месяцев). <br />
      </p>

      <p>
        <strong>Заключение специалистов при наличии сопутствующей патологии: </strong>
        - врач-невролог (с МТР и КТ) – при ОНМК, заболеваниях зрительного нерва (действительно 1 месяц); <br />
        - врач-нейрохирург – при наличии объемных образований головного мозга (действительно 1 месяц); <br />
        - врач-аллерголог – при наличии в анамнезе поливалентной аллергии на медикаменты, антибиотики и местные
        анестетики (действительно 1 месяц); <br />
        - врач-фтизиатр (реакция МАНТУ) (действительно 1 месяц); <br />
        - врач-ревматолог (СРБ, ревмопроба) – при увеите, склерите (действительно 1 месяц); <br />
        - врач-онколог – при наличии онкозаболеваний (действительно 1 месяц); <br />
        - врач-эндокринолог при сахарном диабете, эндокринной патологии (действительно 14 дней); <br />
        - врач-кардиолог (различные нарушения ритма сердца и пороках, перенесенные ОКС, оперативные вмешательства на
        сердце) (действительно 14 дней). <br />
      </p>

      <br />

      <p className="text-center">
        <strong>
          Получить ответы на все интересующие Вас вопросы Вы можете вопросы по телефону +79876547809 Просим Вас
          приходить строго в назначенные часы, чтобы избежать длительного ожидания в очереди. <br />
          <br />
          Наша цель – Ваше здоровье!
        </strong>
      </p>
    </div>
  );
};

export default InvitingForm;
