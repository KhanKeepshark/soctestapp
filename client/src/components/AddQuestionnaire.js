import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createQuestionnaire } from '../http/questionnaireAPI';
import { useMediaQuery } from 'react-responsive'

const CreateQuestionnaire = ({show, onHide}) => {

  const mobile = useMediaQuery({ query: '(max-width: 768px)' })
  const [questionnaireValue, setQuestionnaireValue] = useState('')

  const AddQuestionnaire = () => {
          createQuestionnaire({name: questionnaireValue})
          setQuestionnaireValue('')
      onHide()
  }

  return (
    <Modal show={show} onHide={onHide} style={mobile? {width: "320px" }:null}>
        <Modal.Header closeButton>
          <Modal.Title>Создайте Анкету</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control
                    className='mb-3'
                    placeholder={"Введите название анкеты"}
                    value={questionnaireValue}
                    onChange={e => setQuestionnaireValue(e.target.value)}
                />
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={AddQuestionnaire}>
            Сохранить
          </Button>
        </Modal.Footer>
    </Modal>
  );
}

export default CreateQuestionnaire;