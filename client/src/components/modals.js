import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { createAnswer } from '../http/answerAPI';
import { createQuestion } from '../http/questionAPI';
import { fetchQuestionnaire } from '../http/questionnaireAPI';
import { useMediaQuery } from 'react-responsive'

const CreateQuestion = ({show, onHide}) => {
    const mobile = useMediaQuery({ query: '(max-width: 768px)' })
    const [answerField, setAnswerField] = useState([{description: '', number: Date.now()}])
    const [freeChoice, setFreeChoice] = useState(false)
    const [answerNum, setAnswerNum] = useState(1)
    const [questionnaire, setQuestionnaire] = useState([])
    const [questionnaireId, setQuestionnaireId] = useState([])

    useEffect(()=>{
        fetchQuestionnaire().then(data => setQuestionnaire(data))
      }, [])

    const addAnswerField = () => {
        setAnswerField([...answerField, {description: '', number: Date.now()}])
    }
    const removeAnswerField = (number) => {
        setAnswerField(answerField.filter(i => i.number !== number))
    }

    const changeAnswer = (key, value, number) => {
        setAnswerField(answerField.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const [questionValue, setquestionValue] = useState('')

    const addQuestion = () => {
        createQuestion({description: questionValue, freeAnswer: freeChoice, answerNum: answerNum, questionnaireId: questionnaireId}).then(data => {
            for (let el of answerField){
                el.questiondatumId = data.id
                el.questionDescription = data.description
                el.order = 
                createAnswer(el).then(answerData => {
                })
            }
            setquestionValue('')
            setAnswerField([{description: '', number: Date.now()}])
        })
        onHide()
    }
    const switchFreeChoice = () => {
        setFreeChoice(e => !e)
    }

  return (
    <Modal show={show} onHide={onHide} style={mobile? {width: "320px" }:null}>
        <Modal.Header closeButton>
          <Modal.Title>???????????????? ????????????</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Select className='mb-3' onChange={e => setQuestionnaireId(e.target.value)}>
                        <option hidden>???????????????? ????????????</option>
                        {questionnaire.map(e =>
                            <option value={e.id}>{e.name}</option>
                            )}
                </Form.Select>
                <Form.Control
                    className='mb-3'
                    placeholder={"?????????????? ????????????"}
                    value={questionValue}
                    onChange={e => setquestionValue(e.target.value)}
                />
                {answerField.map(i =>
                    <Row key={i.number}>
                        <Col md={8}>
                            <Form.Control
                                value={i.description}
                                onChange={e => changeAnswer('description', e.target.value, i.number)}
                                className='mt-2'
                                placeholder={"?????????????? ??????????"}
                            />
                        </Col>
                        <Col md={4}>
                            <Button 
                                onClick={() => removeAnswerField(i.number)}
                                className='mt-2' 
                                variant={"outline-danger"}
                            >??????????????</Button>
                        </Col>
                    </Row>  
                )}
                    <Button 
                        className='mt-3'
                        onClick={addAnswerField}
                    >???????????????? ??????????
                    </Button>
                    <Form.Check 
                        name="d"
                        label="???????????????? ???????? ?????????????? ????????????"
                        className='mt-2' 
                        onChange={() => switchFreeChoice()}
                    />
                </Form>
                <Form.Select className='mt-2' aria-label="Default select example" onChange={e => setAnswerNum(e.target.value)}>
                    <option hidden>???????????????????? ?????????????????? ??????????????</option>
                    {[...Array(answerField.length).keys()].map(e =>
                        <option value={e+1}>{e+1}</option>
                        )}
                </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            ??????????????
          </Button>
          <Button variant="primary" onClick={addQuestion}>
            ??????????????????
          </Button>
        </Modal.Footer>
    </Modal>
  );
}

export default CreateQuestion;