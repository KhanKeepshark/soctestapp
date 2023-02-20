import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2'
import { fetchQuestions } from '../http/questionAPI';
import { fetchUserChoice } from '../http/userChoiceAPI';
import { fetchAnswers } from '../http/answerAPI';
import { fetchUsers } from '../http/userAPI';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);


const PieChart = () => {
    const [currentQuestion, setCurrentQuestion] = useState([])
    const [currentSex, setCurrentSex] = useState('All')
    const [currentAge, setCurrentAge] = useState('Age')
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [userData, setUserData] = useState([])
    const [userChoices, setUserChoices] = useState([])

    useEffect(()=>{
      fetchUsers().then(data => setUserData(data.map(role => role.role != "ADMIN" ? role : "")))
      fetchQuestions().then(data => setQuestions(data))
      fetchAnswers().then(data => setAnswers(data))
      fetchUserChoice().then(data => setUserChoices(data))
      setCurrentQuestion(questions.map(type => type.description)[0])
      
    }, [])

    const sexSwitch = (e) => {
      setUserData(userData.map(i=> userChoices.map(e=> i.id == e.userId && e.answerChoice === "Женщина").filter(i => i != false).indexOf(true) != -1 ?  {...i, ["sex"]: "Женщина"} : {...i, ["sex"]: "Мужчина"}))
      setCurrentSex(e)
    }
    const ageSwitch = (el) => {
      setUserData(userData.map(i=> userChoices.map(e=> i.id == e.userId && e.answerChoice === el).filter(i => i != false).indexOf(true) != -1 ?  {...i, ["age"]: el} : i))
      setCurrentAge(el)
    }

    const grafObjs = userData.map(i=> userChoices.map(e=> i.id == e.userId && e.questionChoice == currentQuestion ? e.answerChoice : null)
      .filter(i => i != null)
      .flat()
      .reduce((acc, n) => (acc[n] = (acc[n] || 0)+1, acc), {})
      )

    const test = grafObjs.map(e => answers.map(i => Object.keys(e).map(obj => obj === i.description ? obj : null)
      .filter(i => i != null)
      ).flat()
      ).flat()
    
    const test2 = currentSex != 'All' && currentAge != 'Age' ?
    userData.map(i=> userChoices.map(e=> i.id == e.userId && e.questionChoice == currentQuestion && i.sex == currentSex && i.age == currentAge ? e.answerChoice : null)
    .filter(i => i != null)
    ).flat()
    .reduce((acc, n) => (acc[n] = (acc[n] || 0)+1, acc), {})
    : currentSex != 'All' ?
    userData.map(i=> userChoices.map(e=> i.id == e.userId && e.questionChoice == currentQuestion && i.sex == currentSex ? e.answerChoice : null)
    .filter(i => i != null)
    ).flat()
    .reduce((acc, n) => (acc[n] = (acc[n] || 0)+1, acc), {})
    : currentAge != 'Age' ?
    userData.map(i=> userChoices.map(e=> i.id == e.userId && e.questionChoice == currentQuestion && i.age == currentAge ? e.answerChoice : null)
    .filter(i => i != null)
    ).flat()
    .reduce((acc, n) => (acc[n] = (acc[n] || 0)+1, acc), {})
    :
    userData.map(i=> userChoices.map(e=> i.id == e.userId && e.questionChoice == currentQuestion ? e.answerChoice : null)
    .filter(i => i != null)
    ).flat()
    .reduce((acc, n) => (acc[n] = (acc[n] || 0)+1, acc), {})

    let grafData = [...new Set(test)].map(i => test2[i]).concat(Object.values(test2).reduce((a, b) => a + b, 0)-[...new Set(test)].map(i => test2[i]).reduce((a, b) => a + b, 0))

    const grafLabels = [...new Set(test)]

    const Graf = {
        labels: questions.map(e => e.description === currentQuestion && e.freeAnswer).indexOf(true) != -1 ? grafLabels.concat(['Выбор пользователя']) : grafLabels,
        datasets: [{
          data: grafData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(236, 240, 241, 0.2)',
            'rgba(52, 73, 94, 0.2)',
            ],
            borderColor: [

              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(123, 125, 125)',
              'rgba(52, 73, 94, 1)',
            ],
            borderWidth: 1,
        }], 
      }

      const options = {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      };

return (
    <div>
        <Row className='mt-4' style={{height: "320px"}}>
            <Col md={8}>
              <Pie options={options} data={Graf}/>
            </Col>
            <Col md={4}>
            
              <Form.Select
                className="mt-3"
                value={currentQuestion}
                onChange={e => setCurrentQuestion(e.target.value)} 
              >
                <option hidden>Выберите вопрос</option>
            {questions.map(type =>
                <option value={type.description}>{type.description}</option>
            )}
              </Form.Select>

              <Form.Select
                className="mt-3"
                value={currentSex}
                onChange={e => sexSwitch(e.target.value)} 
              >
                <option hidden>Выберите пол</option>
                <option value={'All'}>Любой</option>
                <option value={'Мужчина'}>Мужчина</option>
                <option value={'Женщина'}>Женщина</option>
              </Form.Select>
              <Form.Select
                className="mt-3"
                value={currentAge}
                onChange={e => ageSwitch(e.target.value)} 
              >
                <option hidden>Выберите возраст</option>
                <option value={'Age'}>Любой</option>
                <option value={'18-29'}>18-29</option>
                <option value={'30-45'}>30-45</option>
                <option value={'46-62'}>46-62</option>
                <option value={'63 и старше'}>63 и старше</option>
              </Form.Select>
            </Col>
        </Row>  
    </div>

  );
}

export default PieChart;